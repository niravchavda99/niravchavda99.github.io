import { Context, createContext } from "react";

export enum Theme {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

interface ThemeContextProps {
  theme: Theme;
  toggle: () => void;
}

export const ThemeContext: Context<ThemeContextProps> =
  createContext<ThemeContextProps>({
    theme: Theme.DARK,
    toggle: () => {},
  });
