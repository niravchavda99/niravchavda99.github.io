import "../index.css";
import React, { ReactNode } from "react";
import { JetBrains_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/src/components/theme/theme-context";
import { Home } from "./home";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nirav Chavda",
  description:
    "Full-stack developer building thoughtful software, from backend services to mobile apps.",
  openGraph: {
    title: "Nirav Chavda",
    description:
      "Full-stack developer building thoughtful software, from backend services to mobile apps.",
    url: "https://niravchavda.in",
    siteName: "Nirav Chavda",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirav Chavda",
    description:
      "Full-stack developer building thoughtful software, from backend services to mobile apps.",
  },
};

type RootLayoutProps = { children?: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ThemeProvider>
          <Home>{children}</Home>
        </ThemeProvider>
      </body>
    </html>
  );
}
