export default function ProjectCardSkeleton() {
  return (
    <div className="relative bg-dark-base/60 border border-border-10 rounded-xl p-6 animate-pulse backdrop-blur-sm">
      {/* Subtle gradient overlay for default state */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.04] via-transparent to-cyan-500/[0.03] pointer-events-none rounded-xl"></div>
      
      <div className="relative z-10">
        {/* Title */}
        <div className="h-6 bg-glass-10 rounded w-3/4 mb-3"></div>
        
        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-glass-10 rounded w-full"></div>
          <div className="h-4 bg-glass-10 rounded w-5/6"></div>
        </div>

        {/* Metadata row */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 bg-glass-10 rounded-full w-20"></div>
          <div className="h-6 bg-glass-10 rounded w-24"></div>
          <div className="h-6 bg-glass-10 rounded w-16"></div>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          <div className="h-6 bg-glass-10 rounded w-16"></div>
          <div className="h-6 bg-glass-10 rounded w-20"></div>
          <div className="h-6 bg-glass-10 rounded w-18"></div>
        </div>
      </div>
    </div>
  );
}
