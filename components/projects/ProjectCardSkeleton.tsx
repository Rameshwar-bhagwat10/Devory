export default function ProjectCardSkeleton() {
  return (
    <div className="bg-glass-5 border border-border-10 rounded-xl p-6 animate-pulse">
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
  );
}
