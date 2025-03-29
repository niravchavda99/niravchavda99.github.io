"use client";

import {
  getThemeFromLocalStorage,
  setThemeInLocalStorage,
} from "@/src/lib/local-storage-utils";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { cn } from "@/src/lib/utils";

export enum ThemeMode {
  Light = "Light",
  Dark = "Dark",
}

interface ThemeContextProps {
  mode: ThemeMode;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>(ThemeMode.Light);
  useEffect(() => setTheme(getThemeFromLocalStorage()), []);
  const toggleTheme = () => {
    const updatedTheme =
      theme === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;
    setThemeInLocalStorage(updatedTheme);
    setTheme(updatedTheme);
  };
  return (
    <ThemeContext.Provider value={{ mode: theme, toggle: toggleTheme }}>
      <div
        id="root"
        className={cn(
          theme === ThemeMode.Dark && "dark",
          "transition-all font-inter",
        )}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextProps {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
