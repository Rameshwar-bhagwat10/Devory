import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { FollowService } from '@/features/community/follow.service';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const result = await FollowService.getFollowingFeed(
      session.user.id,
      page,
      limit
    );

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Following feed error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch following feed' },
      { status: 500 }
    );
  }
}
