"use client";

import "../index.scss";
import React, { ReactNode } from "react";
import Head from "next/head";
import { ThemeProvider } from "@/src/components/theme/theme-context";
import { Home } from "./home";

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
          <Home>{children}</Home>
        </ThemeProvider>
      </body>
    </html>
  );
}
