"use client";

import { Context, createContext } from "react";

export enum ThemeMode {
  Light = "Light",
  Dark = "Dark",
}

interface ThemeContextProps {
  mode: ThemeMode;
  toggle: () => void;
}

export const ThemeContext: Context<ThemeContextProps> =
  createContext<ThemeContextProps>({
    mode: ThemeMode.Dark,
    toggle: () => {},
  });
