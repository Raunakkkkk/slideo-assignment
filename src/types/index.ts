export interface Document {
  id: string;
  title: string;
  content: string;
  type: "document" | "slide" | "spreadsheet";
  category: "business" | "personal" | "academic";
  tags: string[];
  createdAt: string;
  updatedAt: string;
  aiGenerated: boolean;
}

export interface CreateDocumentRequest {
  title: string;
  type: "document" | "slide" | "spreadsheet";
  category: "business" | "personal" | "academic";
  prompt: string;
}

export interface FilterOptions {
  type?: string;
  category?: string;
  dateRange?: {
    start?: string;
    end?: string;
  };
}

export interface Theme {
  mode: "light" | "dark";
}

export interface UserPreferences {
  theme: Theme;
  sidebarCollapsed: boolean;
}
