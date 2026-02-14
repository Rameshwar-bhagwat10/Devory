import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { postId, reason, description } = body;

    if (!postId || !reason) {
      return NextResponse.json(
        { error: 'Post ID and reason are required' },
        { status: 400 }
      );
    }

    // Validate reason
    const validReasons = ['SPAM', 'HARASSMENT', 'INAPPROPRIATE', 'OFFENSIVE', 'COPYRIGHT', 'MISINFORMATION', 'OTHER'];
    if (!validReasons.includes(reason)) {
      return NextResponse.json(
        { error: 'Invalid report reason' },
        { status: 400 }
      );
    }

    // Check if post exists
    const post = await prisma.community_posts.findUnique({
      where: { id: postId },
      select: { id: true, title: true },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if user already reported this post
    const existingReport = await prisma.community_moderation_queue.findFirst({
      where: {
        postId,
        reporterId: session.user.id,
      },
    });

    if (existingReport) {
      return NextResponse.json(
        { error: 'You have already reported this post' },
        { status: 400 }
      );
    }

    // Create report
    const report = await prisma.community_moderation_queue.create({
      data: {
        postId,
        reporterId: session.user.id,
        reason: `${reason}${description ? `: ${description.trim()}` : ''}`,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Report submitted successfully',
      reportId: report.id,
    });
  } catch (error) {
    console.error('Report submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit report' },
      { status: 500 }
    );
  }
}
