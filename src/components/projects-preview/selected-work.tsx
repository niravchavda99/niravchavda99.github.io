"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Layers, LayoutGrid } from "lucide-react";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { animate, createSpring, stagger } from "animejs";
import { projects } from "@/src/data/projects";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import { ProjectItem } from "@/src/app/projects/project-item/project-item";
import { cn } from "@/src/lib/utils";

type StageMode = "orbital" | "grid";

export default function SelectedWork() {
  const [stageMode, setStageMode] = useState<StageMode>("orbital");
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detailRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);

  const total = projects.length;

  const stepNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const stepPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (stageMode !== "orbital") return;
    const onKey = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "ArrowRight") stepNext();
      if (e.key === "ArrowLeft") stepPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stageMode, stepNext, stepPrev]);

  // Anime.js v4.5 3D Perspective Orbital Spring Choreography
  useEffect(() => {
    if (stageMode !== "orbital") return;

    projects.forEach((_, idx) => {
      const el = cardRefs.current[idx];
      if (!el) return;

      let offset = idx - activeIndex;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const absOffset = Math.abs(offset);
      const isVisible = absOffset <= 2;
      const isCenter = offset === 0;

      el.style.zIndex = String(20 - absOffset);
      el.style.pointerEvents = isVisible ? "auto" : "none";

      animate(el, {
        x: `${offset * 54}%`,
        z: -absOffset * 210,
        rotateY: offset * -28,
        scale: isCenter ? 1 : Math.max(0.72, 1 - absOffset * 0.14),
        opacity: !isVisible ? 0 : isCenter ? 1 : 0.55 / absOffset,
        ease: createSpring({ stiffness: 220, damping: 24, mass: 0.8 }),
      });
    });

    if (detailRef.current) {
      animate(detailRef.current, {
        y: [8, 0],
        opacity: [0.45, 1],
        duration: 380,
        ease: "outCubic",
      });
    }
  }, [activeIndex, stageMode, total]);

  // Anime.js staggered entrance when toggling to Spatial Grid mode
  useEffect(() => {
    if (stageMode === "grid" && gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".anime-work-grid-item");
      animate(cards, {
        y: [28, 0],
        opacity: [0, 1],
        scale: [0.95, 1],
        delay: stagger(80),
        duration: 620,
        ease: "outExpo",
      });
    }
  }, [stageMode]);

  const activeProject = projects[activeIndex];

  return (
    <SectionContainer id="work">
      <HeadingText
        index="01"
        eyebrow="3D Spatial Showcase"
        coloredText="Crafted"
        italicAccent="artifacts"
        subtitle="Spin through shipped Chrome extensions, developer utilities, and interactive 3D experiments in spatial perspective — or switch to grid view."
        rightSlot={
          <div className="flex flex-wrap items-center gap-2.5">
            <div
              role="group"
              aria-label="Showcase mode"
              className="inline-flex items-center p-1 rounded-xl border border-border bg-card/80 backdrop-blur-md"
            >
              <button
                type="button"
                onClick={() => setStageMode("orbital")}
                aria-pressed={stageMode === "orbital"}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors",
                  stageMode === "orbital"
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Layers size={13} />
                <span>3D Deck</span>
              </button>
              <button
                type="button"
                onClick={() => setStageMode("grid")}
                aria-pressed={stageMode === "grid"}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors",
                  stageMode === "grid"
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <LayoutGrid size={13} />
                <span>Spatial Grid</span>
              </button>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 h-9 px-3.5 rounded-xl border border-border bg-card/80 hover:border-primary/50 text-xs font-mono text-foreground transition-colors"
            >
              <span>Full Archive</span>
              <ArrowRight size={13} className="text-primary" />
            </Link>
          </div>
        }
      />

      {stageMode === "orbital" ? (
        <div className="relative select-none overflow-x-clip py-4">
          {/* Anime.js 3D Perspective Orbital Carousel Stage */}
          <div
            data-cursor="SWIPE / CLICK"
            onPointerDown={(e) => {
              dragStartX.current = e.clientX;
            }}
            onPointerUp={(e) => {
              if (dragStartX.current === null) return;
              const delta = e.clientX - dragStartX.current;
              dragStartX.current = null;
              if (delta < -45) stepNext();
              else if (delta > 45) stepPrev();
            }}
            className="relative h-[320px] sm:h-[430px] lg:h-[470px] w-full perspective-1600 flex items-center justify-center touch-pan-y"
          >
            {projects.map((project, idx) => {
              const isCenter = idx === activeIndex;

              return (
                <div
                  key={project.name}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  onClick={() => {
                    if (!isCenter) setActiveIndex(idx);
                  }}
                  className={cn(
                    "absolute w-[88%] sm:w-[68%] lg:w-[60%] max-w-[660px] rounded-2xl border overflow-hidden shadow-2xl transition-colors will-change-transform",
                    isCenter
                      ? "border-primary/50 bg-card shadow-black/25 dark:shadow-black/70 cursor-default"
                      : "border-border/80 bg-card/80 cursor-pointer hover:border-foreground/40",
                  )}
                >
                  {/* Window Top Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface/80 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/15 text-primary">
                        {String(idx + 1).padStart(2, "0")} /{" "}
                        {String(total).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-xs font-medium text-foreground truncate">
                        {project.name}
                      </span>
                    </div>

                    {isCenter && (
                      <div className="flex items-center gap-1.5">
                        {project.codeLink && (
                          <a
                            href={project.codeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.name} source code`}
                            className="w-7 h-7 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <FaGithub className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${project.name}`}
                            className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg bg-primary text-primary-foreground font-mono text-[11px] font-medium hover:opacity-90 transition-opacity"
                          >
                            <span>Launch</span>
                            <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Screenshot Plane */}
                  <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                    <Image
                      fill
                      src={project.image}
                      alt={project.name}
                      sizes="(max-width: 768px) 90vw, 660px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Artifact Telemetry Dock */}
          <div
            ref={detailRef}
            className="mt-6 max-w-3xl mx-auto rounded-2xl border border-border bg-card/80 backdrop-blur-xl p-5 sm:p-6 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                    {activeProject.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md border border-border bg-surface font-mono text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Prev / Next Orbital Controls */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={stepPrev}
                  aria-label="Previous project"
                  className="w-10 h-10 rounded-xl border border-border bg-surface hover:border-primary/50 hover:text-primary flex items-center justify-center transition-colors"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={stepNext}
                  aria-label="Next project"
                  className="w-10 h-10 rounded-xl border border-border bg-surface hover:border-primary/50 hover:text-primary flex items-center justify-center transition-colors"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Orbital Scrubber Pills */}
            <div className="mt-5 pt-4 border-t border-border/70 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                {projects.map((p, idx) => {
                  const active = idx === activeIndex;
                  return (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Focus ${p.name}`}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        active
                          ? "w-8 bg-primary"
                          : "w-2 bg-border hover:bg-muted-foreground/60",
                      )}
                    />
                  );
                })}
              </div>

              <div className="flex items-center gap-3 font-mono text-[11px]">
                {activeProject.codeLink && (
                  <a
                    href={activeProject.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
                {activeProject.link && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary font-medium hover:underline"
                  >
                    <span>Open Live Artifact</span>
                    <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {projects.slice(0, 4).map((project, idx) => (
            <div key={project.name} className="anime-work-grid-item">
              <ProjectItem project={project} index={idx + 1} />
            </div>
          ))}
        </div>
      )}
    </SectionContainer>
  );
}
