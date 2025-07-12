import React from "react";
import { cn } from "@/utils";
import { useTheme } from "@/components/ThemeProvider";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
