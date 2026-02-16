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
    const [postsCount, requestedCollabs, ownedCollabs, likesReceived, followersCount] = await Promise.all([
      prisma.community_posts.count({
        where: { userId, isApproved: true },
      }),
      // Collaborations where user joined others' projects
      prisma.community_collaboration_requests.count({
        where: {
          requesterId: userId,
          status: 'ACCEPTED',
        },
      }),
      // Collaborations where user's project has accepted members
      prisma.community_posts.count({
        where: {
          userId,
          type: 'COLLABORATION',
          community_collaboration_requests: {
            some: {
              status: 'ACCEPTED',
            },
          },
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

    const collaborationsCount = requestedCollabs + ownedCollabs;

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
   * Includes both:
   * 1. Collaborations where user joined others' projects (as requester)
   * 2. Collaborations where user's project accepted team members (as owner)
   */
  static async getUserCollaborations(
    userId: string,
    page: number = 1,
    limit: number = 10
  ) {
    const skip = (page - 1) * limit;

    // Get collaborations where user is the requester (joined others' projects)
    const [requestedCollaborations, ownedCollaborations] = await Promise.all([
      prisma.community_collaboration_requests.findMany({
        where: {
          requesterId: userId,
          status: 'ACCEPTED',
        },
        include: {
          community_posts: {
            include: {
              user: {
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
      }),
      // Get collaborations where user owns the project and accepted team members
      prisma.community_posts.findMany({
        where: {
          userId,
          type: 'COLLABORATION',
          community_collaboration_requests: {
            some: {
              status: 'ACCEPTED',
            },
          },
        },
        include: {
          user: {
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
      }),
    ]);

    // Combine and format both types of collaborations
    const requestedFormatted = requestedCollaborations.map(collab => ({
      id: collab.id,
      community_posts: collab.community_posts,
      role: 'member' as const,
      joinedAt: collab.createdAt,
    }));

    const ownedFormatted = ownedCollaborations.map(post => ({
      id: post.id,
      community_posts: post,
      role: 'owner' as const,
      joinedAt: post.createdAt,
    }));

    // Combine and sort by date
    const allCollaborations = [...requestedFormatted, ...ownedFormatted]
      .sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime());

    const total = allCollaborations.length;
    const paginatedCollaborations = allCollaborations.slice(skip, skip + limit);

    return {
      collaborations: paginatedCollaborations,
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
    const [postsCount, requestedCollabs, ownedCollabs, likesReceived] = await Promise.all([
      prisma.community_posts.count({
        where: { userId },
      }),
      // Collaborations where user joined others' projects
      prisma.community_collaboration_requests.count({
        where: {
          requesterId: userId,
          status: 'ACCEPTED',
        },
      }),
      // Collaborations where user's project has accepted members
      prisma.community_posts.count({
        where: {
          userId,
          type: 'COLLABORATION',
          community_collaboration_requests: {
            some: {
              status: 'ACCEPTED',
            },
          },
        },
      }),
      prisma.community_posts.aggregate({
        where: { userId },
        _sum: {
          likesCount: true,
        },
      }),
    ]);

    const collaborationsCount = requestedCollabs + ownedCollabs;
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


