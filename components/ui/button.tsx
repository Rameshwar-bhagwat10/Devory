import * as React from 'react';

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = '', ...props }, ref) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium bg-primary text-white hover:bg-primary-soft transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-main ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button };
