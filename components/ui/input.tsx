import * as React from 'react';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = '', ...props }, ref) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-border-10 bg-glass-5 px-3 py-2 text-text-90 placeholder:text-text-60 focus:outline-none focus:ring-2 focus:ring-accent-orange/30 transition-all ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
