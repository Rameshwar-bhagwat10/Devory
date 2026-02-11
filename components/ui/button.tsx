import * as React from 'react';

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = '', ...props }, ref) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium bg-gradient-primary text-white transition-all hover:scale-105 focus:outline-none ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button };
