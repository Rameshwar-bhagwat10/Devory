import { prisma } from '@/lib/prisma';
import type { ProjectDomain, ProjectDifficulty } from '@prisma/client';
import { unstable_cache } from 'next/cache';

interface DashboardStats {
  savedCount: number;
  downloadsCount: number;
  exploredCount: number;
}

interface RecentProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: ProjectDifficulty;
  domain: ProjectDomain;
  primaryTechnology: string;
  viewedAt: Date;
}

export class DashboardService {
  /**
   * Get user dashboard stats with Next.js caching (60s revalidation)
   */
  static getDashboardStats = async (userId: string): Promise<DashboardStats> => {
    return unstable_cache(
      async () => {
        try {
          // Parallel queries with proper connection management
          const [savedCount, downloadsCount, exploredCount] = await Promise.all([
            prisma.savedProject.count({ where: { userId } }),
            prisma.download.count({ where: { userId } }),
            prisma.auditLog.count({
              where: {
                userId,
                action: 'project_viewed',
              },
            }),
          ]);

          return { savedCount, downloadsCount, exploredCount };
        } catch (error) {
          console.error('Error fetching dashboard stats:', error);
          return {
            savedCount: 0,
            downloadsCount: 0,
            exploredCount: 0,
          };
        }
      },
      [`dashboard-stats-${userId}`],
      {
        revalidate: 60, // Cache for 60 seconds
        tags: [`dashboard-stats-${userId}`],
      }
    )();
  };

  /**
   * Get recently viewed projects with Next.js caching (60s revalidation)
   */
  static getRecentlyViewed = async (userId: string, limit: number = 4): Promise<RecentProject[]> => {
    return unstable_cache(
      async () => {
        try {
          // Fast query with minimal fields
          const recentLogs = await prisma.auditLog.findMany({
            where: {
              userId,
              action: 'project_viewed',
              resourceId: { not: null },
            },
            orderBy: { createdAt: 'desc' },
            take: limit * 2, // Get more to account for duplicates
            select: {
              resourceId: true,
              createdAt: true,
            },
          });

          if (recentLogs.length === 0) {
            return [];
          }

          // Get unique project IDs
          const uniqueProjectIds = Array.from(new Set(recentLogs.map(log => log.resourceId!)));
          const projectIds = uniqueProjectIds.slice(0, limit);

          // Fetch minimal project details
          const projects = await prisma.project.findMany({
            where: {
              id: { in: projectIds },
              isPublished: true,
            },
            select: {
              id: true,
              title: true,
              slug: true,
              difficulty: true,
              domain: true,
              primaryTechnology: true,
            },
          });

          // Fast mapping
          const projectsMap = new Map(projects.map(p => [p.id, p]));
          const logMap = new Map(recentLogs.map(log => [log.resourceId!, log.createdAt]));
          
          return projectIds
            .map(id => {
              const project = projectsMap.get(id);
              if (!project) return null;
              return {
                id: project.id,
                slug: project.slug,
                title: project.title,
                description: '',
                difficulty: project.difficulty,
                domain: project.domain,
                primaryTechnology: project.primaryTechnology,
                viewedAt: logMap.get(id)!,
              };
            })
            .filter((p): p is RecentProject => p !== null);
        } catch (error) {
          console.error('Error fetching recently viewed projects:', error);
          return [];
        }
      },
      [`dashboard-recent-${userId}-${limit}`],
      {
        revalidate: 60,
        tags: [`dashboard-recent-${userId}`],
      }
    )();
  };

  /**
   * Get personalized recommendations with Next.js caching (5min revalidation)
   */
  static getPersonalizedRecommendations = async (userId: string, limit: number = 4) => {
    return unstable_cache(
      async () => {
        try {
          // Get user profile with minimal fields
          const userProfile = await prisma.userProfile.findUnique({
            where: { userId },
            select: {
              preferredDomains: true,
              skillLevel: true,
            },
          });

          if (!userProfile || !userProfile.preferredDomains || userProfile.preferredDomains.length === 0) {
            // Fast fallback: Get editor picks only
            return DashboardService.getPopularProjects(limit);
          }

          // Ultra-fast query with minimal fields and limit
          const projects = await prisma.project.findMany({
            where: {
              isPublished: true,
              domain: { in: userProfile.preferredDomains as ProjectDomain[] },
            },
            select: {
              id: true,
              title: true,
              slug: true,
              shortDescription: true,
              difficulty: true,
              domain: true,
              primaryTechnology: true,
              techStack: true,
            },
            orderBy: [
              { isEditorPick: 'desc' },
              { saveCount: 'desc' },
            ],
            take: limit,
          });

          // Minimal processing
          return projects.map(project => {
            const techStackData = project.techStack as Record<string, string[]> | null;
            const allTech = [
              ...(techStackData?.frontend || []),
              ...(techStackData?.backend || []),
              ...(techStackData?.database || []),
            ];

            return {
              id: project.id,
              title: project.title,
              slug: project.slug,
              description: project.shortDescription,
              difficulty: project.difficulty,
              domain: project.domain,
              primaryTechnology: project.primaryTechnology,
              techStack: allTech.slice(0, 3),
              matchScore: 85,
            };
          });
        } catch (error) {
          console.error('Error fetching personalized recommendations:', error);
          return [];
        }
      },
      [`dashboard-recommendations-${userId}-${limit}`],
      {
        revalidate: 300, // Cache for 5 minutes
        tags: [`dashboard-recommendations-${userId}`],
      }
    )();
  };

  /**
   * Get popular projects as fallback (OPTIMIZED)
   */
  private static async getPopularProjects(limit: number = 4) {
    try {
      const projects = await prisma.project.findMany({
        where: { isPublished: true },
        select: {
          id: true,
          title: true,
          slug: true,
          shortDescription: true,
          difficulty: true,
          domain: true,
          primaryTechnology: true,
          techStack: true,
          estimatedDuration: true,
          createdAt: true,
        },
        orderBy: [
          { isEditorPick: 'desc' },
          { saveCount: 'desc' },
          { viewCount: 'desc' },
        ],
        take: limit,
      });

      return projects.map(project => {
        const techStackData = project.techStack as Record<string, string[]> | null;
        const allTech = [
          ...(techStackData?.frontend || []),
          ...(techStackData?.backend || []),
          ...(techStackData?.database || []),
          ...(techStackData?.tools || []),
        ];

        const durationMatch = project.estimatedDuration.match(/(\d+)/);
        const estimatedHours = durationMatch ? parseInt(durationMatch[0]) * 40 : undefined;

        return {
          id: project.id,
          title: project.title,
          slug: project.slug,
          description: project.shortDescription,
          difficulty: project.difficulty,
          domain: project.domain,
          primaryTechnology: project.primaryTechnology,
          techStack: allTech.slice(0, 3),
          estimatedHours,
          createdAt: project.createdAt,
          matchScore: 75,
        };
      });
    } catch (error) {
      console.error('Error fetching popular projects:', error);
      return [];
    }
  }

  /**
   * Get saved projects preview (OPTIMIZED - Sequential)
   */
  static async getSavedProjectsPreview(userId: string, limit: number = 3) {
    try {
      // Ultra-fast query with minimal fields
      const savedProjects = await prisma.savedProject.findMany({
        where: { userId },
        select: {
          createdAt: true,
          project: {
            select: {
              id: true,
              title: true,
              slug: true,
              difficulty: true,
              domain: true,
              primaryTechnology: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });

      return savedProjects.map(sp => ({
        id: sp.project.id,
        title: sp.project.title,
        slug: sp.project.slug,
        description: '',
        difficulty: sp.project.difficulty,
        domain: sp.project.domain,
        primaryTechnology: sp.project.primaryTechnology,
        techStack: [sp.project.primaryTechnology],
        savedAt: sp.createdAt,
      }));
    } catch (error) {
      console.error('Error fetching saved projects preview:', error);
      return [];
    }
  }

  /**
   * Get user interest
   */
  static async getUserInterest(userId: string): Promise<string> {
    try {
      const userProfile = await prisma.userProfile.findUnique({
        where: { userId },
        select: { preferredDomains: true },
      });
      return userProfile?.preferredDomains?.[0] || 'Open to Explore';
    } catch (error) {
      console.error('Error fetching user interest:', error);
      return 'Open to Explore';
    }
  }

  /**
   * Get saved count
   */
  static async getSavedCount(userId: string): Promise<number> {
    try {
      return await prisma.savedProject.count({ where: { userId } });
    } catch (error) {
      console.error('Error fetching saved count:', error);
      return 0;
    }
  }
}
