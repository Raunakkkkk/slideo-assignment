import React from "react";
import { Filter, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";
import { FilterOptions } from "@/types";
import { useTheme } from "@/components/ThemeProvider";

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onClose?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange,
  isCollapsed,
  onToggleCollapse,
  onClose,
}) => {
  const { theme } = useTheme();
  const handleTypeChange = (type: string) => {
    onFiltersChange({
      ...filters,
      type:
        type === "all"
          ? undefined
          : (type as "document" | "slide" | "spreadsheet"),
    });
  };

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category:
        category === "all"
          ? undefined
          : (category as "business" | "personal" | "academic"),
    });
  };

  const handleDateRangeChange = (field: "start" | "end", value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value,
      },
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      type: undefined,
      category: undefined,
      dateRange: { start: "", end: "" },
    });
  };

  const hasActiveFilters =
    filters.type ||
    filters.category ||
    filters.dateRange?.start ||
    filters.dateRange?.end;

  return (
    <div
      className={`border-r transition-all duration-300 flex-shrink-0 h-full overflow-y-auto relative bg-white dark:bg-black
        ${
          isCollapsed
            ? "w-16 max-w-[4rem]"
            : "w-full max-w-xs lg:max-w-none lg:w-64"
        }
      `}
      style={{
        backgroundColor: theme.mode === "light" ? "#ffffff" : "#000000",
        borderColor: theme.mode === "light" ? "#e2e8f0" : "#1e293b",
        boxShadow:
          theme.mode === "light"
            ? "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
            : "2px 0 4px -2px rgba(255, 255, 255, 0.15)",
      }}
    >
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 block lg:hidden"
          style={{ color: theme.mode === "light" ? "#0f172a" : "#ffffff" }}
        >
          <X className="h-5 w-5" />
        </Button>
      )}
      <div className="p-4 pt-12 lg:pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {!isCollapsed && (
              <>
                <Filter
                  className="h-5 w-5"
                  style={{
                    color: theme.mode === "light" ? "#334155" : "#94a3b8",
                  }}
                />
                <h3
                  className="font-semibold"
                  style={{
                    color: theme.mode === "light" ? "#0f172a" : "#ffffff",
                  }}
                >
                  Filters
                </h3>
              </>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-8 w-8 hidden lg:flex"
            style={{
              color: theme.mode === "light" ? "#0f172a" : "#ffffff",
            }}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {!isCollapsed ? (
          <>
            <div className="space-y-4">
              {/* Document Type Filter */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: theme.mode === "light" ? "#334155" : "#cbd5e1",
                  }}
                >
                  Document Type
                </label>
                <Select
                  value={filters.type || "all"}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  className="w-full"
                >
                  <option value="all">All Types</option>
                  <option value="document">Document</option>
                  <option value="slide">Slide</option>
                  <option value="spreadsheet">Spreadsheet</option>
                </Select>
              </div>

              {/* Category Filter */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: theme.mode === "light" ? "#334155" : "#cbd5e1",
                  }}
                >
                  Category
                </label>
                <Select
                  value={filters.category || "all"}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full"
                >
                  <option value="all">All Categories</option>
                  <option value="business">Business</option>
                  <option value="personal">Personal</option>
                  <option value="academic">Academic</option>
                </Select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: theme.mode === "light" ? "#334155" : "#cbd5e1",
                  }}
                >
                  Date Range
                </label>
                <div className="space-y-2">
                  <div>
                    <label
                      className="block text-xs mb-1"
                      style={{
                        color: theme.mode === "light" ? "#64748b" : "#94a3b8",
                      }}
                    >
                      From
                    </label>
                    <input
                      type="date"
                      value={filters.dateRange?.start || ""}
                      onChange={(e) =>
                        handleDateRangeChange("start", e.target.value)
                      }
                      max={filters.dateRange?.end || undefined}
                      className="w-full px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      style={{
                        backgroundColor:
                          theme.mode === "light" ? "#ffffff" : "#000000",
                        color: theme.mode === "light" ? "#0f172a" : "#ffffff",
                        border: `1px solid ${
                          theme.mode === "light" ? "#cbd5e1" : "#334155"
                        }`,
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs mb-1"
                      style={{
                        color: theme.mode === "light" ? "#64748b" : "#94a3b8",
                      }}
                    >
                      To
                    </label>
                    <input
                      type="date"
                      value={filters.dateRange?.end || ""}
                      onChange={(e) =>
                        handleDateRangeChange("end", e.target.value)
                      }
                      min={filters.dateRange?.start || undefined}
                      className="w-full px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      style={{
                        backgroundColor:
                          theme.mode === "light" ? "#ffffff" : "#000000",
                        color: theme.mode === "light" ? "#0f172a" : "#ffffff",
                        border: `1px solid ${
                          theme.mode === "light" ? "#cbd5e1" : "#334155"
                        }`,
                      }}
                    />
                  </div>
                  {/* Quick Date Presets */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const today = new Date();
                        const weekAgo = new Date(
                          today.getTime() - 7 * 24 * 60 * 60 * 1000
                        );
                        onFiltersChange({
                          ...filters,
                          dateRange: {
                            start: weekAgo.toISOString().split("T")[0],
                            end: today.toISOString().split("T")[0],
                          },
                        });
                      }}
                      className="px-2 py-1 text-xs rounded transition-colors"
                      style={{
                        backgroundColor:
                          theme.mode === "light" ? "#dbeafe" : "#1e3a8a",
                        color: theme.mode === "light" ? "#1d4ed8" : "#93c5fd",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          theme.mode === "light" ? "#bfdbfe" : "#1e40af";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          theme.mode === "light" ? "#dbeafe" : "#1e3a8a";
                      }}
                    >
                      Last 7 days
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const today = new Date();
                        const monthAgo = new Date(
                          today.getTime() - 30 * 24 * 60 * 60 * 1000
                        );
                        onFiltersChange({
                          ...filters,
                          dateRange: {
                            start: monthAgo.toISOString().split("T")[0],
                            end: today.toISOString().split("T")[0],
                          },
                        });
                      }}
                      className="px-2 py-1 text-xs rounded transition-colors"
                      style={{
                        backgroundColor:
                          theme.mode === "light" ? "#dbeafe" : "#1e3a8a",
                        color: theme.mode === "light" ? "#1d4ed8" : "#93c5fd",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          theme.mode === "light" ? "#bfdbfe" : "#1e40af";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          theme.mode === "light" ? "#dbeafe" : "#1e3a8a";
                      }}
                    >
                      Last 30 days
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const today = new Date();
                        const yearAgo = new Date(
                          today.getTime() - 365 * 24 * 60 * 60 * 1000
                        );
                        onFiltersChange({
                          ...filters,
                          dateRange: {
                            start: yearAgo.toISOString().split("T")[0],
                            end: today.toISOString().split("T")[0],
                          },
                        });
                      }}
                      className="px-2 py-1 text-xs rounded transition-colors"
                      style={{
                        backgroundColor:
                          theme.mode === "light" ? "#dbeafe" : "#1e3a8a",
                        color: theme.mode === "light" ? "#1d4ed8" : "#93c5fd",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          theme.mode === "light" ? "#bfdbfe" : "#1e40af";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          theme.mode === "light" ? "#dbeafe" : "#1e3a8a";
                      }}
                    >
                      Last year
                    </button>
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                  style={{
                    color: theme.mode === "light" ? "#64748b" : "#94a3b8",
                    borderColor: theme.mode === "light" ? "#cbd5e1" : "#334155",
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-4 group">
            <Filter
              className="h-5 w-5"
              style={{
                color: theme.mode === "light" ? "#334155" : "#94a3b8",
              }}
            />
            <div
              className="text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ color: theme.mode === "light" ? "#64748b" : "#94a3b8" }}
            >
              Filters
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
