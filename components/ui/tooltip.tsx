import * as React from 'react';

export function Tooltip({ children }: { children: React.ReactNode }) {
  return <div className="relative inline-block">{children}</div>;
}

export function TooltipTrigger({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function TooltipContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute z-50 px-3 py-1.5 text-sm bg-glass-10 text-text-90 rounded border border-border-10 backdrop-blur-sm">
      {children}
    </div>
  );
}
