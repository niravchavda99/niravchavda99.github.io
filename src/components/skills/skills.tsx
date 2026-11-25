"use client";

import { SkillCategory, technologies, Technology } from "@/src/data/skills";
import React, { useEffect, useRef, useState } from "react";
import { animate, createSpring, stagger } from "animejs";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import { SkillBlock } from "@/src/components/skills/skill-block";
import { SkillSphere3D } from "@/src/components/skills/skill-sphere-3d";
import { cn } from "@/src/lib/utils";

const CATEGORY_ORDER: SkillCategory[] = [
  "Backend",
  "Frontend",
  "Tools",
  "Cloud",
  "Database",
  "Mobile",
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
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">(
    "All",
  );
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const grouped = groupByCategory(technologies);

  const visibleCategories =
    activeCategory === "All" ? CATEGORY_ORDER : [activeCategory];

  // Anime.js staggered spring cascade when switching skill domain filters
  useEffect(() => {
    const container = matrixRef.current;
    if (!container) return;
    const blocks = container.querySelectorAll(".anime-skill-tile");
    if (!blocks.length) return;

    animate(blocks, {
      scale: [0.88, 1],
      opacity: [0, 1],
      y: [14, 0],
      delay: stagger(26, { from: "first" }),
      ease: createSpring({ stiffness: 280, damping: 20 }),
    });
  }, [activeCategory]);

  return (
    <SectionContainer id="skills">
      <HeadingText
        index="03"
        eyebrow="3D Tech Constellation"
        coloredText="Full-stack &"
        italicAccent="agentic orbit"
        subtitle="Drag the interactive 3D constellation sphere or filter by domain — spanning backend services, web & 3D, cloud, mobile, and AI-native developer tooling."
      />

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {(["All", ...CATEGORY_ORDER] as const).map((cat) => {
          const count =
            cat === "All" ? technologies.length : (grouped[cat]?.length ?? 0);
          if (!count) return null;
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3.5 py-2 rounded-xl font-mono text-xs border transition-all duration-200",
                active
                  ? "bg-foreground text-background border-foreground font-semibold shadow-md"
                  : "bg-card/70 text-foreground border-border hover:border-primary/45",
              )}
            >
              {cat}{" "}
              <span
                className={cn(
                  "ml-0.5",
                  active ? "opacity-75" : "text-muted-foreground",
                )}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Synchronized 3D Orbital Sphere + Anime.js Staggered Spec Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <div className="lg:col-span-6 lg:sticky lg:top-24">
          <SkillSphere3D
            technologies={technologies}
            activeCategory={activeCategory}
            hoveredTech={hoveredTech}
            onHoverTech={setHoveredTech}
          />
        </div>

        <div ref={matrixRef} className="lg:col-span-6 space-y-5">
          {visibleCategories.map((category) => {
            const techs = grouped[category];
            if (!techs?.length) return null;
            return (
              <div
                key={category}
                className="rounded-2xl border border-border bg-card/75 backdrop-blur-xl p-5"
              >
                <div className="flex items-center justify-between gap-3 mb-4 pb-2.5 border-b border-border/70">
                  <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-foreground font-semibold">
                    {category === "Tools" ? "AI & Developer Tooling" : category}
                  </h3>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {techs.length} {techs.length === 1 ? "tool" : "tools"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {techs.map((tech) => (
                    <div key={tech.name} className="anime-skill-tile">
                      <SkillBlock
                        technology={tech}
                        highlighted={hoveredTech === tech.name}
                        onHover={setHoveredTech}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
};

export default Skills;
