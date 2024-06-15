import {Outlet} from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import "./App.scss";
import Footer from "./footer/Footer";
import React, {useState} from "react";
import {BsArrowUp} from "react-icons/bs";
import Navbar from "./navbar/Navbar";
import {Theme} from "./theme/ThemeSwitch";

function App() {
    const [currentTheme, setCurrentTheme] = useState<Theme>(Theme.DARK);

    const toggleTheme = () => {
        setCurrentTheme(currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
    }

    const themeSuffix = currentTheme === Theme.DARK ? '-dark' : '-light';

    return (
        <>
            <ScrollToTop
                className={"flex flex-col items-center justify-center"}
                smooth
                style={{backgroundColor: "#0284C7"}}
                component={<BsArrowUp size={26} color={'white'}/>}
            />
            <Navbar currentTheme={currentTheme} toggleTheme={toggleTheme} className={`theme${themeSuffix}`}/>
            <div className={`App transition-all bg${themeSuffix} theme${themeSuffix}`}>
                <Outlet/>
                <Footer/>
            </div>
        </>
    );
}

export default App;
