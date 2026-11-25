"use client";

import { SkillCategory, technologies } from "@/src/data/skills";
import React, { useCallback, useRef, useState } from "react";
import { Globe, Grid3X3 } from "lucide-react";
import { animate, createSpring, stagger } from "animejs";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import { DOMAIN_SIGNAL, SkillBlock } from "@/src/components/skills/skill-block";
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

type ViewMode = "matrix" | "sphere";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">(
    "All",
  );
  const [viewMode, setViewMode] = useState<ViewMode>("matrix");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const triggerCellShockwave = useCallback((originIndex: number) => {
    const grid = gridRef.current;
    if (!grid) return;
    const cells = grid.querySelectorAll(".anime-tech-cell");
    if (!cells.length) return;

    // Estimate current responsive column count for accurate 2D radial stagger!
    const w = window.innerWidth;
    const cols = w >= 1024 ? 5 : w >= 640 ? 3 : 2;
    const rows = Math.ceil(cells.length / cols);

    animate(cells, {
      scale: [
        { to: 0.9, duration: 110, ease: "outQuad" },
        { to: 1, ease: createSpring({ stiffness: 320, damping: 16 }) },
      ],
      y: [
        { to: -6, duration: 130, ease: "outQuad" },
        { to: 0, ease: createSpring({ stiffness: 300, damping: 18 }) },
      ],
      delay: stagger(32, { grid: [cols, rows], from: originIndex }),
    });
  }, []);

  const handleCategorySelect = (cat: SkillCategory | "All") => {
    setActiveCategory(cat);
    triggerCellShockwave(0);
  };

  return (
    <SectionContainer id="skills">
      <HeadingText
        index="03"
        eyebrow="STAGGER MATRIX & 3D ORBIT"
        coloredText="Full-stack &"
        italicAccent="agentic stack."
        signalColor="#38BDF8"
        subtitle="Click any technology cell to fire an Anime.js 2D radial stagger wave across the matrix, filter by domain, or switch to the 3D orbital sphere."
        rightSlot={
          <div
            role="group"
            aria-label="Stack visualization mode"
            className="inline-flex items-center border border-border bg-card divide-x divide-border font-mono text-xs"
          >
            <button
              type="button"
              onClick={() => setViewMode("matrix")}
              aria-pressed={viewMode === "matrix"}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-2 transition-colors",
                viewMode === "matrix"
                  ? "bg-[#38BDF8] text-[#1D1C1B] font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface",
              )}
            >
              <Grid3X3 size={13} />
              <span>MATRIX</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("sphere")}
              aria-pressed={viewMode === "sphere"}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-2 transition-colors",
                viewMode === "sphere"
                  ? "bg-[#38BDF8] text-[#1D1C1B] font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface",
              )}
            >
              <Globe size={13} />
              <span>3D SPHERE</span>
            </button>
          </div>
        }
      />

      {/* Domain Filter Strip */}
      <div className="px-5 sm:px-8 lg:px-10 py-3.5 border-b border-border bg-surface/35 flex flex-wrap items-center gap-2 font-mono text-xs">
        <button
          type="button"
          onClick={() => handleCategorySelect("All")}
          className={cn(
            "px-3 py-1.5 border transition-colors",
            activeCategory === "All"
              ? "bg-foreground text-background border-foreground font-bold"
              : "bg-card text-muted-foreground border-border hover:text-foreground",
          )}
        >
          ALL [{technologies.length}]
        </button>

        {CATEGORY_ORDER.map((cat) => {
          const count = technologies.filter((t) => t.category === cat).length;
          if (!count) return null;
          const active = activeCategory === cat;
          const sig = DOMAIN_SIGNAL[cat];
          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategorySelect(cat)}
              className={cn(
                "px-3 py-1.5 border inline-flex items-center gap-2 transition-colors",
                active
                  ? "bg-foreground text-background border-foreground font-bold"
                  : "bg-card text-muted-foreground border-border hover:text-foreground",
              )}
            >
              <span
                style={{ backgroundColor: sig }}
                className="w-2 h-2 shrink-0"
              />
              <span>
                {cat === "Tools" ? "AI & Tooling" : cat} [{count}]
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Stage */}
      <div className="p-5 sm:p-8 lg:p-10 bg-dot-matrix">
        {viewMode === "matrix" ? (
          <div
            ref={gridRef}
            data-cursor="WAVE"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5"
          >
            {technologies.map((tech, idx) => {
              const dimmed =
                activeCategory !== "All" && tech.category !== activeCategory;
              return (
                <SkillBlock
                  key={tech.name}
                  technology={tech}
                  dimmed={dimmed}
                  highlighted={hoveredTech === tech.name}
                  onTriggerWave={() => triggerCellShockwave(idx)}
                  onHover={setHoveredTech}
                />
              );
            })}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <SkillSphere3D
              technologies={technologies}
              activeCategory={activeCategory}
              hoveredTech={hoveredTech}
              onHoverTech={setHoveredTech}
            />
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

export default Skills;
