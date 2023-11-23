import {Outlet} from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import "./App.scss";
import Footer from "./footer/Footer";
import React, {useState} from "react";
import {BsArrowUp} from "react-icons/bs";
import {Theme} from "./theme/Theme";
import {ThemeDto} from "./theme/ThemeDto";
import Navbar from "./navbar/Navbar";

function App() {
    const [currentTheme, setCurrentTheme] = useState<ThemeDto>(ThemeDto.dark());

    const toggleTheme = () => {
        setCurrentTheme(currentTheme.isDark ? ThemeDto.light() : ThemeDto.dark());
    }

    const themeSuffix = currentTheme.isDark ? '-dark' : '-light';

    return (
        <>
            <Theme currentTheme={currentTheme} toggleTheme={toggleTheme}/>
            <ScrollToTop
                className={"flex flex-col items-center justify-center"}
                smooth
                style={{backgroundColor: "#0284C7"}}
                component={<BsArrowUp size={26} color={'white'}/>}
            />
            <Navbar className={`theme${themeSuffix}`} />
            <div className={`App transition-all bg${themeSuffix} theme${themeSuffix}`}>
                <Outlet/>
                <Footer/>
            </div>
        </>
    );
}

export default App;
