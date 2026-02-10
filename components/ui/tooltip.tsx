import * as React from 'react';

export function Tooltip({ children }: { children: React.ReactNode }) {
  return <div className="relative inline-block">{children}</div>;
}

export function TooltipTrigger({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function TooltipContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute z-50 px-3 py-1.5 text-sm bg-bg-elevated text-text-primary rounded border border-border-soft shadow-soft">
      {children}
    </div>
  );
}
