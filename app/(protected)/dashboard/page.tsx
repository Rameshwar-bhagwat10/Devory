import { requireAuth } from '@/lib/auth-helpers';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { DashboardService } from '@/features/dashboard/dashboard.service';
import EnhancedStatsCards from '@/components/dashboard/EnhancedStatsCards';
import ActiveCollaborations from '@/components/dashboard/ActiveCollaborations';
import CommunityActivityFeed from '@/components/dashboard/CommunityActivityFeed';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamic imports for below-the-fold components (lazy loading)
const RecommendationsGrid = dynamic(() => import('@/components/dashboard/RecommendationsGrid'), {
  loading: () => <RecommendationsSkeleton />,
});
const RecentProjects = dynamic(() => import('@/components/dashboard/RecentProjects'), {
  loading: () => <RecentProjectsSkeleton />,
});
const QuickActions = dynamic(() => import('@/components/dashboard/QuickActions'));
const SavedPreview = dynamic(() => import('@/components/dashboard/SavedPreview'), {
  loading: () => <SavedPreviewSkeleton />,
});

// Aggressive caching with stale-while-revalidate strategy
export const revalidate = 30; // Revalidate every 30 seconds
export const dynamicParams = true; // Enable dynamic params
export const fetchCache = 'default-cache'; // Use default caching

// Enhanced skeleton components that match actual content
function EnhancedStatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={i} className="bg-[#0d0d0d] border border-white/10 rounded-xl p-4 animate-pulse">
          <div className="flex flex-col items-center space-y-2">
            <Skeleton className="h-9 w-9 rounded-lg bg-white/5" />
            <Skeleton className="h-8 w-12 bg-white/5" />
            <Skeleton className="h-3 w-16 bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ActiveCollaborationsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-64 mb-2 bg-white/5" />
          <Skeleton className="h-4 w-80 bg-white/5" />
        </div>
        <Skeleton className="h-10 w-24 rounded-lg bg-white/5" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[#0d0d0d] border border-white/10 rounded-xl p-5 animate-pulse">
            <Skeleton className="h-6 w-3/4 mb-3 bg-white/5" />
            <Skeleton className="h-4 w-20 mb-4 bg-white/5" />
            <div className="flex items-center -space-x-2 mb-4">
              {[1, 2, 3].map((j) => (
                <Skeleton key={j} className="h-8 w-8 rounded-full bg-white/5" />
              ))}
            </div>
            <Skeleton className="h-1.5 w-full rounded-full bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CommunityActivityFeedSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-64 mb-2 bg-white/5" />
          <Skeleton className="h-4 w-80 bg-white/5" />
        </div>
        <Skeleton className="h-10 w-24 rounded-lg bg-white/5" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[#0d0d0d] border border-white/10 rounded-xl p-5 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="h-10 w-10 rounded-full bg-white/5" />
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-1 bg-white/5" />
                <Skeleton className="h-3 w-16 bg-white/5" />
              </div>
            </div>
            <Skeleton className="h-6 w-20 mb-3 bg-white/5" />
            <Skeleton className="h-5 w-full mb-2 bg-white/5" />
            <Skeleton className="h-4 w-full mb-1 bg-white/5" />
            <Skeleton className="h-4 w-3/4 mb-4 bg-white/5" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-12 bg-white/5" />
              <Skeleton className="h-4 w-12 bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendationsSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2 bg-white/5" />
          <Skeleton className="h-4 w-48 bg-white/5" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 animate-pulse">
            <Skeleton className="h-6 w-3/4 mb-3 bg-white/5" />
            <Skeleton className="h-4 w-full mb-2 bg-white/5" />
            <Skeleton className="h-4 w-5/6 mb-4 bg-white/5" />
            <div className="flex gap-2 mb-4">
              <Skeleton className="h-6 w-20 rounded-full bg-white/5" />
              <Skeleton className="h-6 w-24 rounded-full bg-white/5" />
            </div>
            <div className="flex gap-2 mb-6">
              <Skeleton className="h-5 w-16 rounded-md bg-white/5" />
              <Skeleton className="h-5 w-16 rounded-md bg-white/5" />
              <Skeleton className="h-5 w-16 rounded-md bg-white/5" />
            </div>
            <Skeleton className="h-10 w-full rounded-lg bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentProjectsSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-48 bg-white/5" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-[#0f0f0f] rounded-2xl p-6 animate-pulse">
            <Skeleton className="h-6 w-3/4 mb-3 bg-white/5" />
            <Skeleton className="h-5 w-24 mb-2 bg-white/5" />
            <Skeleton className="h-4 w-32 bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SavedPreviewSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-48 bg-white/5" />
        <Skeleton className="h-10 w-32 rounded-lg bg-white/5" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 animate-pulse">
            <Skeleton className="h-6 w-3/4 mb-3 bg-white/5" />
            <Skeleton className="h-4 w-full mb-2 bg-white/5" />
            <Skeleton className="h-4 w-5/6 mb-4 bg-white/5" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20 rounded-md bg-white/5" />
              <Skeleton className="h-5 w-24 rounded-md bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Optimized server components with parallel data fetching
async function DashboardStats({ userId }: { userId: string }) {
  const stats = await DashboardService.getEnhancedDashboardStats(userId);
  return <EnhancedStatsCards {...stats} />;
}

async function UserActiveCollaborations({ userId }: { userId: string }) {
  const [collaborations, pendingRequests] = await Promise.all([
    DashboardService.getActiveCollaborations(userId, 6),
    DashboardService.getPendingRequests(userId),
  ]);
  return <ActiveCollaborations collaborations={collaborations} pendingRequests={pendingRequests} />;
}

async function UserCommunityActivity({ userId }: { userId: string }) {
  const activities = await DashboardService.getCommunityActivityFeed(userId, 6);
  return <CommunityActivityFeed activities={activities} />;
}

async function PersonalizedRecommendations({ userId }: { userId: string }) {
  const [recommendations, userInterest] = await Promise.all([
    DashboardService.getPersonalizedRecommendations(userId, 3),
    DashboardService.getUserInterest(userId),
  ]);
  return <RecommendationsGrid projects={recommendations} userInterest={userInterest} />;
}

async function RecentlyViewed({ userId }: { userId: string }) {
  const projects = await DashboardService.getRecentlyViewed(userId, 4);
  if (projects.length === 0) return null;
  return <RecentProjects projects={projects} />;
}

async function SavedProjectsPreview({ userId }: { userId: string }) {
  const [projects, totalSaved] = await Promise.all([
    DashboardService.getSavedProjectsPreview(userId, 3),
    DashboardService.getSavedCount(userId),
  ]);
  return <SavedPreview projects={projects} totalSaved={totalSaved} />;
}

export default async function DashboardPage() {
  const session = await requireAuth();
  const userName = session.user.name || session.user.email?.split('@')[0] || 'there';

  return (
    <div className="min-h-screen bg-dark-base">
      {/* Welcome Header - Renders immediately (static content) */}
      <div className="relative overflow-hidden border-b border-border-10">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-accent-orange/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-0 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-accent-pink/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-16">
          <div className="text-center space-y-4 sm:space-y-6 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
            <div className="inline-block">
              <div className="text-xs sm:text-sm font-medium text-text-60 mb-2 tracking-wider uppercase">Welcome Back</div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-text-90 mb-3 sm:mb-4 px-2">
                Hey,{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {userName}
                  </span>
                  <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path
                      d="M1 5.5C50 2.5 150 2.5 199 5.5"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="transition-all duration-1000 opacity-100"
                      style={{ strokeDasharray: 200, strokeDashoffset: 0 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="inline-block ml-2 sm:ml-4">👋</span>
              </h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-text-60 max-w-3xl mx-auto leading-relaxed px-4">
              Ready to build something amazing today?
              <br className="hidden sm:block" />
              Let&apos;s turn your ideas into reality.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Optimized with priority loading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        
        {/* PRIORITY 1: Above-the-fold - Enhanced Stats Cards */}
        <section>
          <Suspense fallback={<EnhancedStatsCardsSkeleton />}>
            <DashboardStats userId={session.user.id} />
          </Suspense>
        </section>

        {/* PRIORITY 2: High engagement - Active Collaborations */}
        <section>
          <Suspense fallback={<ActiveCollaborationsSkeleton />}>
            <UserActiveCollaborations userId={session.user.id} />
          </Suspense>
        </section>

        {/* PRIORITY 3: Community engagement - Activity Feed */}
        <section>
          <Suspense fallback={<CommunityActivityFeedSkeleton />}>
            <UserCommunityActivity userId={session.user.id} />
          </Suspense>
        </section>

        {/* PRIORITY 4: Below-the-fold - Lazy loaded with dynamic imports */}
        <section>
          <Suspense fallback={<RecommendationsSkeleton />}>
            <PersonalizedRecommendations userId={session.user.id} />
          </Suspense>
        </section>

        <section>
          <Suspense fallback={<RecentProjectsSkeleton />}>
            <RecentlyViewed userId={session.user.id} />
          </Suspense>
        </section>

        {/* PRIORITY 5: Static content - No data fetching */}
        <section>
          <QuickActions />
        </section>

        <section>
          <Suspense fallback={<SavedPreviewSkeleton />}>
            <SavedProjectsPreview userId={session.user.id} />
          </Suspense>
        </section>

      </div>
    </div>
  );
}
