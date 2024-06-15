import { ReactNode } from "react";
import { Metadata } from "next";
import "../index.scss";

type RootLayoutProps = { children?: ReactNode };

export const metadata: Metadata = {
  title: "Nirav Chavda",
  description: "Nirav Chavda's Universe",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
