import {MdDarkMode, MdLightMode} from "react-icons/md";
import {setToStorage} from "../Utils";
import ThemeProps from "../common/ThemeProps";

const DarkModeToggle = ({theme, toggleTheme}: ThemeProps) => {
  const iconSize = 28;

  return (
      <div className="flex flex-col justify-center p-2">
        <button onClick={() => {
          const newTheme = theme === 'light' ? 'dark' : 'light';
          setToStorage(newTheme);
          return toggleTheme(newTheme);
        }}>
          {theme === 'dark' ? <MdLightMode size={iconSize} className={"text-yellow-400 p-0.5"}/>
              : <MdDarkMode size={iconSize} className={"text-violet-500 p-0.5"}/>}
        </button>
      </div>
  );
};

export default DarkModeToggle;