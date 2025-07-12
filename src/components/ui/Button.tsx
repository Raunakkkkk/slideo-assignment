import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";
import { useTheme } from "@/components/ThemeProvider";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border hover:bg-gray-50",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        ghost: "hover:bg-gray-100",
        link: "underline-offset-4 hover:underline text-blue-600",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const { theme } = useTheme();

    const getButtonStyles = () => {
      const baseStyles = {
        transition: "all 0.2s ease-in-out",
      };

      if (variant === "outline") {
        return {
          ...baseStyles,
          backgroundColor: "transparent",
          color: theme.mode === "light" ? "#0f172a" : "#ffffff",
          border: `1px solid ${theme.mode === "light" ? "#cbd5e1" : "#334155"}`,
          ":hover": {
            backgroundColor: theme.mode === "light" ? "#f8fafc" : "#0f172a",
          },
        };
      }

      if (variant === "secondary") {
        return {
          ...baseStyles,
          backgroundColor: theme.mode === "light" ? "#f1f5f9" : "#0f172a",
          color: theme.mode === "light" ? "#0f172a" : "#f8fafc",
          ":hover": {
            backgroundColor: theme.mode === "light" ? "#e2e8f0" : "#1e293b",
          },
        };
      }

      if (variant === "ghost") {
        return {
          ...baseStyles,
          backgroundColor: "transparent",
          color: theme.mode === "light" ? "#0f172a" : "#ffffff",
          ":hover": {
            backgroundColor: theme.mode === "light" ? "#f1f5f9" : "#0f172a",
            color: theme.mode === "light" ? "#0f172a" : "#ffffff",
          },
        };
      }

      if (variant === "link") {
        return {
          ...baseStyles,
          backgroundColor: "transparent",
          color: theme.mode === "light" ? "#3b82f6" : "#60a5fa",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        };
      }

      // Default and destructive variants work fine with Tailwind
      return baseStyles;
    };

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        style={getButtonStyles()}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
