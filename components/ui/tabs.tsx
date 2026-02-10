import * as React from 'react';

export function Tabs({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex space-x-2 border-b border-border-default">
      {children}
    </div>
  );
}

export function TabsTrigger({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors">
      {children}
    </button>
  );
}
