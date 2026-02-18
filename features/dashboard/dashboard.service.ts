import { prisma } from '@/lib/prisma';
import type { ProjectDomain, ProjectDifficulty } from '@prisma/client';
import { unstable_cache } from 'next/cache';

interface DashboardStats {
  savedCount: number;
  downloadsCount: number;
  exploredCount: number;
}

interface EnhancedDashboardStats {
  savedCount: number;
  downloadsCount: number;
  exploredCount: number;
  activeCollaborationsCount: number;
  communityPostsCount: number;
  reputationScore: number;
  skillsLearnedCount: number;
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
            prisma.saved_projects.count({ where: { userId } }),
            prisma.downloads.count({ where: { userId } }),
            prisma.audit_logs.count({
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
          const recentLogs = await prisma.audit_logs.findMany({
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
          const projects = await prisma.projects.findMany({
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
          const userProfile = await prisma.user_profiles.findUnique({
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
          const projects = await prisma.projects.findMany({
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
      const projects = await prisma.projects.findMany({
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
      const savedProjects = await prisma.saved_projects.findMany({
        where: { userId },
        select: {
          createdAt: true,
          projects: {
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
        id: sp.projects.id,
        title: sp.projects.title,
        slug: sp.projects.slug,
        description: '',
        difficulty: sp.projects.difficulty,
        domain: sp.projects.domain,
        primaryTechnology: sp.projects.primaryTechnology,
        techStack: [sp.projects.primaryTechnology],
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
      const userProfile = await prisma.user_profiles.findUnique({
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
      return await prisma.saved_projects.count({ where: { userId } });
    } catch (error) {
      console.error('Error fetching saved count:', error);
      return 0;
    }
  }

  /**
   * Get enhanced dashboard stats with community metrics (OPTIMIZED)
   */
  static getEnhancedDashboardStats = async (userId: string): Promise<EnhancedDashboardStats> => {
    return unstable_cache(
      async () => {
        try {
          // Single optimized query using raw SQL for better performance
          const [stats] = await prisma.$queryRaw<Array<{
            saved_count: bigint;
            downloads_count: bigint;
            explored_count: bigint;
            community_posts_count: bigint;
            reputation_score: number;
          }>>`
            SELECT 
              (SELECT COUNT(*) FROM saved_projects WHERE "userId" = ${userId}) as saved_count,
              (SELECT COUNT(*) FROM downloads WHERE "userId" = ${userId}) as downloads_count,
              (SELECT COUNT(*) FROM audit_logs WHERE "userId" = ${userId} AND action = 'project_viewed') as explored_count,
              (SELECT COUNT(*) FROM community_posts WHERE "userId" = ${userId}) as community_posts_count,
              COALESCE((SELECT "reputationScore" FROM user_profiles WHERE "userId" = ${userId}), 0) as reputation_score
          `;

          // Count active collaborations separately (complex join)
          const [joinedCount, ownedCount] = await Promise.all([
            prisma.community_collaboration_requests.count({
              where: { requesterId: userId, status: 'ACCEPTED' },
            }),
            prisma.community_posts.count({
              where: {
                userId,
                type: 'COLLABORATION',
                community_collaboration_requests: {
                  some: { status: 'ACCEPTED' },
                },
              },
            }),
          ]);

          // Calculate unique skills (lightweight query)
          const downloads = await prisma.downloads.findMany({
            where: { userId },
            select: {
              projects: {
                select: { techStack: true },
              },
            },
            take: 50, // Limit to recent 50 for performance
          });

          const uniqueSkills = new Set<string>();
          downloads.forEach(d => {
            const techStack = d.projects.techStack as Record<string, string[]> | null;
            if (techStack) {
              Object.values(techStack).forEach(techs => {
                techs.forEach(tech => uniqueSkills.add(tech));
              });
            }
          });

          return {
            savedCount: Number(stats.saved_count),
            downloadsCount: Number(stats.downloads_count),
            exploredCount: Number(stats.explored_count),
            activeCollaborationsCount: joinedCount + ownedCount,
            communityPostsCount: Number(stats.community_posts_count),
            reputationScore: stats.reputation_score,
            skillsLearnedCount: uniqueSkills.size,
          };
        } catch (error) {
          console.error('Error fetching enhanced dashboard stats:', error);
          return {
            savedCount: 0,
            downloadsCount: 0,
            exploredCount: 0,
            activeCollaborationsCount: 0,
            communityPostsCount: 0,
            reputationScore: 0,
            skillsLearnedCount: 0,
          };
        }
      },
      [`dashboard-enhanced-stats-${userId}`],
      {
        revalidate: 30, // More frequent updates for stats
        tags: [`dashboard-stats-${userId}`],
      }
    )();
  };

  /**
   * Get active collaborations (owned + joined) - OPTIMIZED
   */
  static getActiveCollaborations = async (userId: string, limit: number = 4) => {
    return unstable_cache(
      async () => {
        try {
          // Optimized: Fetch both types in parallel with minimal fields
          const [requestedCollaborations, ownedCollaborations] = await Promise.all([
            // Collaborations where user joined others' projects
            prisma.community_collaboration_requests.findMany({
              where: {
                requesterId: userId,
                status: 'ACCEPTED',
              },
              select: {
                id: true,
                createdAt: true,
                community_posts: {
                  select: {
                    id: true,
                    slug: true,
                    title: true,
                    currentCollaborators: true,
                    requiredCollaborators: true,
                    user: {
                      select: {
                        id: true,
                        name: true,
                        image: true,
                      },
                    },
                    community_collaboration_requests: {
                      where: { status: 'ACCEPTED' },
                      select: {
                        user: {
                          select: {
                            id: true,
                            name: true,
                            image: true,
                          },
                        },
                      },
                      take: 6, // Limit team members for performance
                    },
                  },
                },
              },
              orderBy: { createdAt: 'desc' },
              take: Math.ceil(limit / 2), // Split limit between owned and joined
            }),
            // Collaborations where user owns the project
            prisma.community_posts.findMany({
              where: {
                userId,
                type: 'COLLABORATION',
                community_collaboration_requests: {
                  some: { status: 'ACCEPTED' },
                },
              },
              select: {
                id: true,
                slug: true,
                title: true,
                currentCollaborators: true,
                requiredCollaborators: true,
                createdAt: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
                community_collaboration_requests: {
                  where: { status: 'ACCEPTED' },
                  select: {
                    user: {
                      select: {
                        id: true,
                        name: true,
                        image: true,
                      },
                    },
                  },
                  take: 6, // Limit team members for performance
                },
              },
              orderBy: { createdAt: 'desc' },
              take: Math.ceil(limit / 2), // Split limit between owned and joined
            }),
          ]);

          // Format joined collaborations
          const joined = requestedCollaborations.map(collab => ({
            id: collab.community_posts.id,
            slug: collab.community_posts.slug,
            title: collab.community_posts.title,
            role: 'member' as const,
            currentCollaborators: collab.community_posts.currentCollaborators,
            maxCollaborators: collab.community_posts.requiredCollaborators,
            owner: collab.community_posts.user,
            teamMembers: [
              collab.community_posts.user,
              ...collab.community_posts.community_collaboration_requests.map(r => r.user),
            ],
            joinedAt: collab.createdAt,
          }));

          // Format owned collaborations
          const owned = ownedCollaborations.map(post => ({
            id: post.id,
            slug: post.slug,
            title: post.title,
            role: 'owner' as const,
            currentCollaborators: post.currentCollaborators,
            maxCollaborators: post.requiredCollaborators,
            owner: post.user,
            teamMembers: [
              post.user,
              ...post.community_collaboration_requests.map(r => r.user),
            ],
            joinedAt: post.createdAt,
          }));

          // Combine and sort by date
          return [...joined, ...owned]
            .sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime())
            .slice(0, limit);
        } catch (error) {
          console.error('Error fetching active collaborations:', error);
          return [];
        }
      },
      [`dashboard-collaborations-${userId}-${limit}`],
      {
        revalidate: 30, // More frequent updates for active collaborations
        tags: [`dashboard-collaborations-${userId}`],
      }
    )();
  };

  /**
   * Get pending collaboration requests (sent + received) - OPTIMIZED
   */
  static getPendingRequests = async (userId: string) => {
    return unstable_cache(
      async () => {
        try {
          const [sentRequests, receivedRequests] = await Promise.all([
            // Requests sent by user
            prisma.community_collaboration_requests.findMany({
              where: {
                requesterId: userId,
                status: 'PENDING',
              },
              select: {
                id: true,
                createdAt: true,
                community_posts: {
                  select: {
                    id: true,
                    slug: true,
                    title: true,
                    user: {
                      select: {
                        id: true,
                        name: true,
                        image: true,
                      },
                    },
                  },
                },
              },
              orderBy: { createdAt: 'desc' },
              take: 3, // Limit for performance
            }),
            // Requests received by user (for their collaboration posts)
            prisma.community_collaboration_requests.findMany({
              where: {
                status: 'PENDING',
                community_posts: {
                  userId,
                  type: 'COLLABORATION',
                },
              },
              select: {
                id: true,
                createdAt: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
                community_posts: {
                  select: {
                    id: true,
                    slug: true,
                    title: true,
                  },
                },
              },
              orderBy: { createdAt: 'desc' },
              take: 3, // Limit for performance
            }),
          ]);

          return {
            sent: sentRequests.map(req => ({
              id: req.id,
              postId: req.community_posts.id,
              postSlug: req.community_posts.slug,
              postTitle: req.community_posts.title,
              owner: req.community_posts.user,
              createdAt: req.createdAt,
            })),
            received: receivedRequests.map(req => ({
              id: req.id,
              postId: req.community_posts.id,
              postSlug: req.community_posts.slug,
              postTitle: req.community_posts.title,
              requester: req.user,
              createdAt: req.createdAt,
            })),
          };
        } catch (error) {
          console.error('Error fetching pending requests:', error);
          return { sent: [], received: [] };
        }
      },
      [`dashboard-pending-requests-${userId}`],
      {
        revalidate: 20, // Very frequent updates for pending requests
        tags: [`dashboard-requests-${userId}`],
      }
    )();
  };

  /**
   * Get community activity feed from followed users - OPTIMIZED
   */
  static getCommunityActivityFeed = async (userId: string, limit: number = 6) => {
    return unstable_cache(
      async () => {
        try {
          // Optimized: Single query to get following IDs
          const following = await prisma.user_followers.findMany({
            where: { followerId: userId },
            select: { followingId: true },
            take: 100, // Limit following list for performance
          });

          const followingIds = following.map(f => f.followingId);

          // Optimized query with minimal fields
          const posts = await prisma.community_posts.findMany({
            where: followingIds.length > 0 
              ? {
                  userId: { in: followingIds },
                  isApproved: true,
                }
              : {
                  isApproved: true,
                  likesCount: { gte: 1 }, // Only show posts with engagement
                },
            select: {
              id: true,
              slug: true,
              title: true,
              shortDescription: true,
              type: true,
              createdAt: true,
              likesCount: true,
              commentsCount: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
            orderBy: followingIds.length > 0
              ? { createdAt: 'desc' }
              : [
                  { likesCount: 'desc' },
                  { createdAt: 'desc' },
                ],
            take: limit,
          });

          return posts;
        } catch (error) {
          console.error('Error fetching community activity feed:', error);
          return [];
        }
      },
      [`dashboard-activity-feed-${userId}-${limit}`],
      {
        revalidate: 60, // 1 minute cache for activity feed
        tags: [`dashboard-activity-${userId}`],
      }
    )();
  };
}
