import {MdDarkMode, MdLightMode} from "react-icons/md";
import {setToStorage} from "../Utils";

type DarkModeToggleProps = {
  darkMode: boolean,
  toggleDarkMode: Function
}

const DarkModeToggle = ({darkMode, toggleDarkMode}: DarkModeToggleProps) => {
  const iconSize = 28;

  return (
      <div className="flex flex-col justify-center p-2">
        <button onClick={() => {
          setToStorage(!darkMode);
          return toggleDarkMode(!darkMode);
        }}>
          {darkMode ? <MdLightMode size={iconSize} className={"text-yellow-400 p-0.5"}/>
              : <MdDarkMode size={iconSize} className={"text-violet-500 p-0.5"}/>}
        </button>
      </div>
  );
};

export default DarkModeToggle;