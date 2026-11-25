"use client";

import { activities } from "@/src/data/activities";
import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  createScope,
  createSpring,
  onScroll,
  stagger,
  svg,
} from "animejs";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import { cn } from "@/src/lib/utils";

// Same-command-count SVG polygons/paths for ultra-smooth Anime.js svg.morphTo!
const MORPH_SHAPES = [
  // 0: Spacecraft / Lunar Ascent Delta (Chandrayaan 3 TDD)
  "M 100 18 L 166 154 L 122 136 L 100 166 L 78 136 L 34 154 Z",
  // 1: Thermodynamic Hexagonal Core (Heat Transfer Lab)
  "M 100 20 L 168 60 L 168 140 L 100 180 L 32 140 L 32 60 Z",
  // 2: Mentorship 6-Point Star / Constellation Beacon (Junior Trainer)
  "M 100 16 L 126 74 L 184 100 L 126 126 L 100 184 L 74 126 Z",
];

const SHAPE_COLORS = ["#C084FC", "#FF4B4B", "#FFC730"];

const Activities = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const activePathRef = useRef<SVGPathElement>(null);
  const targetPathsRef = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const scope = createScope({ root }).add(() => {
      animate(".anime-lab-cell", {
        y: [24, 0],
        opacity: [0, 1],
        duration: 720,
        delay: stagger(110),
        ease: "outExpo",
        autoplay: onScroll({
          target: root,
          enter: "bottom-=80 top",
        }),
      });
    });

    return () => {
      scope.revert();
    };
  }, []);

  // Morph central SVG specimen via Anime.js v4 svg.morphTo whenever hovered card changes!
  useEffect(() => {
    const activeEl = activePathRef.current;
    const targetEl = targetPathsRef.current[activeIdx];
    if (!activeEl || !targetEl) return;

    animate(activeEl, {
      d: svg.morphTo(targetEl),
      stroke: SHAPE_COLORS[activeIdx % SHAPE_COLORS.length],
      rotate: activeIdx * 60,
      ease: createSpring({ stiffness: 180, damping: 16 }),
    });
  }, [activeIdx]);

  return (
    <SectionContainer id="activities">
      <HeadingText
        index="04"
        eyebrow="SVG MORPH SPECIMENS"
        coloredText="Labs, writing &"
        italicAccent="mentorship."
        signalColor="#C084FC"
        subtitle="Hover any card to morph the live vector schematic — covering engineering blog assessments, IIT Bombay Virtual Labs, and student training."
      />

      <div
        ref={rootRef}
        className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border"
      >
        {/* Left 4 Cols: Live Anime.js svg.morphTo Interactive Specimen Scope */}
        <div className="lg:col-span-4 p-8 bg-surface/35 bg-dot-matrix flex flex-col items-center justify-between gap-6">
          <div className="w-full flex items-center justify-between font-mono text-[10px] text-muted-foreground uppercase tracking-[0.14em]">
            <span>SVG.MORPHTO()</span>
            <span>SPECIMEN 0{activeIdx + 1}</span>
          </div>

          <svg viewBox="0 0 200 200" className="w-44 h-44 overflow-visible">
            {/* Hidden morph target paths */}
            <defs>
              {MORPH_SHAPES.map((d, idx) => (
                <path
                  key={idx}
                  ref={(el) => {
                    targetPathsRef.current[idx] = el;
                  }}
                  d={d}
                />
              ))}
            </defs>

            {/* Crosshair reticle */}
            <circle
              cx="100"
              cy="100"
              r="86"
              fill="none"
              stroke="hsl(var(--border))"
              strokeDasharray="4 4"
            />
            <line
              x1="100"
              y1="4"
              x2="100"
              y2="196"
              stroke="hsl(var(--border) / 0.5)"
            />
            <line
              x1="4"
              y1="100"
              x2="196"
              y2="100"
              stroke="hsl(var(--border) / 0.5)"
            />

            {/* Live Morphing Polygon */}
            <path
              ref={activePathRef}
              d={MORPH_SHAPES[0]}
              fill="rgba(192, 132, 252, 0.12)"
              stroke="#C084FC"
              strokeWidth="2.5"
              strokeLinejoin="round"
              style={{ transformOrigin: "100px 100px" }}
            />
          </svg>

          <div className="w-full text-center font-mono text-[11px] text-muted-foreground">
            {activities[activeIdx]?.title}
          </div>
        </div>

        {/* Right 8 Cols: Activity Specimen Rows */}
        <div className="lg:col-span-8 divide-y divide-border">
          {activities.map((activity, index) => {
            const isSelected = activeIdx === index;
            const sig = SHAPE_COLORS[index % SHAPE_COLORS.length];
            return (
              <article
                key={activity.title}
                onMouseEnter={() => setActiveIdx(index)}
                onFocus={() => setActiveIdx(index)}
                onClick={() => setActiveIdx(index)}
                className={cn(
                  "anime-lab-cell p-6 sm:p-8 transition-colors cursor-pointer",
                  isSelected ? "bg-card" : "bg-background hover:bg-surface/35",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3 font-mono text-xs">
                  <span className="inline-flex items-center gap-2">
                    <span
                      style={{ backgroundColor: sig }}
                      className="w-2.5 h-2.5 shrink-0"
                    />
                    <span style={{ color: sig }} className="font-bold">
                      {activity.subtitle}
                    </span>
                  </span>

                  <span className="text-muted-foreground">
                    LAB_0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-2">
                  {activity.title}
                </h3>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
};

export default Activities;
