import { ThemeMode } from "@/src/components/theme/theme-context";

export function getThemeFromLocalStorage(): ThemeMode {
  const themeFromStorage = localStorage?.getItem("theme");
  if (!themeFromStorage) {
    return ThemeMode.Light;
  }
  return themeFromStorage as ThemeMode;
}

export function setThemeInLocalStorage(theme: ThemeMode): void {
  localStorage?.setItem("theme", theme);
}
