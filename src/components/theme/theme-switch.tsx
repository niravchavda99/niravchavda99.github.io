"use client";

import { ThemeMode, useTheme } from "./theme-context";
import { Moon, Sun } from "lucide-react";

export const ThemeSwitch = () => {
  const { mode, toggle } = useTheme();
  const isDark = mode === ThemeMode.Dark;

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-9 h-9 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 hover:border-cyan-400/50 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all duration-200 text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
};
