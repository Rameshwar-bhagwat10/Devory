import { NextRequest } from 'next/server';
import { withAuth, apiError, apiSuccess } from '@/lib/api-guards';
import { SaveService } from '@/features/projects/save.service';

export async function POST(request: NextRequest) {
  return withAuth(async (session) => {
    try {
      const { projectId } = await request.json();

      if (!projectId) {
        return apiError('Project ID is required', 400);
      }

      const result = await SaveService.saveProject(session.user!.id, projectId);

      if (!result.success) {
        return apiError('Failed to save project', 500);
      }

      return apiSuccess({ saved: true });
    } catch (error) {
      console.error('Save project error:', error);
      return apiError('Failed to save project', 500);
    }
  });
}

export async function DELETE(request: NextRequest) {
  return withAuth(async (session) => {
    try {
      const { searchParams } = new URL(request.url);
      const projectId = searchParams.get('projectId');

      if (!projectId) {
        return apiError('Project ID is required', 400);
      }

      const result = await SaveService.unsaveProject(session.user!.id, projectId);

      if (!result.success) {
        return apiError('Failed to unsave project', 500);
      }

      return apiSuccess({ saved: false });
    } catch (error) {
      console.error('Unsave project error:', error);
      return apiError('Failed to unsave project', 500);
    }
  });
}
