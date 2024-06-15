"use client";

import React, { ReactNode, useState } from "react";
import "../index.scss";
import ScrollToTop from "react-scroll-to-top";
import { BsArrowUp } from "react-icons/bs";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Theme, ThemeContext } from "../components/theme/ThemeContext";
import "./App.scss";
import Head from "next/head";

type RootLayoutProps = { children?: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  const [theme, setTheme] = useState<Theme>(getThemeFromLocalStorage());
  const toggleTheme = () => {
    const updatedTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setThemeInLocalStorage(updatedTheme);
    setTheme(updatedTheme);
  };
  const themeSuffix = theme === Theme.DARK ? "-dark" : "-light";
  return (
    <html lang="en">
      <Head>
        <title>Nirav Chavda</title>
        <meta name="description" content="Nirav Chavda's Universe" />
        <meta property="og:title" content="Nirav Chavda" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <div id="root">
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
              {children}
              <Footer />
            </div>
          </ThemeContext.Provider>
        </div>
      </body>
    </html>
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
