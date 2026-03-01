import { Suspense } from 'react';
import { Metadata } from 'next';
import { ProjectService } from '@/features/projects/project.service';
import ProjectsClient from '@/components/projects/ProjectsClient';
import ProjectCardSkeleton from '@/components/projects/ProjectCardSkeleton';
import ProjectsStructuredData from '@/components/projects/ProjectsStructuredData';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Explore 300+ Project Ideas | Devory',
  description: 'Discover 300+ curated project ideas with AI-powered roadmaps, tech stacks, and implementation guides. Browse Web Development, Machine Learning, Blockchain, IoT, and more.',
  keywords: [
    'project ideas',
    'final year projects',
    'student projects',
    'developer projects',
    'web development projects',
    'machine learning projects',
    'blockchain projects',
    'iot projects',
    'mobile app projects',
    'computer science projects',
    'engineering projects',
    'coding projects',
    'portfolio projects',
    'open source projects',
  ],
  authors: [{ name: 'Devory' }],
  creator: 'Devory',
  publisher: 'Devory',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/projects',
    title: 'Explore 300+ Project Ideas | Devory',
    description: 'Discover 300+ curated project ideas with AI-powered roadmaps, tech stacks, and implementation guides.',
    siteName: 'Devory',
    images: [
      {
        url: '/og-projects-image.png',
        width: 1200,
        height: 630,
        alt: 'Devory Projects - 300+ Curated Project Ideas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore 300+ Project Ideas | Devory',
    description: 'Discover 300+ curated project ideas with AI-powered roadmaps and implementation guides.',
    images: ['/og-projects-image.png'],
    creator: '@devory',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// OPTIMAL PERFORMANCE STRATEGY FOR FIRST VISIT:
// 1. Pre-render default page at build time (no searchParams) - INSTANT load (~50ms)
// 2. Generate filtered pages on-demand - fast with caching (~150-300ms)
// 3. ISR with 1 hour revalidation for all pages
// 4. Background revalidation keeps content fresh
//
// HOW IT WORKS:
// - First visit to /projects → Pre-rendered at build time (INSTANT)
// - First visit to /projects?search=ai → Generated on-demand (fast)
// - Subsequent visits → Served from cache (INSTANT)
export const revalidate = 3600; // 1 hour cache
export const dynamic = 'force-static'; // Force static generation

// Generate static params for default page (no filters)
// This pre-renders /projects at build time for instant first load
export async function generateStaticParams() {
  return [{}]; // Empty object = default page with no filters
}

interface ProjectsPageProps {
  searchParams: Promise<{
    search?: string;
    domains?: string;
    difficulties?: string;
    techStack?: string;
    years?: string;
    durations?: string;
    page?: string;
  }>;
}

async function ProjectsContent({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  
  // Check if we have any filters
  const hasFilters = params.search || params.domains || params.difficulties || 
                     params.techStack || params.years || params.durations || 
                     (params.page && params.page !== '1');

  let result;
  
  if (!hasFilters) {
    // Use cached version for default page load (fastest path)
    result = await ProjectService.getProjectsCached();
  } else {
    // Use regular query for filtered results
    const filters = {
      search: params.search,
      domains: params.domains?.split(',').filter(Boolean),
      difficulties: params.difficulties?.split(',').filter(Boolean),
      techStack: params.techStack?.split(',').filter(Boolean),
      years: params.years?.split(',').filter(Boolean),
      durations: params.durations?.split(',').filter(Boolean),
      page: parseInt(params.page || '1'),
      limit: 12,
    };
    result = await ProjectService.getProjects(filters);
  }

  const { projects, total, page, totalPages } = result;

  return (
    <>
      <ProjectsStructuredData />
      <ProjectsClient
        initialProjects={projects}
        initialTotal={total}
        initialPage={page}
        initialTotalPages={totalPages}
      />
    </>
  );
}

function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050810] via-[#080b14] to-[#050810]">
      <div className="relative overflow-hidden border-b border-border-10">
        <div className="absolute top-10 right-10 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-90 mb-4">
            Explore{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full"></div>
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-text-60 max-w-3xl">
            Curated final year and innovative project ideas tailored for students
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage({ searchParams }: ProjectsPageProps) {
  return (
    <Suspense fallback={<ProjectsLoading />}>
      <ProjectsContent searchParams={searchParams} />
    </Suspense>
  );
}
