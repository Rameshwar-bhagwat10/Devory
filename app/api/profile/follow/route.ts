import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NotificationService } from '@/features/community/notification.service';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { targetUserId } = await req.json();

    if (!targetUserId) {
      return NextResponse.json(
        { error: 'Target user ID is required' },
        { status: 400 }
      );
    }

    if (targetUserId === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot follow yourself' },
        { status: 400 }
      );
    }

    // Check if already following
    const existingFollow = await prisma.user_followers.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: targetUserId,
        },
      },
    });

    if (existingFollow) {
      // Unfollow
      await prisma.$transaction([
        prisma.user_followers.delete({
          where: { id: existingFollow.id },
        }),
        prisma.user_profiles.update({
          where: { userId: targetUserId },
          data: { followersCount: { decrement: 1 } },
        }),
        prisma.user_profiles.update({
          where: { userId: session.user.id },
          data: { followingCount: { decrement: 1 } },
        }),
      ]);

      return NextResponse.json({ action: 'unfollowed', isFollowing: false });
    } else {
      // Follow
      await prisma.$transaction([
        prisma.user_followers.create({
          data: {
            followerId: session.user.id,
            followingId: targetUserId,
          },
        }),
        prisma.user_profiles.upsert({
          where: { userId: targetUserId },
          create: {
            userId: targetUserId,
            followersCount: 1,
          },
          update: {
            followersCount: { increment: 1 },
          },
        }),
        prisma.user_profiles.upsert({
          where: { userId: session.user.id },
          create: {
            userId: session.user.id,
            followingCount: 1,
          },
          update: {
            followingCount: { increment: 1 },
          },
        }),
      ]);

      // Create notification
      await NotificationService.createNotification(
        targetUserId,
        'FOLLOW',
        session.user.id
      );

      return NextResponse.json({ action: 'followed', isFollowing: true });
    }
  } catch (error) {
    console.error('Follow/unfollow error:', error);
    return NextResponse.json(
      { error: 'Failed to follow/unfollow user' },
      { status: 500 }
    );
  }
}
