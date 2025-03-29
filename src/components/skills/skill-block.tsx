import { Tooltip, TooltipContent, TooltipTrigger } from "@/src/ui/ui/tooltip";
import Image from "next/image";
import React from "react";
import { Technology } from "./constants";

export interface SkillBlockProps {
  technology: Technology;
}

export function SkillBlock({ technology }: SkillBlockProps) {
  return (
    <Tooltip key={technology.name} delayDuration={0}>
      <TooltipTrigger asChild>
        <div className="block-container w-20 h-20">
          <div className="btn-back rounded-xl" />
          <div className="btn-front rounded-xl flex flex-col justify-center items-center">
            <Image
              src={technology.icon}
              alt={technology.name}
              width={60}
              height={60}
              className="w-2/3 h-2/3 object-contain hidden dark:block"
            />
            <Image
              src={technology?.darkIcon ?? technology.icon}
              alt={technology.name}
              width={60}
              height={60}
              className="w-2/3 h-2/3 object-contain block dark:hidden"
            />
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent className="mb-3">
        <p>{technology.name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
