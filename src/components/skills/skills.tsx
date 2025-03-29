import { technologies } from "./constants";
import React from "react";
import { TooltipProvider } from "@/src/ui/ui/tooltip";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import { SkillBlock } from "@/src/components/skills/skill-block";

const Skills = () => {
  return (
    <SectionContainer
      id="skills"
      className="h-max p-8 md:py-16 lg:py-24 flex flex-col items-center select-none min-h-screen"
    >
      <HeadingText precedingText="My" coloredText="Skills" />
      <br />
      <div className="mt-10 flex flex-col">
        <div className="mt-16 flex flex-wrap gap-20 justify-center items-center">
          <TooltipProvider>
            {technologies.map((technology) => (
              <SkillBlock key={technology.name} technology={technology} />
            ))}
          </TooltipProvider>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Skills;
