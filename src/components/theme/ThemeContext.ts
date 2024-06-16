"use client";

import { Context, createContext } from "react";

export enum ThemeMode {
  Light = "Light",
  Dark = "Dark",
}

export enum ThemeColor {
  Red,
  Blue,
  Green,
}

interface ThemeContextProps {
  mode: ThemeMode;
  color: ThemeColor;
  toggle: () => void;
}

export const ThemeContext: Context<ThemeContextProps> =
  createContext<ThemeContextProps>({
    mode: ThemeMode.Dark,
    color: ThemeColor.Blue,
    toggle: () => {},
  });
