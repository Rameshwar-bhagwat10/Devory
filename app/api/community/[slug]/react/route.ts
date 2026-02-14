import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { CommunityService } from '@/features/community/community.service';
import { ReactionType } from '@prisma/client';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { type } = body;
    
    if (!type || !['LIKE', 'DISLIKE'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid reaction type' },
        { status: 400 }
      );
    }
    
    // Get post by slug first
    const post = await CommunityService.getPostBySlug(slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    const result = await CommunityService.toggleReaction(
      session.user.id,
      post.id,
      type as ReactionType
    );
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Toggle reaction error:', error);
    return NextResponse.json(
      { error: 'Failed to toggle reaction' },
      { status: 500 }
    );
  }
}
