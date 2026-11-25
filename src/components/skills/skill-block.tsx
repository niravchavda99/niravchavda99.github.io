import Image from "next/image";
import React from "react";
import { Technology } from "@/src/data/skills";

export interface SkillBlockProps {
  technology: Technology;
}

export function SkillBlock({ technology }: SkillBlockProps) {
  return (
    <div className="anime-skill-pill inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-border bg-card hover:bg-surface transition-colors select-none">
      <Image
        src={technology.darkIcon ?? technology.icon}
        alt={technology.name}
        width={18}
        height={18}
        className="w-[18px] h-[18px] object-contain dark:hidden shrink-0"
      />
      <Image
        src={technology.icon}
        alt={technology.name}
        width={18}
        height={18}
        className="w-[18px] h-[18px] object-contain hidden dark:block shrink-0"
      />
      <span className="text-sm font-medium text-foreground whitespace-nowrap">
        {technology.name}
      </span>
    </div>
  );
}
