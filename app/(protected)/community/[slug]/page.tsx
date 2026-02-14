import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { auth } from '@/lib/auth';
import { CommunityService } from '@/features/community/community.service';
import CommentSection from '@/components/community/CommentSection';
import ViewTracker from '@/components/community/ViewTracker';
import IdeaDetailPage from '@/components/community/detail/IdeaDetailPage';
import CollaborationDetailPage from '@/components/community/detail/CollaborationDetailPage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const session = await auth();
  const post = await CommunityService.getPostBySlug(slug, session?.user?.id);
  
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
        post={serializedPost as any} 
        isAuthenticated={!!session}
        currentUserId={session?.user?.id}
      />
      
      {/* Comments Section */}
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
