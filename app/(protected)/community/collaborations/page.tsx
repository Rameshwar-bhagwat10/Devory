import { Suspense } from 'react';
import { Metadata } from 'next';
import { auth } from '@/lib/auth';
import { CommunityService } from '@/features/community/community.service';
import CollaborationsFeed from '@/components/community/collaborations/CollaborationsFeed';
import FeedSkeleton from '@/components/community/FeedSkeleton';
import { FeedFilters } from '@/features/community/community.types';
import { Users, UserPlus, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Collaborations | Community - Devory',
  description: 'Find and join active collaboration opportunities in the Devory community.',
};

export const revalidate = 60;

interface CollaborationsPageProps {
  searchParams: Promise<{
    status?: 'OPEN' | 'CLOSED' | 'ALL';
    page?: string;
  }>;
}

export default async function CollaborationsPage({ searchParams }: CollaborationsPageProps) {
  const session = await auth();
  const params = await searchParams;
  
  const status = params.status || 'OPEN';
  
  const filters: FeedFilters = {
    type: 'COLLABORATION',
    sortBy: 'latest',
    page: parseInt(params.page || '1'),
    limit: 20,
  };
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl">
            <Users className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              Collaboration Hub
            </h1>
          </div>
        </div>
        <p className="text-white/60 text-lg">
          Find teammates and join exciting projects
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <UserPlus className="w-5 h-5 text-green-400" />
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wide">
              Open Positions
            </h3>
          </div>
          <p className="text-2xl font-bold text-white">24</p>
          <p className="text-xs text-white/40 mt-1">Actively recruiting</p>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wide">
              Active Teams
            </h3>
          </div>
          <p className="text-2xl font-bold text-white">18</p>
          <p className="text-xs text-white/40 mt-1">Building together</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wide">
              Completed
            </h3>
          </div>
          <p className="text-2xl font-bold text-white">7</p>
          <p className="text-xs text-white/40 mt-1">This month</p>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-white/60">Filter by status:</span>
        <div className="flex gap-2">
          <a
            href="/community/collaborations?status=OPEN"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              status === 'OPEN'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            Open
          </a>
          <a
            href="/community/collaborations?status=ALL"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              status === 'ALL'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            All
          </a>
          <a
            href="/community/collaborations?status=CLOSED"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              status === 'CLOSED'
                ? 'bg-gradient-to-r from-gray-600 to-slate-600 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            Closed
          </a>
        </div>
      </div>

      {/* Feed */}
      <Suspense fallback={<FeedSkeleton />}>
        <CollaborationsFeedWrapper 
          filters={filters} 
          userId={session?.user?.id}
          status={status}
        />
      </Suspense>
    </div>
  );
}

async function CollaborationsFeedWrapper({ 
  filters, 
  userId,
  status
}: { 
  filters: FeedFilters;
  userId?: string;
  status: string;
}) {
  let feedData;

  try {
    feedData = await CommunityService.getFeed(filters, userId);
  } catch (e) {
    console.error('Collaborations feed error:', e);
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
        <p className="text-white/60">Failed to load collaborations</p>
      </div>
    );
  }

  if (!feedData || feedData.posts.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
        <Users className="w-16 h-16 mx-auto mb-4 text-white/20" />
        <h3 className="text-xl font-bold text-white/90 mb-2">No collaborations found</h3>
        <p className="text-white/60 mb-6">Be the first to start a collaboration!</p>
        {userId && (
          <a
            href="/community/new"
            className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-full hover:scale-105 transition-all"
          >
            Create Collaboration
          </a>
        )}
      </div>
    );
  }
  
  return (
    <CollaborationsFeed
      initialData={feedData}
      isAuthenticated={!!userId}
      status={status}
    />
  );
}
