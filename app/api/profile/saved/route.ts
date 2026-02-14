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

    const [savedPosts, total] = await Promise.all([
      prisma.community_saved_posts.findMany({
        where: { userId: session.user.id },
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
      prisma.community_saved_posts.count({
        where: { userId: session.user.id },
      }),
    ]);

    // Get user reactions for these posts
    const postIds = savedPosts.map(sp => sp.community_posts.id);
    const reactions = await prisma.community_reactions.findMany({
      where: {
        userId: session.user.id,
        postId: { in: postIds },
      },
      select: {
        postId: true,
        type: true,
      },
    });

    const reactionMap = new Map(reactions.map(r => [r.postId, r.type]));

    const posts = savedPosts.map((saved) => ({
      ...saved.community_posts,
      userReaction: reactionMap.get(saved.community_posts.id) || undefined,
      isSaved: true,
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
    console.error('Get saved posts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch saved posts' },
      { status: 500 }
    );
  }
}
