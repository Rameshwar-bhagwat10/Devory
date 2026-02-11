export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-glass-5 border border-border-10 ${className}`}
    />
  );
}
