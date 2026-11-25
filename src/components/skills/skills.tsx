"use client";

import { SkillCategory, technologies } from "@/src/data/skills";
import React, { useEffect, useRef, useState } from "react";
import { animate, createSpring, stagger } from "animejs";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import { SkillBlock } from "@/src/components/skills/skill-block";
import { cn } from "@/src/lib/utils";

const CATEGORY_ORDER: SkillCategory[] = [
  "Backend",
  "Frontend",
  "Tools",
  "Cloud",
  "Database",
  "Mobile",
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">(
    "All",
  );
  const wrapRef = useRef<HTMLDivElement>(null);

  const visible =
    activeCategory === "All"
      ? technologies
      : technologies.filter((t) => t.category === activeCategory);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const pills = root.querySelectorAll(".anime-skill-pill");
    if (!pills.length) return;

    animate(pills, {
      scale: [0.9, 1],
      opacity: [0, 1],
      y: [10, 0],
      delay: stagger(20),
      ease: createSpring({ stiffness: 280, damping: 22 }),
    });
  }, [activeCategory]);

  return (
    <SectionContainer id="skills">
      <HeadingText
        coloredText="Skills & Tooling"
        subtitle="Languages, frameworks, cloud platforms, and AI coding tools I work with."
      />

      {/* Soft Rounded Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {(["All", ...CATEGORY_ORDER] as const).map((cat) => {
          const active = activeCategory === cat;
          const label = cat === "Tools" ? "AI & Tools" : cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm transition-colors",
                active
                  ? "bg-foreground text-background font-medium"
                  : "bg-surface text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Calm, Breathable Pill Cloud */}
      <div ref={wrapRef} className="flex flex-wrap gap-2.5">
        {visible.map((tech) => (
          <SkillBlock key={tech.name} technology={tech} />
        ))}
      </div>
    </SectionContainer>
  );
};

export default Skills;
