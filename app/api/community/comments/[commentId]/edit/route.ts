import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { CommentService } from '@/features/community/comment.service';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { commentId } = await params;
    const body = await request.json();
    const { content } = body;

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const result = await CommentService.editComment(
      commentId,
      session.user.id,
      content
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Edit comment error:', error);
    const message = error instanceof Error ? error.message : 'Failed to edit comment';
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}
