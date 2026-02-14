import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { CollaborationService } from '@/features/community/collaboration.service';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'PENDING' | 'ACCEPTED' | 'REJECTED' | null;

    const requests = await CollaborationService.getRequestsForOwner(
      session.user.id,
      status || undefined
    );

    return NextResponse.json(requests);
  } catch (error) {
    console.error('Get requests error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}
