import { prisma } from '@/lib/prisma';

export class SaveService {
  /**
   * Save/bookmark a post
   */
  static async savePost(userId: string, postId: string) {
    // Check if already saved
    const existing = await prisma.community_saved_posts.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existing) {
      throw new Error('Post already saved');
    }

    await prisma.community_saved_posts.create({
      data: {
        userId,
        postId,
      },
    });

    return { success: true, saved: true };
  }

  /**
   * Unsave/unbookmark a post
   */
  static async unsavePost(userId: string, postId: string) {
    const existing = await prisma.community_saved_posts.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (!existing) {
      throw new Error('Post not saved');
    }

    await prisma.community_saved_posts.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    return { success: true, saved: false };
  }

  /**
   * Toggle save status
   */
  static async toggleSave(userId: string, postId: string) {
    const existing = await prisma.community_saved_posts.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existing) {
      await prisma.community_saved_posts.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
      return { success: true, saved: false };
    } else {
      await prisma.community_saved_posts.create({
        data: {
          userId,
          postId,
        },
      });
      return { success: true, saved: true };
    }
  }

  /**
   * Check if post is saved
   */
  static async isSaved(userId: string, postId: string): Promise<boolean> {
    const saved = await prisma.community_saved_posts.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    return !!saved;
  }

  /**
   * Get saved posts
   */
  static async getSavedPosts(userId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [savedPosts, total] = await Promise.all([
      prisma.community_saved_posts.findMany({
        where: { userId },
        include: {
          community_posts: {
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
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.community_saved_posts.count({
        where: { userId },
      }),
    ]);

    // Get user reactions for these posts
    const postIds = savedPosts.map(sp => sp.community_posts.id);
    const reactions = await prisma.community_reactions.findMany({
      where: {
        userId,
        postId: { in: postIds },
      },
      select: {
        postId: true,
        type: true,
      },
    });

    const reactionMap = new Map(reactions.map(r => [r.postId, r.type]));

    return {
      posts: savedPosts.map((sp) => ({
        ...sp.community_posts,
        savedAt: sp.createdAt,
        userReaction: reactionMap.get(sp.community_posts.id) || undefined,
        isSaved: true, // All posts in this list are saved
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

