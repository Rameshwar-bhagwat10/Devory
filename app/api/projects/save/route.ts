import { NextRequest } from 'next/server';
import { withAuth, apiError, apiSuccess } from '@/lib/api-guards';
import { SaveService } from '@/features/projects/save.service';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  return withAuth(async (session) => {
    try {
      const { projectId } = await request.json();

      if (!projectId) {
        return apiError('Project ID is required', 400);
      }

      // Check if already saved
      const existingSave = await prisma.savedProject.findUnique({
        where: {
          userId_projectId: {
            userId: session.user!.id,
            projectId,
          },
        },
      });

      let saved: boolean;

      if (existingSave) {
        // Toggle: unsave
        await SaveService.unsaveProject(session.user!.id, projectId);
        saved = false;
      } else {
        // Toggle: save
        const result = await SaveService.saveProject(session.user!.id, projectId);
        if (!result.success) {
          return apiError('Failed to save project', 500);
        }
        saved = true;
      }

      // Get total saves count
      const totalSaves = await prisma.savedProject.count({
        where: { projectId },
      });

      return apiSuccess({ saved, totalSaves });
    } catch (error) {
      console.error('Save project error:', error);
      return apiError('Failed to save project', 500);
    }
  });
}
