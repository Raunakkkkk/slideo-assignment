import React from "react";
import { cn } from "@/utils";
import { useTheme } from "@/components/ThemeProvider";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  // Extends HTML select attributes with theme support
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <select
        className={cn(
          "flex h-10 w-full rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        style={{
          backgroundColor: theme.mode === "light" ? "#ffffff" : "#000000",
          color: theme.mode === "light" ? "#0f172a" : "#ffffff",
          border: `1px solid ${theme.mode === "light" ? "#cbd5e1" : "#334155"}`,
          boxShadow:
            theme.mode === "light"
              ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
              : "0 1px 2px 0 rgba(255, 255, 255, 0.1)",
        }}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

export { Select };
