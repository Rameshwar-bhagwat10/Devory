import { prisma } from '@/lib/prisma';

export class TrendingService {
  /**
   * Update trending scores for recent posts
   * Formula: (likes * 4) + (comments * 3) + (views * 1) - (time_decay)
   * time_decay = hours_since_creation * 0.5
   */
  static async updateTrendingScores() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Get recent posts
    const posts = await prisma.community_posts.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
        isApproved: true,
      },
      select: {
        id: true,
        likesCount: true,
        commentsCount: true,
        viewsCount: true,
        createdAt: true,
      },
    });

    const now = new Date();
    const updates = posts.map((post) => {
      const hoursSinceCreation =
        (now.getTime() - post.createdAt.getTime()) / (1000 * 60 * 60);
      const timeDecay = hoursSinceCreation * 0.5;

      const trendingScore =
        post.likesCount * 4 +
        post.commentsCount * 3 +
        post.viewsCount * 1 -
        timeDecay;

      return prisma.community_posts.update({
        where: { id: post.id },
        data: { trendingScore },
      });
    });

    // Execute all updates in parallel (batch)
    await Promise.all(updates);

    return { updated: posts.length };
  }

  /**
   * Calculate trending score for a single post
   */
  static calculateTrendingScore(
    likesCount: number,
    commentsCount: number,
    viewsCount: number,
    createdAt: Date
  ): number {
    const now = new Date();
    const hoursSinceCreation =
      (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    const timeDecay = hoursSinceCreation * 0.5;

    return likesCount * 4 + commentsCount * 3 + viewsCount * 1 - timeDecay;
  }

  /**
   * Update trending score for a specific post
   */
  static async updatePostTrendingScore(postId: string) {
    const post = await prisma.community_posts.findUnique({
      where: { id: postId },
      select: {
        likesCount: true,
        commentsCount: true,
        viewsCount: true,
        createdAt: true,
      },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    const trendingScore = this.calculateTrendingScore(
      post.likesCount,
      post.commentsCount,
      post.viewsCount,
      post.createdAt
    );

    await prisma.community_posts.update({
      where: { id: postId },
      data: { trendingScore },
    });

    return { trendingScore };
  }
}
