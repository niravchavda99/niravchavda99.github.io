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
      className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface transition-colors duration-200"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
};
