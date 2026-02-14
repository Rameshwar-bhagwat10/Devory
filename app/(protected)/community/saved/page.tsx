import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { SaveService } from '@/features/community/save.service';
import PostCard from '@/components/community/PostCard';
import FeedSkeleton from '@/components/community/FeedSkeleton';
import { Bookmark } from 'lucide-react';
import { PostWithAuthor } from '@/features/community/community.types';

async function SavedPostsContent() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/auth');
  }

  const { posts } = await SaveService.getSavedPosts(session.user.id, 1, 20);

  if (posts.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
        <Bookmark className="w-16 h-16 mx-auto mb-4 text-white/20" />
        <h3 className="text-xl font-semibold text-white/80 mb-2">No saved posts yet</h3>
        <p className="text-white/50">
          Posts you bookmark will appear here for easy access
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => {
        return (
          <PostCard 
            key={`${post.id}-${post.userReaction}-${post.isSaved}`}
            post={post as PostWithAuthor} 
            currentUserId={session.user.id} 
            isAuthenticated={true} 
          />
        );
      })}
    </div>
  );
}

export default function SavedCommunityPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Saved Posts</h1>
        <p className="text-white/60">Your bookmarked community posts</p>
      </div>

      {/* Content */}
      <Suspense fallback={<FeedSkeleton />}>
        <SavedPostsContent />
      </Suspense>
    </div>
  );
}
