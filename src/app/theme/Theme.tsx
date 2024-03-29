import {MdDarkMode, MdLightMode} from "react-icons/md";
import {ThemeDto} from "./ThemeDto";

export interface ThemeProps {
    currentTheme: ThemeDto;
    toggleTheme: Function;
}

export const Theme = ({currentTheme, toggleTheme}: ThemeProps) => {
    const textColor: string = currentTheme.isDark ? 'text-yellow-400' : 'text-blue-500';

    return (
        <div
            className={`p-1 pr-4 rounded-full z-20 cursor-pointer text-2xl ${textColor}`}
            onClick={() => toggleTheme()}
        >
            {currentTheme.isLight ? <MdLightMode/> : <MdDarkMode/>}
        </div>
    );
}