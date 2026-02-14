import { prisma } from '@/lib/prisma';
import { RequestStatus } from '@prisma/client';
import { NotificationService } from './notification.service';

export class CollaborationService {
  /**
   * Request to join a collaboration post
   * Validates all business rules before creating request
   * Includes rate limiting (max 10 requests per day)
   */
  static async requestCollaboration(postId: string, requesterId: string) {
    // Rate limiting: Check requests in last 24 hours
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);

    const recentRequests = await prisma.community_collaboration_requests.count({
      where: {
        requesterId,
        createdAt: {
          gte: oneDayAgo,
        },
      },
    });

    if (recentRequests >= 10) {
      throw new Error('Rate limit exceeded: Maximum 10 collaboration requests per day');
    }

    // Fetch post with owner info
    const post = await prisma.community_posts.findUnique({
      where: { id: postId },
      include: { user: true },
    });

    // Validation: Post must exist
    if (!post) {
      throw new Error('Post not found');
    }

    // Validation: Post must be COLLABORATION type
    if (post.type !== 'COLLABORATION') {
      throw new Error('Post is not a collaboration');
    }

    // Validation: Post must be OPEN
    if (post.status !== 'OPEN') {
      throw new Error('Collaboration is closed');
    }

    // Validation: Requester cannot be owner
    if (post.userId === requesterId) {
      throw new Error('Cannot request to join your own collaboration');
    }

    // Validation: Check if already requested
    const existingRequest = await prisma.community_collaboration_requests.findUnique({
      where: {
        postId_requesterId: {
          postId,
          requesterId,
        },
      },
    });

    if (existingRequest) {
      throw new Error('Request already exists');
    }

    // Validation: Check if post is full
    if (
      post.requiredCollaborators &&
      post.currentCollaborators >= post.requiredCollaborators
    ) {
      throw new Error('Collaboration is full');
    }

    // Create request
    const request = await prisma.community_collaboration_requests.create({
      data: {        postId,
        requesterId,
        status: 'PENDING',
      },
      include: { user: {
          include: {
            user_profiles: true,
          },
        },
        community_posts: true,
      },
    });

    // Create notification for post owner
    await NotificationService.createNotification(
      post.userId,
      'COLLAB_REQUEST',
      requesterId,
      postId
    );

    return request;
  }

  /**
   * Accept a collaboration request
   * Uses transaction with row-level locking to prevent race conditions
   */
  static async acceptRequest(requestId: string, ownerId: string) {
    return await prisma.$transaction(async (tx) => {
      // Fetch request with post - USE SELECT FOR UPDATE to lock the row
      const request = await tx.community_collaboration_requests.findUnique({
        where: { id: requestId },
        include: { community_posts: true,
          user: {
            include: {
              user_profiles: true,
            },
          },
        },
      });

      if (!request) {
        throw new Error('Request not found');
      }

      // Lock the post row to prevent race conditions
      const lockedPost = await tx.$queryRaw<Array<{
        id: string;
        currentCollaborators: number;
        requiredCollaborators: number | null;
        status: string;
        userId: string;
      }>>`
        SELECT id, "currentCollaborators", "requiredCollaborators", status, "userId"
        FROM community_posts
        WHERE id = ${request.postId}
        FOR UPDATE
      `;

      if (!lockedPost || lockedPost.length === 0) {
        throw new Error('Post not found');
      }

      const post = lockedPost[0];

      // Verify owner owns the post
      if (post.userId !== ownerId) {
        throw new Error('Unauthorized: You do not own this post');
      }

      // Verify request is PENDING
      if (request.status !== 'PENDING') {
        throw new Error('Request is not pending');
      }

      // Verify post is still OPEN
      if (post.status !== 'OPEN') {
        throw new Error('Collaboration is closed');
      }

      // Verify post is not full (with locked data)
      if (
        post.requiredCollaborators &&
        post.currentCollaborators >= post.requiredCollaborators
      ) {
        throw new Error('Collaboration is full');
      }

      // Update request status
      await tx.community_collaboration_requests.update({
        where: { id: requestId },
        data: { status: 'ACCEPTED' },
      });

      // Increment current_collaborators
      const updatedPost = await tx.community_posts.update({
        where: { id: request.postId },
        data: {
          currentCollaborators: {
            increment: 1,
          },
        },
      });

      // Check if post should be closed
      if (
        updatedPost.requiredCollaborators &&
        updatedPost.currentCollaborators >= updatedPost.requiredCollaborators
      ) {
        await tx.community_posts.update({
          where: { id: request.postId },
          data: { status: 'CLOSED' },
        });
      }

      // Update requester profile stats
      const requesterProfile = await tx.user_profiles.upsert({
        where: { userId: request.requesterId },
        create: {          userId: request.requesterId,
          totalCollaborations: 1,
          totalPosts: 0,
          totalLikesReceived: 0,
          reputationScore: 10, // 1 collaboration * 10
          updatedAt: new Date(),
        },
        update: {
          totalCollaborations: {
            increment: 1,
          },
        },
      });

      // Recalculate reputation
      const newReputation = this.calculateReputation(
        requesterProfile.totalPosts,
        requesterProfile.totalLikesReceived,
        requesterProfile.totalCollaborations + 1
      );

      await tx.user_profiles.update({
        where: { userId: request.requesterId },
        data: { reputationScore: newReputation },
      });

      // Create notification for requester
      await NotificationService.createNotification(
        request.requesterId,
        'COLLAB_ACCEPT',
        ownerId,
        request.postId
      );

      return {
        request,
        post: updatedPost,
      };
    });
  }

  /**
   * Reject a collaboration request
   */
  static async rejectRequest(requestId: string, ownerId: string) {
    // Fetch request with post
    const request = await prisma.community_collaboration_requests.findUnique({
      where: { id: requestId },
      include: { community_posts: true },
    });

    if (!request) {
      throw new Error('Request not found');
    }

    // Verify owner owns the post
    if (request.community_posts.userId !== ownerId) {
      throw new Error('Unauthorized: You do not own this post');
    }

    // Verify request is PENDING
    if (request.status !== 'PENDING') {
      throw new Error('Request is not pending');
    }

    // Update request status
    const updatedRequest = await prisma.community_collaboration_requests.update({
      where: { id: requestId },
      data: { status: 'REJECTED' },
      include: { user: {
          include: {
            user_profiles: true,
          },
        },
        community_posts: true,
      },
    });

    return updatedRequest;
  }

  /**
   * Get all requests for a post owner
   */
  static async getRequestsForOwner(userId: string, status?: RequestStatus) {
    const requests = await prisma.community_collaboration_requests.findMany({
      where: { community_posts: {
          userId,
        },
        ...(status && { status }),
      },
      include: { user: {
          include: {
            user_profiles: true,
          },
        },
        community_posts: {
          select: {
            id: true,
            title: true,
            slug: true,
            type: true,
            status: true,
            requiredCollaborators: true,
            currentCollaborators: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return requests;
  }

  /**
   * Get user's collaboration history
   */
  static async getUserCollaborationHistory(userId: string) {
    const requests = await prisma.community_collaboration_requests.findMany({
      where: {
        requesterId: userId,
        status: 'ACCEPTED',
      },
      include: { community_posts: {
          include: { user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return requests;
  }

  /**
   * Get pending requests for a specific post
   */
  static async getPendingRequestsForPost(postId: string) {
    const requests = await prisma.community_collaboration_requests.findMany({
      where: {
        postId,
        status: 'PENDING',
      },
      include: { user: {
          include: {
            user_profiles: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return requests;
  }

  /**
   * Check if user has requested to join a post
   */
  static async getUserRequestStatus(postId: string, userId: string) {
    const request = await prisma.community_collaboration_requests.findUnique({
      where: {
        postId_requesterId: {
          postId,
          requesterId: userId,
        },
      },
    });

    return request?.status || null;
  }

  /**
   * Calculate reputation score
   * Formula: (posts * 5) + (likes * 2) + (collaborations * 10)
   */
  static calculateReputation(
    totalPosts: number,
    totalLikesReceived: number,
    totalCollaborations: number
  ): number {
    return (
      totalPosts * 5 +
      totalLikesReceived * 2 +
      totalCollaborations * 10
    );
  }

  /**
   * Update user profile stats after post creation
   */
  static async updateProfileAfterPost(userId: string, likesCount: number) {
    const profile = await prisma.user_profiles.upsert({
      where: { userId },
      create: {
        userId,
        totalPosts: 1,
        totalLikesReceived: likesCount,
        reputationScore: 5 + likesCount * 2,
      },
      update: {
        totalPosts: {
          increment: 1,
        },
        totalLikesReceived: {
          increment: likesCount,
        },
      },
    });

    // Recalculate reputation
    const newReputation = this.calculateReputation(
      profile.totalPosts + 1,
      profile.totalLikesReceived + likesCount,
      profile.totalCollaborations
    );

    await prisma.user_profiles.update({
      where: { userId },
      data: { reputationScore: newReputation },
    });
  }
}


