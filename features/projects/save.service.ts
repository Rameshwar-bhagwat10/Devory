import { prisma } from '@/lib/prisma';

export class SaveService {
  static async saveProject(userId: string, projectId: string): Promise<{ success: boolean }> {
    try {
      await prisma.saved_projects.create({
        data: {
          userId,
          projectId,
        },
      });

      // Track activity
      await prisma.audit_logs.create({
        data: {
          userId,
          action: 'project_saved',
          resource: 'project',
          resourceId: projectId,
        },
      });

      return { success: true };
    } catch (error) {
      console.error('Error saving project:', error);
      return { success: false };
    }
  }

  static async unsaveProject(userId: string, projectId: string): Promise<{ success: boolean }> {
    try {
      await prisma.saved_projects.deleteMany({
        where: {
          userId,
          projectId,
        },
      });

      return { success: true };
    } catch (error) {
      console.error('Error unsaving project:', error);
      return { success: false };
    }
  }

  static async isProjectSaved(userId: string, projectId: string): Promise<boolean> {
    const saved = await prisma.saved_projects.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });

    return !!saved;
  }

  static async getSavedProjects(userId: string) {
    const savedProjects = await prisma.saved_projects.findMany({
      where: { userId },
      include: {
        projects: {
          select: {
            id: true,
            title: true,
            slug: true,
            shortDescription: true,
            difficulty: true,
            domain: true,
            primaryTechnology: true,
            estimatedDuration: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return savedProjects.map(sp => ({
      ...sp.projects,
      description: sp.projects.shortDescription,
      techStack: [sp.projects.primaryTechnology],
      estimatedHours: parseInt(sp.projects.estimatedDuration.split('-')[0]) * 40 || undefined,
      savedAt: sp.createdAt,
    }));
  }
}
