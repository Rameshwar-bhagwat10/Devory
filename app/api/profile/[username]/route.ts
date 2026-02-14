import { NextRequest, NextResponse } from 'next/server';
import { ProfileService } from '@/features/community/profile.service';
import { auth } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const { searchParams } = new URL(request.url);
    const tab = searchParams.get('tab') || 'posts';
    const page = parseInt(searchParams.get('page') || '1');

    // Get current user session for user-specific data
    const session = await auth();
    const currentUserId = session?.user?.id;

    // Check if username is actually a userId (starts with 'user_' or similar pattern)
    let profile;
    if (username.includes('-') || username.length > 20) {
      // Likely a userId
      profile = await ProfileService.getProfileWithStats(username);
    } else {
      // Username lookup
      const userProfile = await ProfileService.getProfileByUsername(username);
      if (!userProfile) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
      profile = await ProfileService.getProfileWithStats(userProfile.id);
    }

    if (!profile) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    let tabData = null;
    if (tab === 'posts') {
      tabData = await ProfileService.getUserPosts(profile.id, page, 10, currentUserId);
    } else if (tab === 'collaborations') {
      tabData = await ProfileService.getUserCollaborations(profile.id, page, 10);
    }

    return NextResponse.json({
      profile,
      tabData,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
