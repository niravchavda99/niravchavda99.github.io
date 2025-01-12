import { useContext } from "react";
import { ThemeContext, ThemeMode } from "./theme-context";
import { Moon, Sun } from "lucide-react";

export const ThemeSwitch = () => {
  const { mode, toggle } = useContext(ThemeContext);
  const textColor =
    mode === ThemeMode.Dark ? "text-yellow-400" : "text-blue-500";
  return (
    <div
      className={`p-1 pr-4 rounded-full z-20 cursor-pointer text-2xl ${textColor}`}
      onClick={toggle}
    >
      {mode === ThemeMode.Dark ? <Moon /> : <Sun />}
    </div>
  );
};
