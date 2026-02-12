import { NextRequest } from 'next/server';
import { withAuth, apiError, apiSuccess } from '@/lib/api-guards';
import { MatchService } from '@/features/projects/match.service';

export async function GET(request: NextRequest) {
  return withAuth(async (session) => {
    try {
      const { searchParams } = new URL(request.url);
      const projectId = searchParams.get('projectId');

      if (!projectId) {
        return apiError('Project ID is required', 400);
      }

      // Calculate match using userId and projectId
      const matchResult = await MatchService.calculateMatch(
        session.user!.id,
        projectId
      );

      // Add label to the result
      const matchData = {
        ...matchResult,
        label: MatchService.getMatchLabel(matchResult.matchPercentage),
      };

      return apiSuccess(matchData);
    } catch (error) {
      console.error('Match calculation error:', error);
      return apiError('Failed to calculate match', 500);
    }
  });
}
