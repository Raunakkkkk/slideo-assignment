import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "./ui/Input";
import { useTheme } from "./ThemeProvider";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search documents...",
  className,
}) => {
  const { theme } = useTheme();

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search
          className="h-5 w-5"
          style={{ color: theme.mode === "light" ? "#64748b" : "#94a3b8" }}
        />
      </div>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-10"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors"
          style={{
            color: theme.mode === "light" ? "#64748b" : "#94a3b8",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color =
              theme.mode === "light" ? "#334155" : "#cbd5e1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color =
              theme.mode === "light" ? "#64748b" : "#94a3b8";
          }}
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};
