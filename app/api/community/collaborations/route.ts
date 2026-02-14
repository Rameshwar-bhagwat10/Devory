import { NextRequest, NextResponse } from 'next/server';
import { CommunityService } from '@/features/community/community.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5');
    
    const collaborations = await CommunityService.getLatestCollaborations(limit);
    
    return NextResponse.json(collaborations);
  } catch (error) {
    console.error('Get collaborations error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collaborations' },
      { status: 500 }
    );
  }
}
