import { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import FeedSkeleton from '@/components/community/FeedSkeleton';
import { UserPlus, Heart, Users } from 'lucide-react';

// Dynamic import for FollowingFeed
const FollowingFeed = dynamic(() => import('@/components/community/following/FollowingFeed'), {
  loading: () => <FeedSkeleton />,
});

export const metadata: Metadata = {
  title: 'Following | Community - Devory',
  description: 'See posts from developers you follow in the Devory community.',
};

export const revalidate = 30;
export const dynamicParams = true;

interface FollowingPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function FollowingPage({ searchParams }: FollowingPageProps) {
  const session = await auth();
  
  // Redirect to auth if not logged in
  if (!session?.user?.id) {
    redirect('/auth?callbackUrl=/community/following');
  }

  const params = await searchParams;
  const page = parseInt(params.page || '1');
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl">
            <UserPlus className="w-6 h-6 text-pink-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              Following
            </h1>
          </div>
        </div>
        <p className="text-white/60 text-lg">
          Posts from developers you follow
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-5 h-5 text-pink-400" />
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wide">
              Following
            </h3>
          </div>
          <p className="text-2xl font-bold text-white">0</p>
          <p className="text-xs text-white/40 mt-1">Developers</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wide">
              New Posts
            </h3>
          </div>
          <p className="text-2xl font-bold text-white">0</p>
          <p className="text-xs text-white/40 mt-1">Today</p>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <UserPlus className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wide">
              Active Now
            </h3>
          </div>
          <p className="text-2xl font-bold text-white">0</p>
          <p className="text-xs text-white/40 mt-1">Online</p>
        </div>
      </div>

      {/* Feed */}
      <Suspense fallback={<FeedSkeleton />}>
        <FollowingFeedWrapper userId={session.user.id} page={page} />
      </Suspense>
    </div>
  );
}

async function FollowingFeedWrapper({ 
  userId,
  page
}: { 
  userId: string;
  page: number;
}) {
  let feedData;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/community/following-feed?page=${page}`, {
      headers: {
        'Cookie': `next-auth.session-token=${userId}` // This is simplified, actual implementation may vary
      },
      cache: 'no-store'
    });
    
    if (response.ok) {
      feedData = await response.json();
    }
  } catch (e) {
    console.error('Following feed error:', e);
  }

  return (
    <FollowingFeed
      initialPosts={feedData?.posts || []}
      userId={userId}
    />
  );
}
