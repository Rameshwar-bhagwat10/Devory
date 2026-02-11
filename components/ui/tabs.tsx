import * as React from 'react';

export function Tabs({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex space-x-2 border-b border-border-10">
      {children}
    </div>
  );
}

export function TabsTrigger({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-4 py-2 text-text-60 hover:text-accent-orange hover:bg-glass-5 transition-all">
      {children}
    </button>
  );
}
