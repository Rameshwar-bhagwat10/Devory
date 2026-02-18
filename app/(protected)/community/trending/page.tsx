import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { auth } from '@/lib/auth';
import { CommunityService } from '@/features/community/community.service';
import FeedSkeleton from '@/components/community/FeedSkeleton';
import { FeedFilters } from '@/features/community/community.types';
import { TrendingUp, Flame, Zap } from 'lucide-react';

// Dynamic import for TrendingFeed
const TrendingFeed = dynamic(() => import('@/components/community/trending/TrendingFeed'), {
  loading: () => <FeedSkeleton />,
});

export const metadata: Metadata = {
  title: 'Trending | Community - Devory',
  description: 'Discover the hottest trending posts and ideas in the Devory community.',
};

// Ultra-aggressive caching
export const revalidate = 15; // 15 second revalidation
export const dynamicParams = true;

interface TrendingPageProps {
  searchParams: Promise<{
    timeframe?: '24h' | '7d' | '30d';
    page?: string;
  }>;
}

export default async function TrendingPage({ searchParams }: TrendingPageProps) {
  const params = await searchParams;
  
  const timeframe = params.timeframe || '24h';
  
  const filters: FeedFilters = {
    sortBy: 'trending',
    page: parseInt(params.page || '1'),
    limit: 20,
  };
  
  // Parallel data fetching
  const [session, feedDataPromise] = await Promise.all([
    auth(),
    CommunityService.getFeed(filters, undefined), // Fetch without userId for better caching
  ]);
  
  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl">
            <TrendingUp className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              Trending Now
            </h1>
          </div>
        </div>
        <p className="text-white/60 text-lg">
          The hottest posts gaining traction right now
        </p>
      </div>

      {/* Trending Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Flame className="w-5 h-5 text-orange-400" />
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wide">
              Hot Topics
            </h3>
          </div>
          <p className="text-2xl font-bold text-white">AI & Web3</p>
          <p className="text-xs text-white/40 mt-1">Most discussed today</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wide">
              Rising Fast
            </h3>
          </div>
          <p className="text-2xl font-bold text-white">12 Posts</p>
          <p className="text-xs text-white/40 mt-1">Gaining momentum</p>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wide">
              Engagement
            </h3>
          </div>
          <p className="text-2xl font-bold text-white">+45%</p>
          <p className="text-xs text-white/40 mt-1">vs. yesterday</p>
        </div>
      </div>

      {/* Timeframe Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-white/60">Show trending from:</span>
        <div className="flex gap-2">
          <Link
            href="/community/trending?timeframe=24h"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              timeframe === '24h'
                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            24 Hours
          </Link>
          <Link
            href="/community/trending?timeframe=7d"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              timeframe === '7d'
                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            7 Days
          </Link>
          <Link
            href="/community/trending?timeframe=30d"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              timeframe === '30d'
                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            30 Days
          </Link>
        </div>
      </div>

      {/* Feed */}
      <Suspense fallback={<FeedSkeleton />}>
        <TrendingFeedWrapper 
          feedDataPromise={Promise.resolve(feedDataPromise)}
          userId={session?.user?.id}
        />
      </Suspense>
    </div>
  );
}

async function TrendingFeedWrapper({ 
  feedDataPromise,
  userId
}: { 
  feedDataPromise: ReturnType<typeof CommunityService.getFeed>;
  userId?: string;
}) {
  let feedData;

  try {
    feedData = await feedDataPromise;
  } catch (e) {
    console.error('Trending feed error:', e);
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
        <p className="text-white/60">Failed to load trending posts</p>
      </div>
    );
  }

  if (!feedData || feedData.posts.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
        <Flame className="w-16 h-16 mx-auto mb-4 text-white/20" />
        <h3 className="text-xl font-bold text-white/90 mb-2">No trending posts yet</h3>
        <p className="text-white/60">Check back soon for hot content!</p>
      </div>
    );
  }
  
  return (
    <TrendingFeed
      initialData={feedData}
      isAuthenticated={!!userId}
    />
  );
}
