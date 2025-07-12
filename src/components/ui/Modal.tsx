import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/utils";
import { Button } from "./Button";
import { useTheme } from "@/components/ThemeProvider";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  const { theme } = useTheme();
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative w-full max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-lg shadow-xl",
          className
        )}
        style={{
          backgroundColor: theme.mode === "light" ? "#ffffff" : "#000000",
          border: `1px solid ${theme.mode === "light" ? "#e5e7eb" : "#1e293b"}`,
          boxShadow:
            theme.mode === "light"
              ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              : "0 20px 25px -5px rgba(255, 255, 255, 0.15), 0 10px 10px -5px rgba(255, 255, 255, 0.1)",
        }}
      >
        {title && (
          <div
            className="flex items-center justify-between p-4 sm:p-6 border-b"
            style={{
              borderColor: theme.mode === "light" ? "#e5e7eb" : "#1e293b",
            }}
          >
            <h2
              className="text-base sm:text-lg font-semibold"
              style={{ color: theme.mode === "light" ? "#111827" : "#ffffff" }}
            >
              {title}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
              style={{
                color: theme.mode === "light" ? "#0f172a" : "#ffffff",
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
};
