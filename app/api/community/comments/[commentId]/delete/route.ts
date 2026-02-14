import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { CommentService } from '@/features/community/comment.service';

export async function DELETE(
  _request: NextRequest,
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

    const result = await CommentService.deleteComment(commentId, session.user.id);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Delete comment error:', error);
    const message = error instanceof Error ? error.message : 'Failed to delete comment';
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}
