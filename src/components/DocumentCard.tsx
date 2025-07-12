import React from "react";
import { Document } from "@/types";
import {
  formatDate,
  getDocumentIcon,
  getCategoryColor,
  getTypeColor,
} from "@/utils";
import { Eye, Calendar, Tag } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface DocumentCardProps {
  document: Document;
  onPreview: (document: Document) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onPreview,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className="rounded-lg transition-all duration-200 overflow-hidden hover:scale-[1.02] active:scale-[0.98]"
      style={{
        backgroundColor: theme.mode === "light" ? "#ffffff" : "#000000",
        border: `1px solid ${theme.mode === "light" ? "#e2e8f0" : "#1e293b"}`,
        boxShadow:
          theme.mode === "light"
            ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
            : "0 1px 3px 0 rgba(255, 255, 255, 0.15), 0 1px 2px 0 rgba(255, 255, 255, 0.1)",
      }}
      onMouseEnter={(e) => {
        if (window.innerWidth > 768) {
        e.currentTarget.style.boxShadow =
          theme.mode === "light"
            ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            : "0 4px 6px -1px rgba(255, 255, 255, 0.2), 0 2px 4px -1px rgba(255, 255, 255, 0.15)";
        }
      }}
      onMouseLeave={(e) => {
        if (window.innerWidth > 768) {
        e.currentTarget.style.boxShadow =
          theme.mode === "light"
            ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
            : "0 1px 3px 0 rgba(255, 255, 255, 0.15), 0 1px 2px 0 rgba(255, 255, 255, 0.1)";
        }
      }}
    >
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <span className="text-xl sm:text-2xl flex-shrink-0">
              {getDocumentIcon(document.type)}
            </span>
            <div className="flex flex-col min-w-0 flex-1">
              <h3
                className="font-semibold text-sm line-clamp-2 leading-tight"
                style={{
                  color: theme.mode === "light" ? "#0f172a" : "#ffffff",
                }}
              >
                {document.title}
              </h3>
              <div className="flex items-center space-x-1 sm:space-x-2 mt-1 flex-wrap gap-1">
                <span
                  className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${getTypeColor(
                    document.type
                  )}`}
                >
                  {document.type}
                </span>
                <span
                  className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${getCategoryColor(
                    document.category
                  )}`}
                >
                  {document.category}
                </span>
              </div>
            </div>
          </div>
          {document.aiGenerated && (
            <span
              className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium flex-shrink-0"
              style={{
                backgroundColor: theme.mode === "light" ? "#f3e8ff" : "#581c87",
                color: theme.mode === "light" ? "#7c3aed" : "#c084fc",
              }}
            >
              AI
            </span>
          )}
        </div>

        <p
          className="text-sm line-clamp-3 mb-3"
          style={{ color: theme.mode === "light" ? "#475569" : "#cbd5e1" }}
        >
          {document.content.substring(0, 120)}...
        </p>

        <div
          className="flex items-center justify-between text-xs mb-3"
          style={{ color: theme.mode === "light" ? "#64748b" : "#94a3b8" }}
        >
          <div className="flex items-center space-x-1">
            <Calendar
              className="h-3 w-3"
              style={{ color: theme.mode === "light" ? "#64748b" : "#94a3b8" }}
            />
            <span>{formatDate(document.createdAt)}</span>
          </div>
        </div>

        {document.tags.length > 0 && (
          <div className="flex items-center space-x-1 mb-3">
            <Tag
              className="h-3 w-3 flex-shrink-0"
              style={{ color: theme.mode === "light" ? "#9ca3af" : "#6b7280" }}
            />
            <div className="flex flex-wrap gap-1 min-w-0">
              {document.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor:
                      theme.mode === "light" ? "#f3f4f6" : "#374151",
                    color: theme.mode === "light" ? "#374151" : "#d1d5db",
                  }}
                >
                  {tag}
                </span>
              ))}
              {document.tags.length > 3 && (
                <span
                  className="text-xs"
                  style={{
                    color: theme.mode === "light" ? "#6b7280" : "#9ca3af",
                  }}
                >
                  +{document.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        <button
          onClick={() => onPreview(document)}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200"
          style={{
            color: theme.mode === "light" ? "#3b82f6" : "#60a5fa",
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color =
              theme.mode === "light" ? "#2563eb" : "#93c5fd";
            e.currentTarget.style.backgroundColor =
              theme.mode === "light" ? "#eff6ff" : "rgba(59, 130, 246, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color =
              theme.mode === "light" ? "#3b82f6" : "#60a5fa";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <Eye className="h-4 w-4" style={{ color: "inherit" }} />
          <span>Preview</span>
        </button>
      </div>
    </div>
  );
};
