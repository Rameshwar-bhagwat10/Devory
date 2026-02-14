import { prisma } from '@/lib/prisma';

export class CommentService {
  /**
   * Like a comment (toggle)
   * Uses transaction to ensure atomicity
   */
  static async likeComment(commentId: string, userId: string) {
    return await prisma.$transaction(async (tx) => {
      // Check if already liked
      const existingReaction = await tx.community_comment_reactions.findUnique({
        where: {
          userId_commentId: {
            userId,
            commentId,
          },
        },
      });

      if (existingReaction) {
        // Unlike: Remove reaction and decrement count
        await tx.community_comment_reactions.delete({
          where: { id: existingReaction.id },
        });

        await tx.community_comments.update({
          where: { id: commentId },
          data: {
            likesCount: {
              decrement: 1,
            },
          },
        });

        return { liked: false };
      } else {
        // Like: Create reaction and increment count
        await tx.community_comment_reactions.create({
          data: {
            userId,
            commentId,
          },
        });

        await tx.community_comments.update({
          where: { id: commentId },
          data: {
            likesCount: {
              increment: 1,
            },
          },
        });

        return { liked: true };
      }
    });
  }

  /**
   * Edit a comment
   * Only author can edit
   */
  static async editComment(commentId: string, userId: string, content: string) {
    // Fetch comment
    const comment = await prisma.community_comments.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    // Verify author
    if (comment.userId !== userId) {
      throw new Error('Unauthorized: You can only edit your own comments');
    }

    // Sanitize content
    const sanitizedContent = content.trim().slice(0, 2000);

    if (sanitizedContent.length < 1) {
      throw new Error('Comment cannot be empty');
    }

    // Update comment
    const updatedComment = await prisma.community_comments.update({
      where: { id: commentId },
      data: {
        content: sanitizedContent,
        updatedAt: new Date(),
      },
      include: { user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        community_comment_reactions: {
          where: {
            userId,
          },
        },
      },
    });

    return updatedComment;
  }

  /**
   * Delete a comment
   * Only author can delete
   */
  static async deleteComment(commentId: string, userId: string) {
    // Fetch comment
    const comment = await prisma.community_comments.findUnique({
      where: { id: commentId },
      include: { other_community_comments: true,
      },
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    // Verify author
    if (comment.userId !== userId) {
      throw new Error('Unauthorized: You can only delete your own comments');
    }

    // Delete comment (cascade will handle replies and reactions)
    await prisma.community_comments.delete({
      where: { id: commentId },
    });

    // Decrement post comment count
    await prisma.community_posts.update({
      where: { id: comment.postId },
      data: {
        commentsCount: {
          decrement: 1 + comment.other_community_comments.length, // Include replies
        },
      },
    });

    return { success: true };
  }

  /**
   * Get comment with reactions
   */
  static async getCommentWithReactions(commentId: string, userId?: string) {
    const comment = await prisma.community_comments.findUnique({
      where: { id: commentId },
      include: { user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        community_comment_reactions: userId
          ? {
              where: {
                userId,
              },
            }
          : false,
        _count: { select: { community_comment_reactions: true,
          },
        },
      },
    });

    return comment;
  }

  /**
   * Check if user has liked a comment
   */
  static async hasUserLikedComment(commentId: string, userId: string): Promise<boolean> {
    const reaction = await prisma.community_comment_reactions.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });

    return !!reaction;
  }
}

