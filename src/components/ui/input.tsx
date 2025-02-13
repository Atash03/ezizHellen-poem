import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'p-4 text-[14px] h-[52px] text-ON_SURFACE_VAR outline-none hover:border-OUTLINE transition-all focus:ring-1 ring-OUTLINE border rounded-[4px] placeholder:text-ON_SURFACE_VAR border-OUTLINE_VAR font-medium leading-[140%] bg-transparent',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
