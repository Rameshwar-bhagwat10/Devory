import { prisma } from '@/lib/prisma';

export class ProfileService {
  /**
   * Get user profile by username (email prefix or name)
   */
  static async getProfileByUsername(username: string) {
    // Try to find user by name first, then by email prefix
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { name: { equals: username, mode: 'insensitive' } },
          { email: { startsWith: username.toLowerCase() } },
        ],
      },
      include: {
        user_profiles: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      createdAt: user.createdAt,
      user_profiles: user.user_profiles,
    };
  }

  /**
   * Get user profile with stats
   */
  static async getProfileWithStats(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        user_profiles: true,
      },
    });

    if (!user) {
      return null;
    }

    // Get additional stats
    const [postsCount, collaborationsCount, likesReceived, followersCount] = await Promise.all([
      prisma.community_posts.count({
        where: { userId, isApproved: true },
      }),
      prisma.community_collaboration_requests.count({
        where: {
          OR: [
            { requesterId: userId, status: 'ACCEPTED' },
            { community_posts: { userId }, status: 'ACCEPTED' },
          ],
        },
      }),
      prisma.community_reactions.count({
        where: {
          type: 'LIKE',
          community_posts: { userId },
        },
      }),
      prisma.user_followers.count({
        where: { followingId: userId },
      }),
    ]);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      createdAt: user.createdAt,
      user_profiles: user.user_profiles ? {
        ...user.user_profiles,
        totalPosts: postsCount,
        totalCollaborations: collaborationsCount,
        totalLikesReceived: likesReceived,
        followersCount: followersCount,
      } : null,
    };
  }

  /**
   * Get user's posts with pagination
   */
  static async getUserPosts(
    userId: string,
    page: number = 1,
    limit: number = 10,
    currentUserId?: string
  ) {
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.community_posts.findMany({
        where: { userId },
        include: { user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.community_posts.count({
        where: { userId },
      }),
    ]);

    // If currentUserId is provided, fetch user reactions and saved status
    let postsWithUserData = posts;
    if (currentUserId) {
      const postIds = posts.map(p => p.id);
      
      const [reactions, savedPosts] = await Promise.all([
        prisma.community_reactions.findMany({
          where: {
            userId: currentUserId,
            postId: { in: postIds },
          },
          select: {
            postId: true,
            type: true,
          },
        }),
        prisma.community_saved_posts.findMany({
          where: {
            userId: currentUserId,
            postId: { in: postIds },
          },
          select: {
            postId: true,
          },
        }),
      ]);

      const reactionMap = new Map(reactions.map(r => [r.postId, r.type]));
      const savedPostIds = new Set(savedPosts.map(sp => sp.postId));

      postsWithUserData = posts.map(post => ({
        ...post,
        userReaction: reactionMap.get(post.id) || undefined,
        isSaved: savedPostIds.has(post.id),
      }));
    }

    return {
      posts: postsWithUserData,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get user's collaborations with pagination
   */
  static async getUserCollaborations(
    userId: string,
    page: number = 1,
    limit: number = 10
  ) {
    const skip = (page - 1) * limit;

    const [collaborations, total] = await Promise.all([
      prisma.community_collaboration_requests.findMany({
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
        skip,
        take: limit,
      }),
      prisma.community_collaboration_requests.count({
        where: {
          requesterId: userId,
          status: 'ACCEPTED',
        },
      }),
    ]);

    return {
      collaborations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get top contributors by reputation
   */
  static async getTopContributors(limit: number = 5) {
    const profiles = await prisma.user_profiles.findMany({
      where: {
        reputationScore: {
          gt: 0,
        },
      },
      include: { user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        reputationScore: 'desc',
      },
      take: limit,
    });

    return profiles;
  }

  /**
   * Update user profile
   */
  static async updateProfile(
    userId: string,
    data: {
      bio?: string;
      github?: string;
      linkedin?: string;
      portfolio?: string;
      skillLevel?: string;
      academicYear?: string;
      institution?: string;
      preferredDomains?: string[];
    }
  ) {
    const profile = await prisma.user_profiles.upsert({
      where: { userId },
      create: {
        userId,
        ...data,
      },
      update: data,
    });

    return profile;
  }

  /**
   * Sync profile stats (for maintenance/migration)
   */
  static async syncProfileStats(userId: string) {
    const [postsCount, collaborationsCount, likesReceived] = await Promise.all([
      prisma.community_posts.count({
        where: { userId },
      }),
      prisma.community_collaboration_requests.count({
        where: {
          requesterId: userId,
          status: 'ACCEPTED',
        },
      }),
      prisma.community_posts.aggregate({
        where: { userId },
        _sum: {
          likesCount: true,
        },
      }),
    ]);

    const totalLikesReceived = likesReceived._sum.likesCount || 0;

    // Calculate reputation
    const reputationScore =
      postsCount * 5 + totalLikesReceived * 2 + collaborationsCount * 10;

    // Update profile
    await prisma.user_profiles.upsert({
      where: { userId },
      create: {
        userId,
        totalPosts: postsCount,
        totalCollaborations: collaborationsCount,
        totalLikesReceived,
        reputationScore,
      },
      update: {
        totalPosts: postsCount,
        totalCollaborations: collaborationsCount,
        totalLikesReceived,
        reputationScore,
      },
    });

    return {
      totalPosts: postsCount,
      totalCollaborations: collaborationsCount,
      totalLikesReceived,
      reputationScore,
    };
  }
}


