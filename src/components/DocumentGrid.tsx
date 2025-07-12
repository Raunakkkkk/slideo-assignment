import React from "react";
import { Document } from "@/types";
import { DocumentCard } from "./DocumentCard";
import { Loader2, FileText } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface DocumentGridProps {
  documents: Document[];
  loading: boolean;
  error: string | null;
  onPreview: (document: Document) => void;
}

export const DocumentGrid: React.FC<DocumentGridProps> = ({
  documents,
  loading,
  error,
  onPreview,
}) => {
  const { theme } = useTheme();
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div
          className="flex items-center space-x-2"
          style={{ color: theme.mode === "light" ? "#64748b" : "#94a3b8" }}
        >
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading documents...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div
            className="mb-2"
            style={{ color: theme.mode === "light" ? "#ef4444" : "#fca5a5" }}
          >
            <FileText className="h-12 w-12 mx-auto" />
          </div>
          <h3
            className="text-lg font-medium mb-2"
            style={{ color: theme.mode === "light" ? "#0f172a" : "#ffffff" }}
          >
            Error loading documents
          </h3>
          <p style={{ color: theme.mode === "light" ? "#64748b" : "#94a3b8" }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div
            className="mb-4"
            style={{ color: theme.mode === "light" ? "#94a3b8" : "#64748b" }}
          >
            <FileText className="h-12 w-12 mx-auto" />
          </div>
          <h3
            className="text-lg font-medium mb-2"
            style={{ color: theme.mode === "light" ? "#0f172a" : "#ffffff" }}
          >
            No documents found
          </h3>
          <p style={{ color: theme.mode === "light" ? "#64748b" : "#94a3b8" }}>
            Create your first document to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 p-3 sm:p-4 lg:p-6">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
};
