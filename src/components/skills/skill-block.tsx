import Image from "next/image";
import React from "react";
import { Technology } from "@/src/data/skills";
import { cn } from "@/src/lib/utils";

export interface SkillBlockProps {
  technology: Technology;
  highlighted?: boolean;
  onHover?: (name: string | null) => void;
}

export function SkillBlock({
  technology,
  highlighted = false,
  onHover,
}: SkillBlockProps) {
  return (
    <div
      onMouseEnter={() => onHover?.(technology.name)}
      onMouseLeave={() => onHover?.(null)}
      className={cn(
        "group flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all duration-200 select-none",
        highlighted
          ? "border-primary bg-primary/10 shadow-sm shadow-primary/15 -translate-y-0.5"
          : "border-border/80 bg-card/80 hover:border-primary/45 hover:bg-surface/70",
      )}
    >
      <div className="w-7 h-7 rounded-lg bg-surface border border-border/70 flex items-center justify-center shrink-0 p-1">
        <Image
          src={technology.darkIcon ?? technology.icon}
          alt={technology.name}
          width={18}
          height={18}
          className="w-[18px] h-[18px] object-contain dark:hidden"
        />
        <Image
          src={technology.icon}
          alt={technology.name}
          width={18}
          height={18}
          className="w-[18px] h-[18px] object-contain hidden dark:block"
        />
      </div>
      <span
        className={cn(
          "text-xs font-medium transition-colors truncate",
          highlighted
            ? "text-primary"
            : "text-foreground group-hover:text-primary",
        )}
      >
        {technology.name}
      </span>
    </div>
  );
}
