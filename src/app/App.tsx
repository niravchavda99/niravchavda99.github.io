import { Outlet } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import "./App.scss";
import Footer from "./footer/Footer";
import React, { useState } from "react";
import { BsArrowUp } from "react-icons/bs";
import Navbar from "./navbar/Navbar";
import { Theme, ThemeContext } from "./theme/ThemeContext";

function App() {
  const [theme, setTheme] = useState<Theme>(getThemeFromLocalStorage());
  const toggleTheme = () => {
    const updatedTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setThemeInLocalStorage(updatedTheme);
    setTheme(updatedTheme);
  };
  const themeSuffix = theme === Theme.DARK ? "-dark" : "-light";
  return (
    <ThemeContext.Provider value={{ theme: theme, toggle: toggleTheme }}>
      <ScrollToTop
        className="flex flex-col items-center justify-center"
        smooth
        style={{ backgroundColor: "#0284C7" }}
        component={<BsArrowUp size={26} color="white" />}
      />
      <Navbar className={`theme${themeSuffix}`} />
      <div
        className={`App transition-all bg${themeSuffix} theme${themeSuffix}`}
      >
        <Outlet />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

function getThemeFromLocalStorage(): Theme {
  const themeFromStorage = localStorage.getItem("theme");
  if (!themeFromStorage) {
    return Theme.DARK;
  }
  return themeFromStorage === "LIGHT" ? Theme.LIGHT : Theme.DARK;
}

function setThemeInLocalStorage(theme: Theme): void {
  localStorage.setItem("theme", theme);
}

export default App;
