import { prisma } from '@/lib/prisma';

interface RateLimitConfig {
  posts: { limit: number; window: number }; // 5 per hour
  comments: { limit: number; window: number }; // 30 per hour
  reactions: { limit: number; window: number }; // 50 per hour
  follows: { limit: number; window: number }; // 20 per hour
}

const RATE_LIMITS: RateLimitConfig = {
  posts: { limit: 5, window: 3600 }, // 5 posts per hour
  comments: { limit: 30, window: 3600 }, // 30 comments per hour
  reactions: { limit: 50, window: 3600 }, // 50 reactions per hour
  follows: { limit: 20, window: 3600 }, // 20 follows per hour
};

export class RateLimitService {
  /**
   * Check if action is rate limited
   * Returns true if allowed, false if rate limited
   */
  static async checkRateLimit(
    userId: string,
    action: keyof RateLimitConfig
  ): Promise<{ allowed: boolean; remaining?: number; resetAt?: Date }> {
    const config = RATE_LIMITS[action];
    const windowStart = new Date(Date.now() - config.window * 1000);

    // Get or create rate limit record
    const rateLimitRecord = await prisma.rate_limits.findFirst({
      where: {
        userId,
        action,
        windowStart: {
          gte: windowStart,
        },
      },
    });

    if (!rateLimitRecord) {
      // No record found, create new one
      await prisma.rate_limits.create({
        data: {
          userId,
          action,
          count: 1,
          windowStart: new Date(),
        },
      });

      return {
        allowed: true,
        remaining: config.limit - 1,
        resetAt: new Date(Date.now() + config.window * 1000),
      };
    }

    // Check if limit exceeded
    if (rateLimitRecord.count >= config.limit) {
      const resetAt = new Date(
        rateLimitRecord.windowStart.getTime() + config.window * 1000
      );

      return {
        allowed: false,
        remaining: 0,
        resetAt,
      };
    }

    // Increment count
    await prisma.rate_limits.update({
      where: { id: rateLimitRecord.id },
      data: {
        count: {
          increment: 1,
        },
      },
    });

    return {
      allowed: true,
      remaining: config.limit - rateLimitRecord.count - 1,
      resetAt: new Date(
        rateLimitRecord.windowStart.getTime() + config.window * 1000
      ),
    };
  }

  /**
   * Clean up old rate limit records
   */
  static async cleanup() {
    const cutoffDate = new Date(Date.now() - 24 * 3600 * 1000); // 24 hours ago

    const result = await prisma.rate_limits.deleteMany({
      where: {
        windowStart: {
          lt: cutoffDate,
        },
      },
    });

    return { deleted: result.count };
  }

  /**
   * Get current rate limit status
   */
  static async getStatus(userId: string, action: keyof RateLimitConfig) {
    const config = RATE_LIMITS[action];
    const windowStart = new Date(Date.now() - config.window * 1000);

    const rateLimitRecord = await prisma.rate_limits.findFirst({
      where: {
        userId,
        action,
        windowStart: {
          gte: windowStart,
        },
      },
    });

    if (!rateLimitRecord) {
      return {
        limit: config.limit,
        remaining: config.limit,
        resetAt: new Date(Date.now() + config.window * 1000),
      };
    }

    return {
      limit: config.limit,
      remaining: Math.max(0, config.limit - rateLimitRecord.count),
      resetAt: new Date(
        rateLimitRecord.windowStart.getTime() + config.window * 1000
      ),
    };
  }
}
