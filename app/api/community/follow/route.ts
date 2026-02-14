import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { FollowService } from '@/features/community/follow.service';
import { NotificationService } from '@/features/community/notification.service';
import { RateLimitService } from '@/features/community/rate-limit.service';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { followingId, action } = await req.json();

    if (!followingId || !action) {
      return NextResponse.json(
        { error: 'Missing followingId or action' },
        { status: 400 }
      );
    }

    // Rate limiting
    const rateLimit = await RateLimitService.checkRateLimit(
      session.user.id,
      'follows'
    );

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          resetAt: rateLimit.resetAt,
        },
        { status: 429 }
      );
    }

    if (action === 'follow') {
      await FollowService.followUser(session.user.id, followingId);

      // Create notification
      await NotificationService.createNotification(
        followingId,
        'FOLLOW',
        session.user.id
      );

      return NextResponse.json({ success: true, following: true });
    } else if (action === 'unfollow') {
      await FollowService.unfollowUser(session.user.id, followingId);
      return NextResponse.json({ success: true, following: false });
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Follow error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process follow action' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const targetUserId = searchParams.get('userId');

    if (!targetUserId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    const isFollowing = await FollowService.isFollowing(
      session.user.id,
      targetUserId
    );

    return NextResponse.json({ isFollowing });
  } catch (error: any) {
    console.error('Check follow error:', error);
    return NextResponse.json(
      { error: 'Failed to check follow status' },
      { status: 500 }
    );
  }
}
