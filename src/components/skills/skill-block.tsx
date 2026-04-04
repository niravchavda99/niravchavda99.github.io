import Image from "next/image";
import React from "react";
import { Technology } from "./constants";

export interface SkillBlockProps {
  technology: Technology;
}

export function SkillBlock({ technology }: SkillBlockProps) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-default select-none">
      <div className="relative">
        <div className="absolute inset-0 rounded-xl bg-cyan-400/0 group-hover:bg-cyan-400/10 blur-md transition-all duration-300" />
        <div className="relative w-14 h-14 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 group-hover:border-cyan-400/50 group-hover:shadow-lg group-hover:shadow-cyan-400/10 group-hover:-translate-y-0.5 transition-all duration-300">
          {/* Light mode icon */}
          <Image
            src={technology.darkIcon ?? technology.icon}
            alt={technology.name}
            width={34}
            height={34}
            className="w-[34px] h-[34px] object-contain dark:hidden"
          />
          {/* Dark mode icon */}
          <Image
            src={technology.icon}
            alt={technology.name}
            width={34}
            height={34}
            className="w-[34px] h-[34px] object-contain hidden dark:block"
          />
        </div>
      </div>
      <span className="text-[11px] text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 font-mono text-center leading-tight max-w-[70px]">
        {technology.name}
      </span>
    </div>
  );
}
