"use client";

import { SkillCategory, technologies, Technology } from "@/src/data/skills";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import { SkillBlock } from "@/src/components/skills/skill-block";
import { SkillSphere3D } from "@/src/components/skills/skill-sphere-3d";
import { cn } from "@/src/lib/utils";

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
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">(
    "All",
  );
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const grouped = groupByCategory(technologies);

  const visibleCategories =
    activeCategory === "All" ? CATEGORY_ORDER : [activeCategory];

  return (
    <SectionContainer id="skills">
      <HeadingText
        index="03"
        eyebrow="3D Tech Constellation"
        coloredText="Full-stack"
        italicAccent="orbit"
        subtitle="Drag the interactive 3D constellation sphere or filter by engineering domain to inspect technologies across backend, web, database, and mobile."
      />

      {/* Spring-Animated Category Filter Pills */}
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
              className="relative px-3.5 py-2 rounded-xl font-mono text-xs transition-colors"
            >
              {active && (
                <motion.span
                  layoutId="skill-domain-pill"
                  transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  className="absolute inset-0 rounded-xl bg-foreground shadow-md"
                />
              )}
              {!active && (
                <span className="absolute inset-0 rounded-xl border border-border bg-card/70 hover:border-primary/40 transition-colors" />
              )}
              <span
                className={cn(
                  "relative z-10",
                  active ? "text-background font-semibold" : "text-foreground",
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
              </span>
            </button>
          );
        })}
      </div>

      {/* Synchronized 3D Orbital Sphere + Tactile Spec Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <div className="lg:col-span-6 lg:sticky lg:top-24">
          <SkillSphere3D
            technologies={technologies}
            activeCategory={activeCategory}
            hoveredTech={hoveredTech}
            onHoverTech={setHoveredTech}
          />
        </div>

        <div className="lg:col-span-6 space-y-5">
          {visibleCategories.map((category) => {
            const techs = grouped[category];
            if (!techs?.length) return null;
            return (
              <motion.div
                layout
                key={category}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-border bg-card/75 backdrop-blur-xl p-5"
              >
                <div className="flex items-center justify-between gap-3 mb-4 pb-2.5 border-b border-border/70">
                  <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-foreground font-semibold">
                    {category}
                  </h3>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {techs.length} {techs.length === 1 ? "tool" : "tools"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {techs.map((tech) => (
                    <SkillBlock
                      key={tech.name}
                      technology={tech}
                      highlighted={hoveredTech === tech.name}
                      onHover={setHoveredTech}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
};

export default Skills;
