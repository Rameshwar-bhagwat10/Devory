import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const [likedReactions, total] = await Promise.all([
      prisma.community_reactions.findMany({
        where: {
          userId: session.user.id,
          type: 'LIKE',
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
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.community_reactions.count({
        where: {
          userId: session.user.id,
          type: 'LIKE',
        },
      }),
    ]);

    // Get saved status for these posts
    const postIds = likedReactions.map(r => r.community_posts.id);
    const savedPosts = await prisma.community_saved_posts.findMany({
      where: {
        userId: session.user.id,
        postId: { in: postIds },
      },
      select: {
        postId: true,
      },
    });

    const savedPostIds = new Set(savedPosts.map(sp => sp.postId));

    const posts = likedReactions.map((reaction) => ({
      ...reaction.community_posts,
      userReaction: 'LIKE',
      isSaved: savedPostIds.has(reaction.community_posts.id),
    }));

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get liked posts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch liked posts' },
      { status: 500 }
    );
  }
}
