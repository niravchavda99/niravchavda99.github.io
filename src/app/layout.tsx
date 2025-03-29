"use client";

import "../index.scss";
import React, { ReactNode } from "react";
import ScrollToTop from "react-scroll-to-top";
import { BsArrowUp } from "react-icons/bs";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import Head from "next/head";
import { ThemeProvider } from "@/src/components/theme/theme-context";
import { cn } from "@/src/lib/utils";

type RootLayoutProps = { children?: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <Head>
        <title>Nirav Chavda</title>
        <meta name="description" content="Nirav Chavda's Universe" />
        <meta property="og:title" content="Nirav Chavda" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <ThemeProvider>
          <ScrollToTop
            className="flex flex-col items-center justify-center"
            smooth
            style={{ backgroundColor: "#0072ff" }}
            component={<BsArrowUp size={26} color="white" />}
          />
          <Navbar />
          <div
            className={cn(
              "bg-slate-300/30 dark:bg-tertiary-dark",
              "text-center flex flex-col justify-between",
              "backdrop-blur-sm h-max min-h-screen",
            )}
          >
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
