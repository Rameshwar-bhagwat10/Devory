import * as React from 'react';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = '', ...props }, ref) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-border-soft bg-bg-elevated px-3 py-2 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
