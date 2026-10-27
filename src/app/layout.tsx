import "@fontsource-variable/manrope";
import "@fontsource-variable/space-grotesk";
import "../index.css";
import "../motion.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/src/components/studio/site-shell";
import { ReadingProgress } from "@/src/components/studio/reading-progress";

export const metadata: Metadata = {
  metadataBase: new URL("https://niravchavda.in"),
  alternates: { canonical: "/" },
  title: {
    default: "Nirav Chavda — Software, thoughtfully crafted.",
    template: "%s | Nirav Chavda",
  },
  description:
    "Tech Lead at Incubyte. I build thoughtful web apps, developer tools, and dependable systems. Explore my work and the thinking behind it.",
  openGraph: {
    title: "Nirav Chavda — Software, thoughtfully crafted.",
    description:
      "A software craftsperson’s collection of useful tools, thoughtful interfaces, and experiments.",
    type: "website",
    url: "https://niravchavda.in",
  },
  twitter: { card: "summary", creator: "@niravchavda99" },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ReadingProgress />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
