import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { CommentService } from '@/features/community/comment.service';

export async function POST(
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

    const result = await CommentService.likeComment(commentId, session.user.id);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Like comment error:', error);
    return NextResponse.json(
      { error: 'Failed to like comment' },
      { status: 500 }
    );
  }
}
