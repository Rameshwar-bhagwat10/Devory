import { prisma } from '@/lib/prisma';

interface RecommendedProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  domain: string;
  primaryTechnology: string;
  techStack: string[];
  estimatedHours?: number;
  createdAt: Date;
  score: number;
}

export class RecommendService {
  /**
   * Get personalized project recommendations
   * Based on user preferences and current project
   */
  static async getRecommendations(
    userId: string,
    currentProjectId: string,
    limit: number = 4
  ): Promise<RecommendedProject[]> {
    try {
      // Fetch user profile
      const userProfile = await prisma.userProfile.findUnique({
        where: { userId },
        select: {
          preferredDomains: true,
          skillLevel: true,
        },
      });

      // Fetch current project
      const currentProject = await prisma.project.findUnique({
        where: { id: currentProjectId },
        select: {
          domain: true,
          difficulty: true,
          primaryTechnology: true,
        },
      });

      if (!currentProject) {
        return [];
      }

      // Fetch candidate projects
      const candidates = await prisma.project.findMany({
        where: {
          isPublished: true,
          id: { not: currentProjectId },
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
          estimatedDuration: true,
          createdAt: true,
        },
        take: 50, // Get more candidates for better scoring
      });

      // Score each candidate
      const scoredProjects = candidates.map((project) => {
        let score = 0;

        // Domain match (weight: 3)
        if (project.domain === currentProject.domain) {
          score += 3;
        } else if (userProfile?.preferredDomains?.includes(project.domain)) {
          score += 2;
        }

        // Technology match (weight: 2)
        if (project.primaryTechnology === currentProject.primaryTechnology) {
          score += 2;
        }

        // Difficulty match (weight: 1)
        if (project.difficulty === currentProject.difficulty) {
          score += 1;
        } else if (userProfile?.skillLevel) {
          // Bonus if difficulty matches user skill level
          if (this.isDifficultyMatchingSkillLevel(project.difficulty, userProfile.skillLevel)) {
            score += 0.5;
          }
        }

        // Parse tech stack safely
        let allTech: string[] = [];
        try {
          const techStackData = project.techStack as any;
          if (techStackData && typeof techStackData === 'object') {
            allTech = [
              ...(techStackData.frontend || []),
              ...(techStackData.backend || []),
              ...(techStackData.database || []),
              ...(techStackData.tools || []),
            ];
          }
        } catch (error) {
          console.error('Error parsing tech stack for project:', project.id, error);
        }

        // Parse estimated hours safely
        let estimatedHours: number | undefined;
        try {
          const durationMatch = project.estimatedDuration.match(/(\d+)/);
          estimatedHours = durationMatch ? parseInt(durationMatch[0]) * 40 : undefined;
        } catch (error) {
          console.error('Error parsing duration for project:', project.id, error);
        }

        return {
          id: project.id,
          title: project.title,
          slug: project.slug,
          description: project.shortDescription,
          difficulty: project.difficulty,
          domain: project.domain,
          primaryTechnology: project.primaryTechnology,
          techStack: allTech,
          estimatedHours,
          createdAt: project.createdAt,
          score,
        };
      });

      // Sort by score and return top results
      return scoredProjects
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      return [];
    }
  }

  /**
   * Check if difficulty matches skill level
   */
  private static isDifficultyMatchingSkillLevel(
    difficulty: string,
    skillLevel: string
  ): boolean {
    const matchMap: Record<string, string[]> = {
      BEGINNER: ['BEGINNER', 'INTERMEDIATE'],
      INTERMEDIATE: ['INTERMEDIATE', 'ADVANCED'],
      ADVANCED: ['ADVANCED', 'EXPERT'],
      EXPERT: ['EXPERT'],
    };

    return matchMap[skillLevel]?.includes(difficulty) || false;
  }
}
