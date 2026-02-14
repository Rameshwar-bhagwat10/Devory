import { NextRequest, NextResponse } from 'next/server';
import { CommunityService } from '@/features/community/community.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5');
    
    const trending = await CommunityService.getTrending(limit);
    
    return NextResponse.json(trending);
  } catch (error) {
    console.error('Get trending error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending posts' },
      { status: 500 }
    );
  }
}
