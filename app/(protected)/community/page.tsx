import { Suspense } from 'react';
import { Metadata } from 'next';
import { auth } from '@/lib/auth';
import { CommunityService } from '@/features/community/community.service';
import CommunityFeed from '@/components/community/CommunityFeed';
import CommunityHeader from '@/components/community/CommunityHeader';
import FeedSkeleton from '@/components/community/FeedSkeleton';
import { FeedFilters } from '@/features/community/community.types';
import { Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Community | Devory - Share Ideas & Collaborate',
  description: 'Join the Devory community to share project ideas, find collaborators, and connect with fellow developers.',
};

export const revalidate = 60;

interface CommunityPageProps {
  searchParams: Promise<{
    domain?: string;
    difficulty?: string;
    type?: string;
    sort?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function CommunityPage({ searchParams }: CommunityPageProps) {
  const session = await auth();
  const params = await searchParams;
  
  const filters: FeedFilters = {
    domain: params.domain as any,
    difficulty: params.difficulty as any,
    type: params.type as any,
    sortBy: (params.sort as any) || 'latest',
    page: parseInt(params.page || '1'),
    limit: 20,
  };
  
  return (
    <div className="space-y-8">
      {/* Clean Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl">
            <Home className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              Community Feed
            </h1>
          </div>
        </div>
        <p className="text-white/60 text-lg mb-6">
          Discover ideas, find collaborators, and connect with developers
        </p>
        
        {/* Search and Filters */}
        <CommunityHeader />
      </div>

      {/* Feed */}
      <Suspense fallback={<FeedSkeleton />}>
        <CommunityFeedWrapper filters={filters} userId={session?.user?.id} />
      </Suspense>
    </div>
  );
}

async function CommunityFeedWrapper({ 
  filters, 
  userId 
}: { 
  filters: FeedFilters;
  userId?: string;
}) {
  let feedData;
  let error: Error | null = null;

  try {
    feedData = await CommunityService.getFeed(filters, userId);
  } catch (e) {
    error = e instanceof Error ? e : new Error(String(e));
    console.error('Community feed error:', error);
  }

  if (error) {
    const errorMessage = error.message;
    const isTableMissing = errorMessage.includes('does not exist') || errorMessage.includes('P2021');
    
    return (
      <div className="bg-[rgba(15,15,15,0.6)] backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
        <svg 
          className={`w-24 h-24 mx-auto mb-4 ${isTableMissing ? 'text-blue-400' : 'text-yellow-400'}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {isTableMissing ? (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
            />
          ) : (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          )}
        </svg>
        <h3 className="text-2xl font-bold text-white/90 mb-2">
          {isTableMissing ? 'Database Setup Required' : 'Something Went Wrong'}
        </h3>
        <p className="text-white/60 mb-6 max-w-2xl mx-auto">
          {isTableMissing 
            ? 'The community tables need to be created in your database.'
            : 'There was an error loading the community feed.'}
        </p>
      </div>
    );
  }

  if (!feedData) {
    return (
      <div className="bg-[rgba(15,15,15,0.6)] backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
        <p className="text-white/60">No data available</p>
      </div>
    );
  }
  
  return (
    <CommunityFeed
      initialData={feedData}
      isAuthenticated={!!userId}
    />
  );
}
