import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { CommunityService } from '@/features/community/community.service';
import { PostType, ProjectDifficulty, ProjectDomain } from '@prisma/client';
import type { CreatePostInput, FeedFilters } from '@/features/community/community.types';

// GET /api/community - Get feed
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters: FeedFilters = {
      type: searchParams.get('type') as PostType | undefined,
      domain: searchParams.get('domain') as ProjectDomain | undefined,
      difficulty: searchParams.get('difficulty') as ProjectDifficulty | undefined,
      sortBy: (searchParams.get('sortBy') as 'trending' | 'latest' | 'popular') || 'trending',
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
    };
    
    const session = await auth();
    const result = await CommunityService.getFeed(filters, session?.user?.id);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Community feed error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feed' },
      { status: 500 }
    );
  }
}

// POST /api/community - Create post
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.shortDescription || !body.fullDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const input: CreatePostInput = {
      type: body.type,
      title: body.title.trim(),
      shortDescription: body.shortDescription.trim(),
      fullDescription: body.fullDescription.trim(),
      domain: body.domain,
      difficulty: body.difficulty,
      techStack: body.techStack || [],
      tags: body.tags || [],
      estimatedDuration: body.estimatedDuration,
      requiredCollaborators: body.requiredCollaborators,
      requiredSkills: body.requiredSkills || [],
      isAnonymous: body.isAnonymous || false,
    };
    
    const post = await CommunityService.createPost(session.user.id, input);
    
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error('Create post error:', error);
    
    if (error.message === 'Daily post limit reached (5 posts per day)') {
      return NextResponse.json(
        { error: error.message },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
