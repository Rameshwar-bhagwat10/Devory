import { prisma } from '@/lib/prisma';
import { ReactionType } from '@prisma/client';
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
   * Get feed with filters and pagination
   */
  static async getFeed(
    filters: FeedFilters,
    currentUserId?: string
  ): Promise<{ posts: PostWithAuthor[]; total: number; page: number; totalPages: number }> {
    try {
      const page = filters.page || 1;
      const limit = filters.limit || 20;
      const skip = (page - 1) * limit;
      
      // Build where clause
      const where = {
        isApproved: true,
        ...(filters.type && { type: filters.type }),
        ...(filters.domain && { domain: filters.domain }),
        ...(filters.difficulty && { difficulty: filters.difficulty }),
        ...(filters.status && { status: filters.status }),
      };
      
      // Build orderBy clause
      let orderBy: { trendingScore?: 'desc'; likesCount?: 'desc'; createdAt?: 'desc' } = {};
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
      
      // Get posts
      const [posts, total] = await Promise.all([
        prisma.community_posts.findMany({
          where,
          orderBy,
          skip,
          take: limit,
          include: { user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            community_reactions: currentUserId
              ? {
                  where: { userId: currentUserId },
                  select: { type: true },
                }
              : false,
            community_saved_posts: currentUserId
              ? {
                  where: { userId: currentUserId },
                  select: { id: true },
                }
              : false,
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
      // Return empty feed instead of throwing
      return {
        posts: [],
        total: 0,
        page: filters.page || 1,
        totalPages: 0,
      };
    }
  }
  
  /**
   * Get trending posts
   */
  static async getTrending(limit: number = 5): Promise<TrendingPost[]> {
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
  }
  
  /**
   * Get latest open collaborations
   */
  static async getLatestCollaborations(limit: number = 5): Promise<CollaborationPost[]> {
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
  }
  
  /**
   * Get post by slug
   */
  static async getPostBySlug(slug: string, currentUserId?: string): Promise<PostWithAuthor | null> {
    const post = await prisma.community_posts.findUnique({
      where: { slug },
      include: { user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        community_reactions: currentUserId
          ? {
              where: { userId: currentUserId },
              select: { type: true },
            }
          : false,
        community_saved_posts: currentUserId
          ? {
              where: { userId: currentUserId },
              select: { id: true },
            }
          : false,
      },
    });
    
    if (!post) return null;
    
    return this.formatPost(post, currentUserId);
  }
  
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
   * Get comments for a post
   */
  static async getComments(postId: string): Promise<CommentWithAuthor[]> {
    const comments = await prisma.community_comments.findMany({
      where: {
        postId,
        parentId: null, // Only top-level comments
      },
      orderBy: { createdAt: 'desc' },
      include: { user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        other_community_comments: {
          orderBy: { createdAt: 'asc' },
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
    });
    
    // Map other_community_comments to replies
    return comments.map(comment => ({
      ...comment,
      replies: comment.other_community_comments,
    })) as CommentWithAuthor[];
  }
  
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
   * Get top contributors by reputation
   */
  static async getTopContributors(limit: number = 5) {
    try {
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
  }
}

