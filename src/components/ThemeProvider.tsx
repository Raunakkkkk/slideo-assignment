"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme } from "@/types";
import { getUserPreferences, saveUserPreferences } from "@/utils";

interface ThemeContextType {
  theme: Theme;
  switchTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>({ mode: "light" });
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const preferences = getUserPreferences();
    setTheme(preferences.theme);
    setMounted(true);
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      if (theme.mode === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
      }
    }
  }, [theme, mounted]);

  const switchTheme = () => {
    const newTheme = {
      mode: theme.mode === "light" ? "dark" : "light",
    };
    setTheme(newTheme);

    const preferences = getUserPreferences();
    preferences.theme = newTheme;
    saveUserPreferences(preferences);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};
