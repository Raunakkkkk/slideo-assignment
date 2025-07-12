import React from "react";
import { cn } from "@/utils";
import { useTheme } from "@/components/ThemeProvider";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  // Extends HTML textarea attributes with theme support
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        style={{
          backgroundColor: theme.mode === "light" ? "#ffffff" : "#000000",
          color: theme.mode === "light" ? "#0f172a" : "#ffffff",
          border: `1px solid ${theme.mode === "light" ? "#cbd5e1" : "#334155"}`,
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
