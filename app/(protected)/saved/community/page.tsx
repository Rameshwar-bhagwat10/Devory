import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { SaveService } from '@/features/community/save.service';
import PostCard from '@/components/community/PostCard';
import EmptyState from '@/components/common/EmptyState';
import FeedSkeleton from '@/components/community/FeedSkeleton';

async function SavedPostsContent() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/auth');
  }

  const { posts } = await SaveService.getSavedPosts(session.user.id, 1, 20);

  if (posts.length === 0) {
    return (
      <EmptyState message="No saved posts yet. Posts you bookmark will appear here." />
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} currentUserId={session.user.id} isAuthenticated={true} />
      ))}
    </div>
  );
}

export default function SavedCommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050810] to-[#080b14] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Saved Posts
          </h1>
          <p className="text-white/60 mt-2">
            Your bookmarked community posts
          </p>
        </div>

        <Suspense fallback={<FeedSkeleton />}>
          <SavedPostsContent />
        </Suspense>
      </div>
    </div>
  );
}
