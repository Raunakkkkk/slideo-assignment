import { UserPreferences, Theme, Document } from "@/types";
import { clsx, type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
  return clsx(inputs);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getDocumentIcon = (type: string): string => {
  switch (type) {
    case "document":
      return "📄";
    case "slide":
      return "📊";
    case "spreadsheet":
      return "📈";
    default:
      return "📄";
  }
};

export const getCategoryColor = (category: string): string => {
  switch (category) {
    case "business":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "personal":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "academic":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export const getTypeColor = (type: string): string => {
  switch (type) {
    case "document":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "slide":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case "spreadsheet":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

// Local Storage Utilities
export const saveToLocalStorage = (key: string, value: unknown): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  }
  return defaultValue;
};

export const getUserPreferences = (): UserPreferences => {
  return getFromLocalStorage<UserPreferences>("userPreferences", {
    theme: { mode: "light" },
    sidebarCollapsed: false,
  });
};

export const saveUserPreferences = (preferences: UserPreferences): void => {
  saveToLocalStorage("userPreferences", preferences);
};

// Theme Utilities
export const toggleTheme = (currentTheme: Theme): Theme => {
  const newTheme: Theme = {
    mode: currentTheme.mode === "light" ? "dark" : "light",
  };
  return newTheme;
};

// Search and Filter Utilities
export const filterDocuments = (
  documents: Document[],
  searchQuery: string,
  type?: string,
  category?: string,
  dateRange?: { start?: string; end?: string }
): Document[] => {
  return documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesType = !type || doc.type === type;
    const matchesCategory = !category || doc.category === category;

    // Date range filtering
    let matchesDateRange = true;
    if (dateRange?.start || dateRange?.end) {
      const docDate = new Date(doc.createdAt);
      const startDate = dateRange.start ? new Date(dateRange.start) : null;
      const endDate = dateRange.end
        ? new Date(dateRange.end + "T23:59:59")
        : null; // Include the entire end date

      if (startDate && endDate) {
        matchesDateRange = docDate >= startDate && docDate <= endDate;
      } else if (startDate) {
        matchesDateRange = docDate >= startDate;
      } else if (endDate) {
        matchesDateRange = docDate <= endDate;
      }
    }

    return matchesSearch && matchesType && matchesCategory && matchesDateRange;
  });
};
