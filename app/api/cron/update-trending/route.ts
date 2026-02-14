import { NextRequest, NextResponse } from 'next/server';
import { TrendingService } from '@/features/community/trending.service';

/**
 * Cron job endpoint to update trending scores
 * Should be called every 15 minutes by a cron service (e.g., Vercel Cron, GitHub Actions)
 * 
 * For Vercel Cron, add to vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/update-trending",
 *     "schedule": "0,15,30,45 * * * *"
 *   }]
 * }
 */
export async function GET(req: NextRequest) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const result = await TrendingService.updateTrendingScores();

    return NextResponse.json({
      success: true,
      updated: result.updated,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Trending update error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update trending scores' },
      { status: 500 }
    );
  }
}

// Allow POST as well for manual triggers
export async function POST(req: NextRequest) {
  return GET(req);
}
