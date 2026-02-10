import * as React from 'react';

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  return <div className="relative inline-block">{children}</div>;
}

export function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center text-text-primary hover:text-primary transition-colors">
      {children}
    </button>
  );
}

export function DropdownMenuContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-soft bg-bg-elevated border border-border-default">
      {children}
    </div>
  );
}
