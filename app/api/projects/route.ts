import { NextRequest, NextResponse } from 'next/server';
import { ProjectService } from '@/features/projects/project.service';

// Use Node.js runtime (required for Prisma)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // API routes need to be dynamic for filters

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const filters = {
      search: searchParams.get('search') || undefined,
      domains: searchParams.get('domains')?.split(',').filter(Boolean) || [],
      difficulties: searchParams.get('difficulties')?.split(',').filter(Boolean) || [],
      techStack: searchParams.get('techStack')?.split(',').filter(Boolean) || [],
      years: searchParams.get('years')?.split(',').filter(Boolean) || [],
      durations: searchParams.get('durations')?.split(',').filter(Boolean) || [],
      page: parseInt(searchParams.get('page') || '1'),
      limit: 12,
    };

    const result = await ProjectService.getProjects(filters);
    
    // Add cache headers for better performance
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
