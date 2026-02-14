import { NextRequest, NextResponse } from 'next/server';
import { NotificationService } from '@/features/community/notification.service';
import { RateLimitService } from '@/features/community/rate-limit.service';

/**
 * Cleanup cron job
 * Runs daily to clean up old data
 * - Deletes read notifications older than 30 days
 * - Deletes rate limit records older than 24 hours
 */
export async function GET(req: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Run cleanup tasks in parallel
    const [notificationsResult, rateLimitsResult] = await Promise.all([
      NotificationService.deleteOldNotifications(30),
      RateLimitService.cleanup(),
    ]);

    return NextResponse.json({
      success: true,
      notificationsDeleted: notificationsResult.deleted,
      rateLimitsDeleted: rateLimitsResult.deleted,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Cleanup error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to run cleanup' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
