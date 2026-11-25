import Image from "next/image";
import React from "react";
import { SkillCategory, Technology } from "@/src/data/skills";
import { cn } from "@/src/lib/utils";

export const DOMAIN_SIGNAL: Record<SkillCategory, string> = {
  Backend: "#FF4B4B",
  Frontend: "#FFC730",
  Tools: "#C084FC",
  Cloud: "#38BDF8",
  Database: "#5CE68A",
  Mobile: "#FB923C",
};

export interface SkillBlockProps {
  technology: Technology;
  dimmed?: boolean;
  highlighted?: boolean;
  onTriggerWave?: () => void;
  onHover?: (name: string | null) => void;
}

export function SkillBlock({
  technology,
  dimmed = false,
  highlighted = false,
  onTriggerWave,
  onHover,
}: SkillBlockProps) {
  const signal = DOMAIN_SIGNAL[technology.category];

  return (
    <button
      type="button"
      onClick={onTriggerWave}
      onMouseEnter={() => onHover?.(technology.name)}
      onMouseLeave={() => onHover?.(null)}
      className={cn(
        "anime-tech-cell relative p-4 sm:p-5 bg-card border border-border text-left flex flex-col justify-between gap-4 transition-opacity duration-200 group focus:outline-none hover:bg-surface/80 will-change-transform",
        dimmed && "opacity-25",
        highlighted && "ring-1 ring-inset ring-[#38BDF8] bg-surface",
      )}
    >
      <div className="w-full flex items-center justify-between gap-2">
        <span
          style={{ backgroundColor: signal }}
          className="w-2 h-2 shrink-0"
        />
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground truncate">
          {technology.category}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 border border-border bg-background flex items-center justify-center shrink-0 p-1.5">
          <Image
            src={technology.darkIcon ?? technology.icon}
            alt={technology.name}
            width={20}
            height={20}
            className="w-5 h-5 object-contain dark:hidden"
          />
          <Image
            src={technology.icon}
            alt={technology.name}
            width={20}
            height={20}
            className="w-5 h-5 object-contain hidden dark:block"
          />
        </div>
        <span className="font-mono text-xs sm:text-[13px] font-semibold text-foreground group-hover:text-[#38BDF8] transition-colors truncate">
          {technology.name}
        </span>
      </div>
    </button>
  );
}
