import { requireAuth } from '@/lib/auth-helpers';
import { Suspense } from 'react';
import { DashboardService } from '@/features/dashboard/dashboard.service';
import StatsCards from '@/components/dashboard/StatsCards';
import RecommendationsGrid from '@/components/dashboard/RecommendationsGrid';
import RecentProjects from '@/components/dashboard/RecentProjects';
import QuickActions from '@/components/dashboard/QuickActions';
import SavedPreview from '@/components/dashboard/SavedPreview';
import { Skeleton } from '@/components/ui/skeleton';

// Enable aggressive caching for dashboard
export const revalidate = 60; // Revalidate every 60 seconds

// Enhanced skeleton components that match actual content
function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-[#0f0f0f] rounded-2xl p-8 animate-pulse">
          <div className="flex flex-col items-center">
            {/* Ring skeleton */}
            <div className="relative w-32 h-32 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Skeleton className="h-12 w-16 bg-white/5" />
              </div>
            </div>
            {/* Label skeleton */}
            <Skeleton className="h-5 w-32 bg-white/5" />
          </div>
        </div>
      ))}
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

// Server components that fetch data
async function DashboardStats({ userId }: { userId: string }) {
  const stats = await DashboardService.getDashboardStats(userId);
  return <StatsCards {...stats} />;
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
      {/* Welcome Header - Renders immediately */}
      <div className="relative overflow-hidden border-b border-border-10">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-accent-orange/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-accent-pink/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-16">
          <div className="text-center space-y-4 sm:space-y-6 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
            <div className="inline-block">
              <div className="text-xs sm:text-sm font-medium text-text-60 mb-2 tracking-wider uppercase">Welcome Back</div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-text-90 mb-3 sm:mb-4 px-2">
                Hey,{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
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
                        <stop offset="0%" stopColor="#ff6b00" />
                        <stop offset="50%" stopColor="#ff006e" />
                        <stop offset="100%" stopColor="#ff0040" />
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

      {/* Main Content with Suspense boundaries */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        
        {/* Stats Cards */}
        <section>
          <Suspense fallback={<StatsCardsSkeleton />}>
            <DashboardStats userId={session.user.id} />
          </Suspense>
        </section>

        {/* Personalized Recommendations */}
        <section>
          <Suspense fallback={<RecommendationsSkeleton />}>
            <PersonalizedRecommendations userId={session.user.id} />
          </Suspense>
        </section>

        {/* Continue Exploring */}
        <section>
          <Suspense fallback={<RecentProjectsSkeleton />}>
            <RecentlyViewed userId={session.user.id} />
          </Suspense>
        </section>

        {/* Quick Actions - No data fetching needed */}
        <section>
          <QuickActions />
        </section>

        {/* Saved Projects Preview */}
        <section>
          <Suspense fallback={<SavedPreviewSkeleton />}>
            <SavedProjectsPreview userId={session.user.id} />
          </Suspense>
        </section>

      </div>
    </div>
  );
}
