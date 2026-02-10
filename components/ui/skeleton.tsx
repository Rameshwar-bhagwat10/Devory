export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-bg-surface border border-border-default ${className}`}
    />
  );
}
