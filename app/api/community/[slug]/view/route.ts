import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { CommunityService } from '@/features/community/community.service';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const session = await auth();
    
    // Get post by slug first
    const post = await CommunityService.getPostBySlug(slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Get IP address for anonymous tracking
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    
    await CommunityService.incrementView(
      post.id,
      session?.user?.id,
      ip
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Increment view error:', error);
    return NextResponse.json(
      { error: 'Failed to increment view' },
      { status: 500 }
    );
  }
}
