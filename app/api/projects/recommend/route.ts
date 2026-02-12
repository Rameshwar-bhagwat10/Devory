import { NextRequest } from 'next/server';
import { withAuth, apiError, apiSuccess } from '@/lib/api-guards';
import { RecommendService } from '@/features/projects/recommend.service';

export async function GET(request: NextRequest) {
  return withAuth(async (session) => {
    try {
      const { searchParams } = new URL(request.url);
      const projectId = searchParams.get('projectId');

      if (!projectId) {
        return apiError('Project ID is required', 400);
      }

      // Get recommendations using userId and projectId
      const recommendations = await RecommendService.getRecommendations(
        session.user!.id,
        projectId
      );

      return apiSuccess({ recommendations });
    } catch (error) {
      console.error('Recommendation error:', error);
      return apiError('Failed to get recommendations', 500);
    }
  });
}
