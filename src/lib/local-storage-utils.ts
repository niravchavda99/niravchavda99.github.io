import { ThemeMode } from "@/src/components/theme/ThemeContext";

export function getThemeFromLocalStorage(): ThemeMode {
  const themeFromStorage = localStorage?.getItem("theme");
  if (!themeFromStorage) {
    return ThemeMode.Dark;
  }
  return themeFromStorage === ThemeMode.Light
    ? ThemeMode.Light
    : ThemeMode.Dark;
}

export function setThemeInLocalStorage(theme: ThemeMode): void {
  localStorage?.setItem("theme", theme);
}
