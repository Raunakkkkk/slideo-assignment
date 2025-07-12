"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { FilterSidebar } from "@/components/FilterSidebar";
import { DocumentGrid } from "@/components/DocumentGrid";
import { CreateDocumentModal } from "@/components/forms/CreateDocumentModal";
import { DocumentPreviewModal } from "@/components/DocumentPreviewModal";
import { useDocuments } from "@/hooks/useDocuments";
import { useTheme } from "@/components/ThemeProvider";
import { Document, FilterOptions, CreateDocumentRequest } from "@/types";
import {
  filterDocuments,
  getUserPreferences,
  saveUserPreferences,
} from "@/utils";

export default function Dashboard() {
  const { documents, loading, error, createDocument } = useDocuments();
  const { theme } = useTheme();

  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Load user preferences
  useEffect(() => {
    const preferences = getUserPreferences();
    setSidebarCollapsed(preferences.sidebarCollapsed);
  }, []);

  // Save sidebar state to preferences
  useEffect(() => {
    const preferences = getUserPreferences();
    preferences.sidebarCollapsed = sidebarCollapsed;
    saveUserPreferences(preferences);
  }, [sidebarCollapsed]);

  // Filter documents based on search and filters
  const filteredDocuments = filterDocuments(
    documents,
    searchQuery,
    filters.type,
    filters.category,
    filters.dateRange
  );

  // Handle document creation
  const handleCreateDocument = async (data: CreateDocumentRequest) => {
    try {
      setCreateLoading(true);
      await createDocument(data);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Failed to create document:", error);
    } finally {
      setCreateLoading(false);
    }
  };

  // Handle document preview
  const handlePreviewDocument = (document: Document) => {
    setPreviewDocument(document);
    setShowPreviewModal(true);
  };

  // Handle sidebar toggle
  const handleToggleSidebar = () => {
    // On mobile, open drawer; on desktop, toggle collapse
    if (window.innerWidth < 1024) {
      setMobileSidebarOpen(true);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  // Handle window resize to update sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle mobile sidebar close with better UX
  const handleMobileSidebarClose = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div
      className="min-h-screen h-screen sm:h-auto overflow-x-hidden"
      style={{
        backgroundColor: theme.mode === "light" ? "#f8fafc" : "#000000",
      }}
    >
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCreateDocument={() => setShowCreateModal(true)}
        onToggleSidebar={handleToggleSidebar}
      />

      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Desktop Sidebar */}
        <div
          className={`${
            sidebarCollapsed ? "lg:w-16" : "lg:w-64"
          } hidden lg:block h-full transition-all duration-300`}
        >
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>
        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="w-80 max-w-[85vw] h-full bg-white dark:bg-black shadow-xl transform transition-transform duration-300 ease-in-out">
              <FilterSidebar
                filters={filters}
                onFiltersChange={setFilters}
                isCollapsed={false}
                onToggleCollapse={handleMobileSidebarClose}
                onClose={handleMobileSidebarClose}
              />
            </div>
            <div
              className="flex-1 bg-black/50 backdrop-blur-sm"
              onClick={handleMobileSidebarClose}
            />
          </div>
        )}
        {/* Main Content */}
        <main
          className={`flex-1 overflow-auto transition-all duration-300 transition-colors duration-200`}
          style={{
            backgroundColor: theme.mode === "light" ? "#f8fafc" : "#000000",
          }}
        >
          <DocumentGrid
            documents={filteredDocuments}
            loading={loading}
            error={error}
            onPreview={handlePreviewDocument}
          />
        </main>
      </div>

      {/* Create Document Modal */}
      <CreateDocumentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateDocument}
        loading={createLoading}
      />

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        document={previewDocument}
        isOpen={showPreviewModal}
        onClose={() => {
          setShowPreviewModal(false);
          setPreviewDocument(null);
        }}
      />
    </div>
  );
}
