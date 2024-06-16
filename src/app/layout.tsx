"use client";

import React, { ReactNode, useEffect, useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import { BsArrowUp } from "react-icons/bs";
import Navbar from "@/src/components/navbar/Navbar";
import Footer from "@/src/components/footer/Footer";
import Head from "next/head";
import {
  ThemeColor,
  ThemeContext,
  ThemeMode,
} from "@/src/components/theme/ThemeContext";
import "../index.scss";
import "./App.scss";
import { cn } from "@/src/lib/utils";

type RootLayoutProps = { children?: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.Dark);
  useEffect(() => {
    setThemeMode(getThemeFromLocalStorage());
    const link = document.createElement("link");
  }, []);
  const toggleTheme = () => {
    const updatedTheme =
      themeMode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;
    setThemeInLocalStorage(updatedTheme);
    setThemeMode(updatedTheme);
  };
  const themeSuffix = themeMode === ThemeMode.Dark ? "dark" : "light";
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
          <ThemeContext.Provider
            value={{
              mode: themeMode,
              color: ThemeColor.Blue,
              toggle: toggleTheme,
            }}
          >
            <ScrollToTop
              className="flex flex-col items-center justify-center"
              smooth
              style={{ backgroundColor: "#0284C7" }}
              component={<BsArrowUp size={26} color="white" />}
            />
            <Navbar className={`theme-mode-${themeSuffix}`} />
            <div
              className={cn(
                "App transition-all",
                `bg-${themeSuffix}`,
                `theme-mode-${themeSuffix}`,
              )}
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

function getThemeFromLocalStorage(): ThemeMode {
  const themeFromStorage = localStorage?.getItem("theme");
  if (!themeFromStorage) {
    return ThemeMode.Dark;
  }
  return themeFromStorage === ThemeMode.Light
    ? ThemeMode.Light
    : ThemeMode.Dark;
}

function setThemeInLocalStorage(theme: ThemeMode): void {
  localStorage?.setItem("theme", theme);
}
