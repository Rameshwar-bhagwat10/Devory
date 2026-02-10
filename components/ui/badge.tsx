import * as React from 'react';

export function Badge({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-bg-elevated text-text-secondary border border-border-soft ${className}`}
      {...props}
    />
  );
}
