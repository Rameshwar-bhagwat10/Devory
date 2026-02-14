import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { CollaborationService } from '@/features/community/collaboration.service';

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ requestId: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { requestId } = await params;

    const result = await CollaborationService.acceptRequest(
      requestId,
      session.user.id
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Accept request error:', error);
    const message = error instanceof Error ? error.message : 'Failed to accept request';
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}
