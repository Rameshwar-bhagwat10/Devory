import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { auth } from '@/lib/auth';
import { CommunityService } from '@/features/community/community.service';
import ViewTracker from '@/components/community/ViewTracker';
import IdeaDetailPage from '@/components/community/detail/IdeaDetailPage';
import CollaborationDetailPage from '@/components/community/detail/CollaborationDetailPage';
import CommunityPostStructuredData from '@/components/seo/CommunityPostStructuredData';

// Dynamic import for CommentSection (heavy component)
const CommentSection = dynamic(() => import('@/components/community/CommentSection'), {
  loading: () => (
    <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8">
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    </div>
  ),
});

// Ultra-aggressive caching for instant loads
export const revalidate = 15; // 15 second revalidation
export const dynamicParams = true;
export const dynamic = 'force-dynamic'; // Don't pre-render at build time

// Don't pre-render community posts at build time (they're protected routes)
export async function generateStaticParams() {
  // Return empty array - community posts are dynamic and protected
  return [];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for community posts
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await CommunityService.getPostBySlug(slug, undefined);

  if (!post) {
    return {
      title: 'Post Not Found | Devory Community',
      description: 'The community post you are looking for could not be found.',
    };
  }

  // Create clean description (150-160 chars)
  const cleanDescription = post.shortDescription.length > 160
    ? post.shortDescription.substring(0, 157) + '...'
    : post.shortDescription;

  // Generate keywords
  const keywords = [
    post.title,
    post.domain,
    post.difficulty,
    ...post.techStack,
    ...post.tags,
    post.type === 'COLLABORATION' ? 'collaboration' : 'project idea',
    'developer community',
    'coding project',
  ];

  const baseUrl = process.env.NEXTAUTH_URL || 'https://devory.com';
  const postUrl = `${baseUrl}/community/${slug}`;

  return {
    title: `${post.title} | Devory Community`,
    description: cleanDescription,
    keywords,
    authors: [{ name: post.user?.name || 'Devory Community' }],
    creator: 'Devory',
    publisher: 'Devory',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/community/${slug}`,
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: postUrl,
      title: `${post.title} | Devory Community`,
      description: cleanDescription,
      siteName: 'Devory',
      images: [
        {
          url: '/og-community-post-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: new Date(post.createdAt).toISOString(),
      modifiedTime: new Date(post.updatedAt).toISOString(),
      authors: [post.user?.name || 'Anonymous'],
      tags: [post.domain, post.difficulty, ...post.techStack, ...post.tags],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Devory Community`,
      description: cleanDescription,
      images: ['/og-community-post-image.png'],
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
}

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Parallel data fetching for maximum speed
  const [session, post] = await Promise.all([
    auth(),
    CommunityService.getPostBySlug(slug, undefined), // Fetch without userId first for better caching
  ]);
  
  if (!post) {
    notFound();
  }
  
  // Serialize dates for client components
  const serializedPost = {
    ...post,
    createdAt: typeof post.createdAt === 'string' ? post.createdAt : post.createdAt.toISOString(),
    updatedAt: typeof post.updatedAt === 'string' ? post.updatedAt : post.updatedAt.toISOString(),
  };
  
  // Render different detail pages based on post type
  const DetailComponent = post.type === 'COLLABORATION' 
    ? CollaborationDetailPage 
    : IdeaDetailPage;
  
  return (
    <>
      {/* Structured Data for SEO */}
      <CommunityPostStructuredData post={post} />
      
      <DetailComponent 
        post={serializedPost} 
        isAuthenticated={!!session}
        currentUserId={session?.user?.id}
      />
      
      {/* Comments Section - Lazy loaded */}
      <div className="max-w-5xl mx-auto mt-6">
        <Suspense fallback={
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
          </div>
        }>
          <ViewTracker postSlug={slug} />
          <CommentSection 
            postId={post.id} 
            postSlug={slug} 
            postAuthorId={post.userId}
            currentUserId={session?.user?.id}
            isAuthenticated={!!session} 
          />
        </Suspense>
      </div>
    </>
  );
}
