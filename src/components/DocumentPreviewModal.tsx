import React from "react";
import { Modal } from "./ui/Modal";
import { Document } from "@/types";
import {
  formatDateTime,
  getDocumentIcon,
  getCategoryColor,
  getTypeColor,
} from "@/utils";
import { Calendar, Tag, Sparkles } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface DocumentPreviewModalProps {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  document,
  isOpen,
  onClose,
}) => {
  const { theme } = useTheme();

  if (!document) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={document.title}
      className="max-w-4xl w-full mx-2 sm:mx-4 max-h-[95vh] sm:max-h-[90vh]"
    >
      <div className="space-y-6">
        {/* Document Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="text-2xl sm:text-3xl">
              {getDocumentIcon(document.type)}
            </span>
            <div className="min-w-0 flex-1">
              <h1
                className="text-lg sm:text-xl font-semibold break-words"
                style={{
                  color: theme.mode === "light" ? "#111827" : "#ffffff",
                }}
              >
                {document.title}
              </h1>
              <div className="flex items-center space-x-1 sm:space-x-2 mt-1 flex-wrap gap-1">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                    document.type
                  )}`}
                >
                  {document.type}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                    document.category
                  )}`}
                >
                  {document.category}
                </span>
                {document.aiGenerated && (
                  <span
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor:
                        theme.mode === "light" ? "#f3e8ff" : "#581c87",
                      color: theme.mode === "light" ? "#7c3aed" : "#c084fc",
                    }}
                  >
                    <Sparkles
                      className="h-3 w-3 mr-1"
                      style={{ color: "inherit" }}
                    />
                    AI Generated
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Document Metadata */}
        <div
          className="flex items-center justify-between text-sm pb-4 border-b"
          style={{
            color: theme.mode === "light" ? "#6b7280" : "#9ca3af",
            borderColor: theme.mode === "light" ? "#e5e7eb" : "#1e293b",
          }}
        >
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar
                className="h-4 w-4"
                style={{
                  color: theme.mode === "light" ? "#6b7280" : "#9ca3af",
                }}
              />
              <span className="text-xs sm:text-sm">
                Created: {formatDateTime(document.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Document Tags */}
        {document.tags.length > 0 && (
          <div className="flex items-start space-x-2">
            <Tag
              className="h-4 w-4 flex-shrink-0 mt-0.5"
              style={{ color: theme.mode === "light" ? "#9ca3af" : "#6b7280" }}
            />
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {document.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor:
                      theme.mode === "light" ? "#f3f4f6" : "#374151",
                    color: theme.mode === "light" ? "#374151" : "#d1d5db",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Document Content */}
        <div
          className="rounded-lg p-4 sm:p-6"
          style={{
            backgroundColor: theme.mode === "light" ? "#f9fafb" : "#0f172a",
          }}
        >
          <h3
            className="text-base sm:text-lg font-medium mb-3 sm:mb-4"
            style={{ color: theme.mode === "light" ? "#111827" : "#ffffff" }}
          >
            Content
          </h3>
          <div className="prose prose-sm max-w-none">
            <div
              className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base"
              style={{ color: theme.mode === "light" ? "#374151" : "#d1d5db" }}
            >
              {document.content}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
