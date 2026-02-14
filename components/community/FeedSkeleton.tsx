export default function FeedSkeleton() {
  return (
    <>
      {/* Feed Column */}
      <div className="space-y-6">
        {/* Tabs Skeleton */}
        <div className="h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl animate-pulse"></div>

        {/* Filters Skeleton */}
        <div className="flex gap-3">
          <div className="h-10 w-40 bg-white/5 border border-white/10 rounded-lg animate-pulse"></div>
          <div className="h-10 w-32 bg-white/5 border border-white/10 rounded-lg animate-pulse"></div>
          <div className="h-10 w-32 bg-white/5 border border-white/10 rounded-lg animate-pulse"></div>
        </div>

        {/* Post Cards Skeleton */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[rgba(15,15,15,0.6)] backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-pulse"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 space-y-3">
                <div className="h-4 w-20 bg-white/10 rounded"></div>
                <div className="h-6 w-3/4 bg-white/10 rounded"></div>
              </div>
              <div className="h-6 w-24 bg-white/10 rounded-full"></div>
            </div>

            {/* Description */}
            <div className="space-y-2 mb-4">
              <div className="h-4 w-full bg-white/10 rounded"></div>
              <div className="h-4 w-5/6 bg-white/10 rounded"></div>
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-4">
              <div className="h-6 w-16 bg-white/10 rounded"></div>
              <div className="h-6 w-20 bg-white/10 rounded"></div>
              <div className="h-6 w-16 bg-white/10 rounded"></div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex gap-4">
                <div className="h-8 w-16 bg-white/10 rounded-lg"></div>
                <div className="h-8 w-16 bg-white/10 rounded-lg"></div>
                <div className="h-8 w-16 bg-white/10 rounded-lg"></div>
              </div>
              <div className="h-4 w-32 bg-white/10 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Column */}
      <div className="space-y-6">
        {/* Trending Skeleton */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-pulse">
          <div className="h-6 w-40 bg-white/10 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 p-3 bg-white/5 rounded-xl">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-full bg-white/10 rounded"></div>
                  <div className="h-3 w-2/3 bg-white/10 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collaborations Skeleton */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-pulse">
          <div className="h-6 w-48 bg-white/10 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl space-y-3">
                <div className="h-4 w-full bg-white/10 rounded"></div>
                <div className="h-3 w-5/6 bg-white/10 rounded"></div>
                <div className="flex gap-2">
                  <div className="h-5 w-16 bg-white/10 rounded"></div>
                  <div className="h-5 w-16 bg-white/10 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
