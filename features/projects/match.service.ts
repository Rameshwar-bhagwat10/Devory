import { prisma } from '@/lib/prisma';
import { ProjectDifficulty } from '@prisma/client';

interface MatchResult {
  matchPercentage: number;
  difficultyCompatible: boolean;
  matchReasons: string[];
}

export class MatchService {
  /**
   * Calculate skill match between user and project
   * Based on onboarding data
   */
  static async calculateMatch(
    userId: string,
    projectId: string
  ): Promise<MatchResult> {
    try {
      // Fetch user profile with onboarding data
      const userProfile = await prisma.user_profiles.findUnique({
        where: { userId },
        select: {
          preferredDomains: true,
          skillLevel: true,
          academicYear: true,
        },
      });

      // Fetch project details
      const project = await prisma.projects.findUnique({
        where: { id: projectId },
        select: {
          domain: true,
          difficulty: true,
          recommendedYear: true,
          skillsRequired: true,
          primaryTechnology: true,
        },
      });

      if (!userProfile || !project) {
        return {
          matchPercentage: 0,
          difficultyCompatible: false,
          matchReasons: [],
        };
      }

      let score = 0;
      const matchReasons: string[] = [];

      // Domain match (40 points)
      if (userProfile.preferredDomains?.includes(project.domain)) {
        score += 40;
        matchReasons.push('Matches your preferred domain');
      }

      // Skill level / difficulty compatibility (40 points)
      const difficultyCompatible = this.isDifficultyCompatible(
        userProfile.skillLevel,
        project.difficulty
      );
      
      if (difficultyCompatible) {
        score += 40;
        matchReasons.push('Difficulty matches your skill level');
      } else {
        // Partial points if close
        const partialScore = this.getPartialDifficultyScore(
          userProfile.skillLevel,
          project.difficulty
        );
        score += partialScore;
        if (partialScore > 0) {
          matchReasons.push('Difficulty is slightly challenging');
        }
      }

      // Academic year compatibility (20 points)
      if (this.isYearCompatible(userProfile.academicYear, project.recommendedYear)) {
        score += 20;
        matchReasons.push('Perfect for your academic year');
      }

      return {
        matchPercentage: Math.min(100, Math.round(score)),
        difficultyCompatible,
        matchReasons,
      };
    } catch (error) {
      console.error('Error calculating match:', error);
      return {
        matchPercentage: 0,
        difficultyCompatible: false,
        matchReasons: [],
      };
    }
  }

  /**
   * Check if difficulty is compatible with skill level
   */
  private static isDifficultyCompatible(
    skillLevel: string | null,
    difficulty: ProjectDifficulty
  ): boolean {
    if (!skillLevel) return false;

    const compatibilityMap: Record<string, ProjectDifficulty[]> = {
      BEGINNER: ['BEGINNER', 'INTERMEDIATE'],
      INTERMEDIATE: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
      ADVANCED: ['INTERMEDIATE', 'ADVANCED', 'EXPERT'],
      EXPERT: ['ADVANCED', 'EXPERT'],
    };

    return compatibilityMap[skillLevel]?.includes(difficulty) || false;
  }

  /**
   * Get partial score for near-compatible difficulty
   */
  private static getPartialDifficultyScore(
    skillLevel: string | null,
    difficulty: ProjectDifficulty
  ): number {
    if (!skillLevel) return 0;

    // If one level off, give 20 points
    const levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];
    const skillIndex = levels.indexOf(skillLevel);
    const diffIndex = levels.indexOf(difficulty);

    if (skillIndex === -1 || diffIndex === -1) return 0;

    const diff = Math.abs(skillIndex - diffIndex);
    if (diff === 1) return 20;
    if (diff === 2) return 10;
    return 0;
  }

  /**
   * Check if academic year is compatible
   */
  private static isYearCompatible(
    userYear: string | null,
    recommendedYear: string
  ): boolean {
    if (!userYear) return false;

    // Normalize year strings
    const normalizedUserYear = userYear.toLowerCase();
    const normalizedRecommendedYear = recommendedYear.toLowerCase();

    // Direct match
    if (normalizedUserYear === normalizedRecommendedYear) return true;

    // Flexible matching
    if (normalizedUserYear.includes('second') && normalizedRecommendedYear.includes('second')) return true;
    if (normalizedUserYear.includes('third') && normalizedRecommendedYear.includes('third')) return true;
    if (normalizedUserYear.includes('final') && normalizedRecommendedYear.includes('final')) return true;

    return false;
  }

  /**
   * Get match label based on percentage
   */
  static getMatchLabel(percentage: number): string {
    if (percentage >= 80) return 'Perfect Fit';
    if (percentage >= 60) return 'Good Fit';
    if (percentage >= 40) return 'Moderate Fit';
    return 'Challenging';
  }

  /**
   * Get match color based on percentage
   */
  static getMatchColor(percentage: number): string {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-accent-orange';
    if (percentage >= 40) return 'text-yellow-400';
    return 'text-red-400';
  }
}
