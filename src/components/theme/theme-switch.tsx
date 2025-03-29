import { ThemeMode, useTheme } from "./theme-context";
import { Moon, Sun } from "lucide-react";

export const ThemeSwitch = () => {
  const { mode, toggle } = useTheme();
  return (
    <div
      className={`p-1 pr-4 rounded-full z-20 cursor-pointer text-2xl text-blue-500 dark:text-yellow-400`}
      onClick={toggle}
    >
      {mode === ThemeMode.Dark ? <Moon /> : <Sun />}
    </div>
  );
};
