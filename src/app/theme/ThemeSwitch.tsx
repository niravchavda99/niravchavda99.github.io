import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useContext } from "react";
import { Theme, ThemeContext } from "./ThemeContext";

export const ThemeSwitch = () => {
  const { theme, toggle } = useContext(ThemeContext);
  const textColor: string =
    theme === Theme.DARK ? "text-yellow-400" : "text-blue-500";

  return (
    <div
      className={`p-1 pr-4 rounded-full z-20 cursor-pointer text-2xl ${textColor}`}
      onClick={toggle}
    >
      {theme === Theme.DARK ? <MdDarkMode /> : <MdLightMode />}
    </div>
  );
};
