import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { CollaborationService } from '@/features/community/collaboration.service';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ status: null });
    }

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const status = await CollaborationService.getUserRequestStatus(
      postId,
      session.user.id
    );

    return NextResponse.json({ status });
  } catch (error) {
    console.error('Get request status error:', error);
    return NextResponse.json({ status: null });
  }
}
