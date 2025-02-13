import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "p-4 text-[14px] resize-none outline-none text-ON_SURFACE_VAR hover:border-OUTLINE transition-all duration-300 focus:ring-1  ring-OUTLINE border rounded-[4px] placeholder:text-ON_SURFACE_VAR border-OUTLINE_VAR font-medium leading-[145%] bg-transparent",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
