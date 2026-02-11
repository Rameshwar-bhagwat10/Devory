import * as React from 'react';

export function Dialog({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-50">{children}</div>;
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-glass-10 border border-border-10 rounded-lg p-6 max-w-md w-full backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
}
