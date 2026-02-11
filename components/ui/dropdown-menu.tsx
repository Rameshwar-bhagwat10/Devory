import * as React from 'react';

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  return <div className="relative inline-block">{children}</div>;
}

export function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center text-text-90 hover:text-accent-orange transition-colors">
      {children}
    </button>
  );
}

export function DropdownMenuContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md bg-glass-10 border border-border-10 backdrop-blur-sm">
      {children}
    </div>
  );
}
