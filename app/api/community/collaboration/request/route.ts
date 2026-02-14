import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { CollaborationService } from '@/features/community/collaboration.service';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { postId } = body;

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const result = await CollaborationService.requestCollaboration(
      postId,
      session.user.id
    );

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Request collaboration error:', error);
    const message = error instanceof Error ? error.message : 'Failed to request collaboration';
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}
