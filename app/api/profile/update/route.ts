import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { ProfileService } from '@/features/community/profile.service';

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      bio,
      github,
      linkedin,
      portfolio,
      skillLevel,
      academicYear,
      institution,
      preferredDomains,
    } = body;

    // Validate URLs if provided
    if (github && !github.startsWith('https://github.com/')) {
      return NextResponse.json(
        { error: 'GitHub URL must start with https://github.com/' },
        { status: 400 }
      );
    }

    if (linkedin && !linkedin.startsWith('https://linkedin.com/')) {
      return NextResponse.json(
        { error: 'LinkedIn URL must start with https://linkedin.com/' },
        { status: 400 }
      );
    }

    const profile = await ProfileService.updateProfile(session.user.id, {
      bio,
      github,
      linkedin,
      portfolio,
      skillLevel,
      academicYear,
      institution,
      preferredDomains,
    });

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
