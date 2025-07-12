export interface Document {
  id: string;
  title: string;
  type: "document" | "slide" | "spreadsheet";
  category: "business" | "personal" | "academic";
  content: string;
  createdAt: string;
  aiGenerated: boolean;
  tags: string[];
}

export interface CreateDocumentRequest {
  title: string;
  type: "document" | "slide" | "spreadsheet";
  category: "business" | "personal" | "academic";
  prompt: string;
}

export interface FilterOptions {
  searchQuery?: string;
  type?: "document" | "slide" | "spreadsheet";
  category?: "business" | "personal" | "academic";
  dateRange?: {
    start?: string;
    end?: string;
  };
}

export interface UserPreferences {
  theme: Theme;
  sidebarCollapsed: boolean;
}

export interface Theme {
  mode: "light" | "dark";
}

export interface DateRange {
  start?: string;
  end?: string;
}
