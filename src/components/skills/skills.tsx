import {
  CATEGORY_ACCENT,
  SkillCategory,
  technologies,
  Technology,
} from "./constants";
import React from "react";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import { SkillBlock } from "@/src/components/skills/skill-block";

const CATEGORY_ORDER: SkillCategory[] = [
  "Backend",
  "Frontend",
  "Database",
  "Mobile",
  "Tools",
];

function groupByCategory(
  techs: Technology[],
): Record<SkillCategory, Technology[]> {
  return techs.reduce(
    (acc, tech) => {
      acc[tech.category] = [...(acc[tech.category] ?? []), tech];
      return acc;
    },
    {} as Record<SkillCategory, Technology[]>,
  );
}

const Skills = () => {
  const grouped = groupByCategory(technologies);

  return (
    <SectionContainer id="skills">
      <HeadingText coloredText="Skills" />
      <p className="mt-4 mb-14 text-slate-500 dark:text-slate-400 text-base max-w-xl">
        Technologies I&apos;ve worked with across the full stack — from backend
        services to mobile apps.
      </p>

      <div className="space-y-12">
        {CATEGORY_ORDER.map((category) => {
          const techs = grouped[category];
          if (!techs?.length) return null;
          return (
            <div key={category}>
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={`font-mono text-xs px-2.5 py-1 rounded-md border font-medium ${CATEGORY_ACCENT[category]}`}
                >
                  {category}
                </span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(72px,1fr))] gap-x-4 gap-y-6 justify-items-center sm:gap-x-6 sm:gap-y-8">
                {techs.map((tech) => (
                  <SkillBlock key={tech.name} technology={tech} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
};

export default Skills;
