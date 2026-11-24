"use client";

import { ThemeMode, useTheme } from "./theme-context";
import { Moon, Sun } from "lucide-react";

export const ThemeSwitch = () => {
  const { mode, toggle } = useTheme();
  const isDark = mode === ThemeMode.Dark;

  return (
    <button
      onClick={toggle}
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="h-8 w-8 rounded-md flex items-center justify-center border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors duration-150"
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
};
