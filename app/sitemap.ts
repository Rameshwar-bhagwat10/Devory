import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://devory.com';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/community/trending`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/community/collaborations`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    },
  ];

  // Blog post routes
  const blogPosts = [
    'top-50-web-development-projects-2024',
    'machine-learning-projects-students-guide',
    'final-year-project-ideas-computer-science',
    'how-to-choose-right-project-skill-level',
    'blockchain-projects-beginner-to-advanced',
    'react-project-ideas-2024',
    'python-projects-for-portfolio',
    'full-stack-mern-projects',
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  try {
    // Get all published projects
    const projects = await prisma.projects.findMany({
      where: {
        isPublished: true,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 5000, // Increased limit for all projects
    });

    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Get all approved community posts
    const posts = await prisma.community_posts.findMany({
      where: {
        isApproved: true,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 5000, // Increased limit
    });

    const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/community/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'daily',
      priority: 0.7,
    }));

    return [...staticRoutes, ...blogRoutes, ...projectRoutes, ...postRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static routes if database query fails
    return staticRoutes;
  }
}
