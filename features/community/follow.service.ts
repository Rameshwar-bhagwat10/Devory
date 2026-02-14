import { prisma } from '@/lib/prisma';

export class FollowService {
  /**
   * Follow a user
   */
  static async followUser(followerId: string, followingId: string) {
    // Validation: Cannot follow self
    if (followerId === followingId) {
      throw new Error('Cannot follow yourself');
    }

    // Check if already following
    const existing = await prisma.user_followers.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (existing) {
      throw new Error('Already following this user');
    }

    // Create follow relationship
    await prisma.$transaction(async (tx) => {
      await tx.user_followers.create({
        data: {
          followerId,
          followingId,
        },
      });

      // Update follower count
      await tx.user_profiles.upsert({
        where: { userId: followingId },
        create: {
          userId: followingId,
          followersCount: 1,
        },
        update: {
          followersCount: {
            increment: 1,
          },
        },
      });

      // Update following count
      await tx.user_profiles.upsert({
        where: { userId: followerId },
        create: {
          userId: followerId,
          followingCount: 1,
        },
        update: {
          followingCount: {
            increment: 1,
          },
        },
      });
    });

    return { success: true };
  }

  /**
   * Unfollow a user
   */
  static async unfollowUser(followerId: string, followingId: string) {
    const existing = await prisma.user_followers.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (!existing) {
      throw new Error('Not following this user');
    }

    await prisma.$transaction(async (tx) => {
      await tx.user_followers.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });

      // Decrement follower count
      await tx.user_profiles.update({
        where: { userId: followingId },
        data: {
          followersCount: {
            decrement: 1,
          },
        },
      });

      // Decrement following count
      await tx.user_profiles.update({
        where: { userId: followerId },
        data: {
          followingCount: {
            decrement: 1,
          },
        },
      });
    });

    return { success: true };
  }

  /**
   * Check if user is following another user
   */
  static async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const follow = await prisma.user_followers.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    return !!follow;
  }

  /**
   * Get followers list
   */
  static async getFollowers(userId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [followers, total] = await Promise.all([
      prisma.user_followers.findMany({
        where: { followingId: userId },
        include: {
          follower: {
            select: {
              id: true,
              name: true,
              image: true,
              user_profiles: {
                select: {
                  reputationScore: true,
                  totalPosts: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.user_followers.count({
        where: { followingId: userId },
      }),
    ]);

    return {
      followers: followers.map((f) => f.follower),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get following list
   */
  static async getFollowing(userId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [following, total] = await Promise.all([
      prisma.user_followers.findMany({
        where: { followerId: userId },
        include: {
          following: {
            select: {
              id: true,
              name: true,
              image: true,
              user_profiles: {
                select: {
                  reputationScore: true,
                  totalPosts: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.user_followers.count({
        where: { followerId: userId },
      }),
    ]);

    return {
      following: following.map((f) => f.following),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get following feed (posts from followed users)
   */
  static async getFollowingFeed(userId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    // Get list of followed user IDs
    const following = await prisma.user_followers.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });

    const followingIds = following.map((f) => f.followingId);

    if (followingIds.length === 0) {
      return {
        posts: [],
        pagination: { page, limit, total: 0, totalPages: 0 },
      };
    }

    const [posts, total] = await Promise.all([
      prisma.community_posts.findMany({
        where: {
          userId: { in: followingIds },
          isApproved: true,
        },
        include: { user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: { trendingScore: 'desc' },
        skip,
        take: limit,
      }),
      prisma.community_posts.count({
        where: {
          userId: { in: followingIds },
          isApproved: true,
        },
      }),
    ]);

    return {
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

