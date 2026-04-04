"use client";

import nextjsDark from "@/src/assets/icons/tech/nextjs-dark.svg";
import nextjsLight from "@/src/assets/icons/tech/nextjs-light.svg";
import tailwind from "@/src/assets/icons/tech/tailwind.png";
import Image from "next/image";
import { ThemeMode, useTheme } from "@/src/components/theme/theme-context";

const Footer = () => {
  const { mode } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/60 dark:border-slate-800/60 mt-8">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Made with <span className="text-red-400">♥</span> by{" "}
          <a
            href="https://niravchavda.in"
            className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium"
          >
            Nirav Chavda
          </a>{" "}
          <span className="text-slate-300 dark:text-slate-600">·</span>{" "}
          <span className="font-mono text-xs">© {year}</span>
        </p>

        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-600">
          <span className="font-mono text-xs">built with</span>
          <Image
            width={16}
            height={16}
            src={mode === ThemeMode.Dark ? nextjsLight.src : nextjsDark.src}
            alt="Next.js"
            className="object-contain opacity-60"
          />
          <span className="font-mono text-xs">+</span>
          <Image
            src={tailwind.src}
            alt="Tailwind CSS"
            className="object-contain opacity-60"
            width={16}
            height={16}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
