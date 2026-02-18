import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { auth } from '@/lib/auth';
import { CommunityService } from '@/features/community/community.service';
import ViewTracker from '@/components/community/ViewTracker';
import IdeaDetailPage from '@/components/community/detail/IdeaDetailPage';
import CollaborationDetailPage from '@/components/community/detail/CollaborationDetailPage';

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

interface PageProps {
  params: Promise<{ slug: string }>;
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
