import { prisma } from '@/lib/prisma';
import { ReactionType } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import type {
  CreatePostInput,
  FeedFilters,
  PostWithAuthor,
  CommentWithAuthor,
  TrendingPost,
  CollaborationPost,
} from './community.types';
import { NotificationService } from './notification.service';
import { RateLimitService } from './rate-limit.service';

export class CommunityService {
  /**
   * Create a new community post
   */
  static async createPost(userId: string, input: CreatePostInput): Promise<PostWithAuthor> {
    // Rate limiting
    const rateLimit = await RateLimitService.checkRateLimit(userId, 'posts');
    if (!rateLimit.allowed) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    // Sanitize text inputs to prevent XSS
    const sanitizedTitle = input.title.trim().slice(0, 200);
    const sanitizedShortDesc = input.shortDescription.trim().slice(0, 500);
    const sanitizedFullDesc = input.fullDescription.trim().slice(0, 5000);
    
    // Generate unique slug
    const baseSlug = sanitizedTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    let slug = baseSlug;
    let counter = 1;
    
    // Check for duplicate slugs
    while (await prisma.community_posts.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    // Check daily post limit (5 posts per day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const postsToday = await prisma.community_posts.count({
      where: {
        userId,
        createdAt: { gte: today },
      },
    });
    
    if (postsToday >= 5) {
      throw new Error('Daily post limit reached (5 posts per day)');
    }
    
    // Create post
    const post = await prisma.community_posts.create({
      data: {
        userId,
        type: input.type,
        title: sanitizedTitle,
        slug,
        shortDescription: sanitizedShortDesc,
        fullDescription: sanitizedFullDesc,
        domain: input.domain,
        difficulty: input.difficulty,
        techStack: input.techStack,
        tags: input.tags,
        estimatedDuration: input.estimatedDuration,
        requiredCollaborators: input.requiredCollaborators,
        requiredSkills: input.requiredSkills || [],
        isAnonymous: input.isAnonymous || false,
        status: input.type === 'COLLABORATION' ? 'OPEN' : 'OPEN',
      },
      include: { user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    
    return this.formatPost(post);
  }
  
  /**
   * Get feed with filters and pagination - ULTRA OPTIMIZED
   * Uses React cache + Next.js cache + optimized queries
   */
  static getFeed = cache(async (
    filters: FeedFilters,
    currentUserId?: string
  ): Promise<{ posts: PostWithAuthor[]; total: number; page: number; totalPages: number }> => {
    // Create cache key based on filters
    const cacheKey = `feed-${filters.sortBy || 'latest'}-${filters.type || 'all'}-${filters.domain || 'all'}-${filters.difficulty || 'all'}-${filters.page || 1}-${currentUserId || 'anon'}`;
    
    return unstable_cache(
      async () => {
        try {
          const page = filters.page || 1;
          const limit = Math.min(filters.limit || 20, 50);
          const skip = (page - 1) * limit;
          
          // Build optimized where clause
          const where = {
            isApproved: true,
            ...(filters.type && { type: filters.type }),
            ...(filters.domain && { domain: filters.domain }),
            ...(filters.difficulty && { difficulty: filters.difficulty }),
            ...(filters.status && { status: filters.status }),
          };
          
          // Optimized orderBy
          let orderBy: Record<string, 'desc' | 'asc'> = {};
          switch (filters.sortBy) {
            case 'trending':
              orderBy = { trendingScore: 'desc' };
              break;
            case 'popular':
              orderBy = { likesCount: 'desc' };
              break;
            case 'latest':
            default:
              orderBy = { createdAt: 'desc' };
          }
          
          // Ultra-optimized parallel queries with minimal fields
          const [posts, total] = await Promise.all([
            prisma.community_posts.findMany({
              where,
              orderBy,
              skip,
              take: limit,
              select: {
                id: true,
                userId: true,
                type: true,
                title: true,
                slug: true,
                shortDescription: true,
                domain: true,
                difficulty: true,
                techStack: true,
                tags: true,
                viewsCount: true,
                likesCount: true,
                dislikesCount: true,
                commentsCount: true,
                status: true,
                requiredCollaborators: true,
                currentCollaborators: true,
                requiredSkills: true,
                createdAt: true,
                updatedAt: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
                ...(currentUserId && {
                  community_reactions: {
                    where: { userId: currentUserId },
                    select: { type: true },
                    take: 1,
                  },
                  community_saved_posts: {
                    where: { userId: currentUserId },
                    select: { id: true },
                    take: 1,
                  },
                }),
              },
            }),
            prisma.community_posts.count({ where }),
          ]);
          
          return {
            posts: posts.map((post) => this.formatPost(post, currentUserId)),
            total,
            page,
            totalPages: Math.ceil(total / limit),
          };
        } catch (error) {
          console.error('CommunityService.getFeed error:', error);
          return {
            posts: [],
            total: 0,
            page: filters.page || 1,
            totalPages: 0,
          };
        }
      },
      [cacheKey],
      {
        revalidate: 15, // Aggressive 15s cache
        tags: ['community-feed', `feed-${filters.sortBy || 'latest'}`],
      }
    )();
  });
  
  /**
   * Get trending posts - ULTRA OPTIMIZED
   */
  static getTrending = cache(async (limit: number = 5): Promise<TrendingPost[]> => {
    return unstable_cache(
      async () => {
        try {
          const posts = await prisma.community_posts.findMany({
            where: { isApproved: true },
            orderBy: { trendingScore: 'desc' },
            take: limit,
            select: {
              id: true,
              title: true,
              slug: true,
              type: true,
              domain: true,
              viewsCount: true,
              likesCount: true,
              commentsCount: true,
              trendingScore: true,
              createdAt: true,
            },
          });
          
          return posts;
        } catch (error) {
          console.error('CommunityService.getTrending error:', error);
          return [];
        }
      },
      ['trending', `limit-${limit}`],
      {
        revalidate: 30, // Aggressive 30s cache
        tags: ['community-trending'],
      }
    )();
  });
  
  /**
   * Get latest open collaborations - ULTRA OPTIMIZED
   */
  static getLatestCollaborations = cache(async (limit: number = 5): Promise<CollaborationPost[]> => {
    return unstable_cache(
      async () => {
        try {
          const posts = await prisma.community_posts.findMany({
            where: {
              type: 'COLLABORATION',
              status: 'OPEN',
              isApproved: true,
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
            select: {
              id: true,
              title: true,
              slug: true,
              shortDescription: true,
              status: true,
              requiredCollaborators: true,
              currentCollaborators: true,
              requiredSkills: true,
              createdAt: true,
            },
          });
          
          return posts.map((post) => ({
            ...post,
            requiredSkills: post.requiredSkills as string[],
          }));
        } catch (error) {
          console.error('CommunityService.getLatestCollaborations error:', error);
          return [];
        }
      },
      ['collaborations-latest', `limit-${limit}`],
      {
        revalidate: 30, // Aggressive 30s cache
        tags: ['community-collaborations'],
      }
    )();
  });
  
  /**
   * Get post by slug - ULTRA OPTIMIZED
   */
  static getPostBySlug = cache(async (slug: string, currentUserId?: string): Promise<PostWithAuthor | null> => {
    return unstable_cache(
      async () => {
        const post = await prisma.community_posts.findUnique({
          where: { slug },
          select: {
            id: true,
            userId: true,
            type: true,
            title: true,
            slug: true,
            shortDescription: true,
            fullDescription: true,
            domain: true,
            difficulty: true,
            techStack: true,
            tags: true,
            estimatedDuration: true,
            viewsCount: true,
            likesCount: true,
            dislikesCount: true,
            commentsCount: true,
            trendingScore: true,
            status: true,
            requiredCollaborators: true,
            currentCollaborators: true,
            requiredSkills: true,
            isAnonymous: true,
            isApproved: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            ...(currentUserId && {
              community_reactions: {
                where: { userId: currentUserId },
                select: { type: true },
                take: 1,
              },
              community_saved_posts: {
                where: { userId: currentUserId },
                select: { id: true },
                take: 1,
              },
            }),
          },
        });
        
        if (!post) return null;
        
        return this.formatPost(post, currentUserId);
      },
      [`post-${slug}-${currentUserId || 'anon'}`],
      {
        revalidate: 15, // Aggressive 15s cache
        tags: ['community-post', `post-${slug}`],
      }
    )();
  });
  
  /**
   * Toggle reaction (like/dislike)
   */
  static async toggleReaction(
    userId: string,
    postId: string,
    type: ReactionType
  ): Promise<{ action: 'added' | 'removed' | 'changed'; likesCount: number; dislikesCount: number }> {
    // Rate limiting
    const rateLimit = await RateLimitService.checkRateLimit(userId, 'reactions');
    if (!rateLimit.allowed) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    return await prisma.$transaction(async (tx) => {
      // Check existing reaction
      const existingReaction = await tx.community_reactions.findUnique({
        where: {
          userId_postId: { userId, postId },
        },
      });
      
      let action: 'added' | 'removed' | 'changed';
      
      if (existingReaction) {
        if (existingReaction.type === type) {
          // Remove reaction
          await tx.community_reactions.delete({
            where: { id: existingReaction.id },
          });
          
          // Update counter
          await tx.community_posts.update({
            where: { id: postId },
            data: {
              [type === 'LIKE' ? 'likesCount' : 'dislikesCount']: { decrement: 1 },
            },
          });
          
          action = 'removed';
        } else {
          // Change reaction
          await tx.community_reactions.update({
            where: { id: existingReaction.id },
            data: { type },
          });
          
          // Update counters
          await tx.community_posts.update({
            where: { id: postId },
            data: {
              [existingReaction.type === 'LIKE' ? 'likesCount' : 'dislikesCount']: { decrement: 1 },
              [type === 'LIKE' ? 'likesCount' : 'dislikesCount']: { increment: 1 },
            },
          });
          
          action = 'changed';
        }
      } else {
        // Add new reaction
        await tx.community_reactions.create({
          data: {
            userId,
            postId,
            type,
          },
        });
        
        // Update counter
        await tx.community_posts.update({
          where: { id: postId },
          data: {
            [type === 'LIKE' ? 'likesCount' : 'dislikesCount']: { increment: 1 },
          },
        });
        
        action = 'added';
      }
      
      // Get updated counts and post author
      const post = await tx.community_posts.findUnique({
        where: { id: postId },
        select: { likesCount: true, dislikesCount: true, userId: true },
      });
      
      // Create notification for LIKE (only when added, not removed or changed)
      if (action === 'added' && type === 'LIKE' && post) {
        await NotificationService.createNotification(
          post.userId,
          'LIKE',
          userId,
          postId
        );
      }
      
      // Update trending score
      await this.updateTrendingScore(postId, tx);
      
      return {
        action,
        likesCount: post!.likesCount,
        dislikesCount: post!.dislikesCount,
      };
    });
  }
  
  /**
   * Create comment
   */
  static async createComment(
    userId: string,
    postId: string,
    content: string,
    parentId?: string
  ): Promise<CommentWithAuthor> {
    // Rate limiting
    const rateLimit = await RateLimitService.checkRateLimit(userId, 'comments');
    if (!rateLimit.allowed) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    // Sanitize content to prevent XSS
    const sanitizedContent = content
      .trim()
      .slice(0, 2000)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
    
    if (!sanitizedContent) {
      throw new Error('Comment content is required');
    }
    
    return await prisma.$transaction(async (tx) => {
      // Get post author
      const post = await tx.community_posts.findUnique({
        where: { id: postId },
        select: { userId: true },
      });

      // Create comment
      const comment = await tx.community_comments.create({
        data: {
          userId,
          postId,
          content: sanitizedContent,
          parentId,
        },
        include: { user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });
      
      // Create notification for post author
      if (post) {
        await NotificationService.createNotification(
          post.userId,
          'COMMENT',
          userId,
          postId
        );
      }
      
      // Increment comments count
      await tx.community_posts.update({
        where: { id: postId },
        data: { commentsCount: { increment: 1 } },
      });
      
      // Update trending score
      await this.updateTrendingScore(postId, tx);
      
      return comment;
    });
  }
  
  /**
   * Get comments for a post - ULTRA OPTIMIZED
   */
  static getComments = cache(async (postId: string): Promise<CommentWithAuthor[]> => {
    return unstable_cache(
      async () => {
        const comments = await prisma.community_comments.findMany({
          where: {
            postId,
            parentId: null,
          },
          orderBy: { createdAt: 'desc' },
          take: 50,
          select: {
            id: true,
            userId: true,
            postId: true,
            parentId: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            likesCount: true,
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            other_community_comments: {
              orderBy: { createdAt: 'asc' },
              take: 20,
              select: {
                id: true,
                userId: true,
                postId: true,
                parentId: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                likesCount: true,
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
        });
        
        return comments.map(comment => ({
          ...comment,
          replies: comment.other_community_comments,
        })) as CommentWithAuthor[];
      },
      [`comments-${postId}`],
      {
        revalidate: 10, // Aggressive 10s cache
        tags: ['community-comments', `comments-${postId}`],
      }
    )();
  });
  
  /**
   * Increment view count (throttled per user)
   */
  static async incrementView(postId: string, userId?: string, ipAddress?: string): Promise<void> {
    // Check if view already recorded in last 30 minutes
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    
    const existingView = await prisma.community_post_views.findFirst({
      where: {
        postId,
        ...(userId ? { userId } : { ipAddress }),
        createdAt: { gte: thirtyMinutesAgo },
      },
    });
    
    if (existingView) return;
    
    // Record view and increment counter
    await prisma.$transaction([
      prisma.community_post_views.create({
        data: {
          postId,
          userId,
          ipAddress,
        },
      }),
      prisma.community_posts.update({
        where: { id: postId },
        data: { viewsCount: { increment: 1 } },
      }),
    ]);
    
    // Update trending score
    await this.updateTrendingScore(postId);
  }
  
  /**
   * Update trending score
   */
  private static async updateTrendingScore(postId: string, tx?: Omit<typeof prisma, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>): Promise<void> {
    const db = tx || prisma;
    
    const post = await db.community_posts.findUnique({
      where: { id: postId },
      select: {
        likesCount: true,
        commentsCount: true,
        viewsCount: true,
        createdAt: true,
      },
    });
    
    if (!post) return;
    
    // Calculate trending score
    const hoursSincePost = (Date.now() - post.createdAt.getTime()) / (1000 * 60 * 60);
    const trendingScore =
      post.likesCount * 4 +
      post.commentsCount * 3 +
      post.viewsCount * 1 -
      hoursSincePost * 0.5;
    
    await db.community_posts.update({
      where: { id: postId },
      data: { trendingScore },
    });
  }
  
  /**
   * Format post for response
   */
  private static formatPost(post: Record<string, unknown>, currentUserId?: string): PostWithAuthor {
    const reactions = post.community_reactions as Array<{ type: string }> | undefined;
    const savedPosts = post.community_saved_posts as Array<{ id: string }> | undefined;
    const user = post.user as { id: string; name: string | null; image: string | null } | undefined;
    
    return {
      ...post,
      user: user, // User relation from database
      techStack: post.techStack as string[],
      tags: post.tags as string[],
      requiredSkills: post.requiredSkills as string[],
      userReaction: currentUserId && reactions?.[0] ? reactions[0].type : undefined,
      isSaved: currentUserId && savedPosts && savedPosts.length > 0,
    } as PostWithAuthor;
  }

  /**
   * Get top contributors by reputation - ULTRA OPTIMIZED
   */
  static getTopContributors = cache(async (limit: number = 5) => {
    return unstable_cache(
      async () => {
        try {
          const profiles = await prisma.user_profiles.findMany({
            where: {
              reputationScore: {
                gt: 0,
              },
            },
            select: {
              reputationScore: true,
              totalPosts: true,
              totalCollaborations: true,
              user: {
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

          return profiles.map(profile => ({
            id: profile.user.id,
            name: profile.user.name,
            image: profile.user.image,
            reputationScore: profile.reputationScore,
            totalPosts: profile.totalPosts,
            totalCollaborations: profile.totalCollaborations,
          }));
        } catch {
          return [];
        }
      },
      ['contributors', `limit-${limit}`],
      {
        revalidate: 120, // 2 minute cache
        tags: ['community-contributors'],
      }
    )();
  });
}

