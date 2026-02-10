import * as React from 'react';

export function Dialog({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-50">{children}</div>;
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-bg-elevated border border-border-default rounded-lg p-6 max-w-md w-full shadow-soft">
        {children}
      </div>
    </div>
  );
}
