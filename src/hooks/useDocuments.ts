import { useState, useEffect } from "react";
import { Document, CreateDocumentRequest } from "@/types";

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async () => {
    try {
      setLoading(true);

      // Try the test API first
      console.log("Testing API connection...");
      const testResponse = await fetch("/api/test");
      console.log("Test API response:", testResponse.status);

      console.log("Fetching documents from /api/data");
      const response = await fetch("/api/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error(`Failed to fetch documents: ${response.status}`);
      }
      const data = await response.json();
      console.log("Documents fetched:", data);
      setDocuments(data);
    } catch (err) {
      console.error("Error fetching documents:", err);
      // Fallback to mock data if API fails
      console.log("Using fallback mock data");
      const mockData: Document[] = [
        {
          id: "1",
          title: "Marketing Strategy Q1 2025",
          content:
            "This comprehensive marketing strategy outlines our approach for Q1 2025, focusing on digital transformation, customer engagement, and market expansion.",
          type: "document" as const,
          category: "business" as const,
          tags: ["marketing", "strategy", "Q1"],
          createdAt: "2025-01-15T10:30:00Z",
          updatedAt: "2025-01-15T10:30:00Z",
          aiGenerated: true,
        },
        {
          id: "2",
          title: "Financial Budget Analysis",
          content:
            "Detailed financial analysis including revenue projections, expense tracking, and budget allocation across departments.",
          type: "spreadsheet" as const,
          category: "business" as const,
          tags: ["finance", "budget", "analysis"],
          createdAt: "2025-01-14T14:20:00Z",
          updatedAt: "2025-01-14T14:20:00Z",
          aiGenerated: false,
        },
      ];
      setDocuments(mockData);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const createDocument = async (documentData: CreateDocumentRequest) => {
    try {
      setLoading(true);
      const response = await fetch("/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(documentData),
      });

      if (!response.ok) {
        throw new Error("Failed to create document");
      }

      const newDocument = await response.json();
      setDocuments((prev) => [newDocument, ...prev]);
      return newDocument;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    createDocument,
  };
};
