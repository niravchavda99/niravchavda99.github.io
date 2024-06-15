import {MdDarkMode, MdLightMode} from "react-icons/md";

export enum Theme {
    LIGHT = "LIGHT", DARK = "DARK"
}

export interface ThemeProps {
    currentTheme: Theme;
    toggleTheme: Function;
}

// TODO: Make this use context API instead of props drilling
export const ThemeSwitch = ({currentTheme, toggleTheme}: ThemeProps) => {
    const textColor: string = currentTheme === Theme.DARK ? 'text-yellow-400' : 'text-blue-500';

    return (
        <div
            className={`p-1 pr-4 rounded-full z-20 cursor-pointer text-2xl ${textColor}`}
            onClick={() => toggleTheme()}
        >
            {currentTheme === Theme.DARK ? <MdDarkMode/> : <MdLightMode/>}
        </div>
    );
}