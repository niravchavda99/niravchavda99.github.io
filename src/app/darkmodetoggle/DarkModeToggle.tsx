import {MdDarkMode, MdLightMode} from "react-icons/md";

type DarkModeToggleProps = {
  darkMode: boolean,
  toggleDarkMode: Function
}

const DarkModeToggle = ({darkMode, toggleDarkMode}: DarkModeToggleProps) => {
  const iconSize = 28;

  return (
      <div className="flex flex-col justify-center p-2">
        <button onClick={() => toggleDarkMode(!darkMode)}>
          {darkMode ? <MdDarkMode size={iconSize} className={"text-yellow-300 p-0.5"}/>
              : <MdLightMode size={iconSize} className={"text-violet-500 p-0.5"}/>}
        </button>
      </div>
  );
};

export default DarkModeToggle;