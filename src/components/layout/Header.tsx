import React from "react";
import { SearchBar } from "../SearchBar";
import { Button } from "../ui/Button";
import { useTheme } from "../ThemeProvider";
import { Sun, Moon, Plus, Menu } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCreateDocument: () => void;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onCreateDocument,
  onToggleSidebar,
}) => {
  const { theme, switchTheme, mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <header
      className="border-b px-3 sm:px-4 py-3 transition-colors duration-200"
      style={{
        backgroundColor: theme.mode === "light" ? "#ffffff" : "#000000",
        color: theme.mode === "light" ? "#0f172a" : "#ffffff",
        borderColor: theme.mode === "light" ? "#e2e8f0" : "#1e293b",
        boxShadow:
          theme.mode === "light"
            ? "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
            : "0 1px 3px 0 rgba(255, 255, 255, 0.15)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="flex lg:hidden"
            style={{
              color: theme.mode === "light" ? "#0f172a" : "#ffffff",
            }}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">D</span>
            </div>
            <h1
              className="text-lg sm:text-xl font-bold truncate"
              style={{ color: theme.mode === "light" ? "#0f172a" : "#ffffff" }}
            >
              Document Hub
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden md:block w-80">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search documents..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={switchTheme}
              className="h-8 w-8 sm:h-9 sm:w-9"
              title={`Switch to ${
                theme.mode === "light" ? "dark" : "light"
              } mode`}
              style={{
                color: theme.mode === "light" ? "#0f172a" : "#ffffff",
              }}
            >
              {theme.mode === "light" ? (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>

            <Button
              onClick={onCreateDocument}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create Document</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden mt-3">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search documents..."
        />
      </div>
    </header>
  );
};
