import { prisma } from '@/lib/prisma';
import type { ProjectFilters, ProjectListResponse, Project, ProjectDetail } from './project.types';
import type { ProjectDifficulty, ProjectDomain } from '@prisma/client';
import { fallbackProjects } from './fallbackProjects';
import { unstable_cache } from 'next/cache';

// Cache configuration
const CACHE_TAGS = {
  PROJECTS_LIST: 'projects-list',
  PROJECT_DETAIL: 'project-detail',
  RELATED_PROJECTS: 'related-projects',
};

const CACHE_REVALIDATE = 3600; // 1 hour

export class ProjectService {
  // Optimized query with caching
  static async getProjects(filters: ProjectFilters = {}): Promise<ProjectListResponse> {
    try {
      const search = filters.search || '';
      const domains = filters.domains || [];
      const difficulties = filters.difficulties || [];
      const techStack = filters.techStack || [];
      const years = filters.years || [];
      const durations = filters.durations || [];
      const page = filters.page || 1;
      const limit = filters.limit || 12;

      const skip = (page - 1) * limit;

      // Build optimized where clause
      const where: {
        isPublished: boolean;
        OR?: Array<{
          title?: { contains: string; mode: 'insensitive' };
          shortDescription?: { contains: string; mode: 'insensitive' };
        }>;
        domain?: { in: ProjectDomain[] };
        difficulty?: { in: ProjectDifficulty[] };
        primaryTechnology?: { in: string[] };
        recommendedYear?: { in: string[] };
        estimatedDuration?: { in: string[] };
      } = {
        isPublished: true,
      };

      // Add search conditions
      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' as const } },
          { shortDescription: { contains: search, mode: 'insensitive' as const } },
        ];
      }

      // Add filter conditions
      if (domains.length > 0) where.domain = { in: domains as ProjectDomain[] };
      if (difficulties.length > 0) where.difficulty = { in: difficulties as ProjectDifficulty[] };
      if (techStack.length > 0) where.primaryTechnology = { in: techStack };
      if (years.length > 0) where.recommendedYear = { in: years };
      if (durations.length > 0) where.estimatedDuration = { in: durations };

      // Use transaction for better performance
      const [projectsData, total] = await prisma.$transaction([
        prisma.project.findMany({
          where,
          select: {
            id: true,
            title: true,
            slug: true,
            shortDescription: true,
            difficulty: true,
            domain: true,
            estimatedDuration: true,
            primaryTechnology: true,
            createdAt: true,
          },
          orderBy: [
            { isEditorPick: 'desc' },
            { createdAt: 'desc' },
          ],
          skip,
          take: limit,
        }),
        prisma.project.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);

      // Optimize mapping with pre-calculated values
      const projects: Project[] = projectsData.map(p => {
        const durationMatch = p.estimatedDuration.match(/(\d+)/);
        const estimatedHours = durationMatch ? parseInt(durationMatch[0]) * 40 : undefined;
        
        return {
          ...p,
          description: p.shortDescription,
          techStack: [p.primaryTechnology],
          estimatedHours,
        };
      });

      return {
        projects,
        total,
        page,
        totalPages,
      };
    } catch (error) {
      console.error('Error fetching projects, using fallback:', error);
      // Return fallback data
      const fallbackList = fallbackProjects.slice(0, 12).map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        description: p.description,
        difficulty: p.difficulty,
        domain: p.domain,
        techStack: p.techStack.slice(0, 3),
        estimatedHours: p.estimatedHours,
        createdAt: p.createdAt,
      }));

      return {
        projects: fallbackList,
        total: fallbackProjects.length,
        page: 1,
        totalPages: 1,
      };
    }
  }

  // Cached version for initial page load (no filters)
  static async getProjectsCached(): Promise<ProjectListResponse> {
    return unstable_cache(
      async () => {
        return this.getProjects({ page: 1, limit: 12 });
      },
      ['projects-list-default'],
      {
        revalidate: CACHE_REVALIDATE,
        tags: [CACHE_TAGS.PROJECTS_LIST],
      }
    )();
  }

  // Optimized getProjectBySlug with caching
  static async getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
    return unstable_cache(
      async () => {
        try {
          const project = await prisma.project.findUnique({
            where: { 
              slug,
              isPublished: true,
            },
            select: {
              id: true,
              title: true,
              slug: true,
              shortDescription: true,
              fullDescription: true,
              difficulty: true,
              domain: true,
              estimatedDuration: true,
              primaryTechnology: true,
              techStack: true,
              architecture: true,
              features: true,
              learningOutcomes: true,
              skillsRequired: true,
              timeline: true,
              createdAt: true,
            },
          });

          if (!project) {
            // Try fallback
            const fallback = fallbackProjects.find(p => p.slug === slug);
            return fallback || null;
          }

          // Parse JSON fields
          const techStackData = project.techStack as { frontend?: string[]; backend?: string[]; database?: string[]; tools?: string[] };
          const allTech = [
            ...(techStackData.frontend || []),
            ...(techStackData.backend || []),
            ...(techStackData.database || []),
            ...(techStackData.tools || []),
          ];

          const durationMatch = project.estimatedDuration.match(/(\d+)/);
          const estimatedHours = durationMatch ? parseInt(durationMatch[0]) * 40 : undefined;

          return {
            ...project,
            description: project.shortDescription,
            longDescription: project.fullDescription,
            techStack: allTech,
            features: project.features as string[],
            learningOutcomes: project.learningOutcomes as string[],
            prerequisites: project.skillsRequired as string[],
            tags: [project.domain, project.difficulty, project.primaryTechnology],
            estimatedHours,
          };
        } catch (error) {
          console.error('Error fetching project by slug, using fallback:', error);
          const fallback = fallbackProjects.find(p => p.slug === slug);
          return fallback || null;
        }
      },
      [`project-detail-${slug}`],
      {
        revalidate: CACHE_REVALIDATE,
        tags: [CACHE_TAGS.PROJECT_DETAIL, `project-${slug}`],
      }
    )();
  }

  // Optimized getRelatedProjects with caching
  static async getRelatedProjects(domain: string, currentSlug: string, limit = 3): Promise<Project[]> {
    return unstable_cache(
      async () => {
        try {
          const projects = await prisma.project.findMany({
            where: {
              isPublished: true,
              domain: domain as ProjectDomain,
              slug: { not: currentSlug },
            },
            select: {
              id: true,
              title: true,
              slug: true,
              shortDescription: true,
              difficulty: true,
              domain: true,
              estimatedDuration: true,
              primaryTechnology: true,
              createdAt: true,
            },
            orderBy: [
              { isEditorPick: 'desc' },
              { createdAt: 'desc' },
            ],
            take: limit,
          });

          return projects.map(p => {
            const durationMatch = p.estimatedDuration.match(/(\d+)/);
            const estimatedHours = durationMatch ? parseInt(durationMatch[0]) * 40 : undefined;
            
            return {
              ...p,
              description: p.shortDescription,
              techStack: [p.primaryTechnology],
              estimatedHours,
            };
          });
        } catch (error) {
          console.error('Error fetching related projects:', error);
          return fallbackProjects
            .filter(p => p.domain === domain && p.slug !== currentSlug)
            .slice(0, limit)
            .map(p => ({
              id: p.id,
              slug: p.slug,
              title: p.title,
              description: p.description,
              difficulty: p.difficulty,
              domain: p.domain,
              techStack: p.techStack.slice(0, 3),
              estimatedHours: p.estimatedHours,
              createdAt: p.createdAt,
            }));
        }
      },
      [`related-projects-${domain}-${currentSlug}`],
      {
        revalidate: CACHE_REVALIDATE,
        tags: [CACHE_TAGS.RELATED_PROJECTS, `related-${domain}`],
      }
    )();
  }

  static async createProject(data: { title: string; description: string }): Promise<{ success: boolean }> {
    // Placeholder - will be implemented in Phase 9
    console.log('Creating project:', data);
    return { success: true };
  }
}
