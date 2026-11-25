"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LayoutGrid, List, X } from "lucide-react";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { animate, createSpring, stagger } from "animejs";
import { Project, projects } from "@/src/data/projects";
import { ProjectItem } from "./project-item/project-item";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import { cn } from "@/src/lib/utils";

type ViewMode = "grid" | "index";

export function ProjectsExplorer() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [hoveredProject, setHoveredProject] = useState<Project>(projects[0]);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  const listStageRef = useRef<HTMLDivElement>(null);
  const splitPreviewRef = useRef<HTMLDivElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);
  const modalBackdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const container = listStageRef.current;
    if (!container) return;
    const items = container.querySelectorAll(".anime-project-entry");
    if (!items.length) return;
    animate(items, {
      y: [22, 0],
      opacity: [0, 1],
      delay: stagger(60),
      duration: 600,
      ease: "outExpo",
    });
  }, [viewMode]);

  useEffect(() => {
    if (!splitPreviewRef.current) return;
    animate(splitPreviewRef.current, {
      opacity: [0.35, 1],
      y: [6, 0],
      duration: 220,
      ease: "outCubic",
    });
  }, [hoveredProject]);

  // Lock body scroll & render portal modal cleanly above fixed z-50 header
  useEffect(() => {
    if (!previewProject) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (modalBackdropRef.current) {
      animate(modalBackdropRef.current, {
        opacity: [0, 1],
        duration: 180,
        ease: "outQuad",
      });
    }
    if (modalCardRef.current) {
      animate(modalCardRef.current, {
        opacity: [0, 1],
        scale: [0.95, 1],
        y: [14, 0],
        ease: createSpring({ stiffness: 320, damping: 24 }),
      });
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [previewProject]);

  return (
    <SectionContainer id="projects">
      {/* Top Back Strip */}
      <div className="px-5 sm:px-8 lg:px-10 h-10 border-b border-border bg-surface/35 flex items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={13} className="text-[#FF4B4B]" />
          <span>RETURN TO TIMELINE [00:00]</span>
        </Link>
      </div>

      <HeadingText
        index="ARCHIVE"
        eyebrow={`${projects.length} PUBLIC ARTIFACTS`}
        coloredText="Projects &"
        italicAccent="experiments."
        signalColor="#FF4B4B"
        subtitle="A complete index of things I've built — Chrome extensions, developer utilities, web apps, and Three.js 3D explorations."
        rightSlot={
          <div
            role="group"
            aria-label="View mode"
            className="inline-flex items-center border border-border bg-card divide-x divide-border font-mono text-xs"
          >
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-pressed={viewMode === "grid"}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-2 transition-colors",
                viewMode === "grid"
                  ? "bg-[#FF4B4B] text-[#1D1C1B] font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface",
              )}
            >
              <LayoutGrid size={13} />
              <span>GRID</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("index")}
              aria-pressed={viewMode === "index"}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-2 transition-colors",
                viewMode === "index"
                  ? "bg-[#FF4B4B] text-[#1D1C1B] font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface",
              )}
            >
              <List size={13} />
              <span>INSPECTOR</span>
            </button>
          </div>
        }
      />

      <div ref={listStageRef} className="p-5 sm:p-8 lg:p-10 bg-dot-matrix">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div
                key={project.name}
                className={cn(
                  "anime-project-entry",
                  project.featured && "md:col-span-2",
                )}
              >
                <ProjectItem
                  project={project}
                  index={idx + 1}
                  onPreview={setPreviewProject}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-border bg-card divide-y lg:divide-y-0 lg:divide-x divide-border">
            <div className="lg:col-span-7 divide-y divide-border">
              {projects.map((project, idx) => {
                const isSelected = hoveredProject.name === project.name;
                return (
                  <div
                    key={project.name}
                    onMouseEnter={() => setHoveredProject(project)}
                    onFocus={() => setHoveredProject(project)}
                    onClick={() => setPreviewProject(project)}
                    className={cn(
                      "anime-project-entry relative p-5 flex items-center justify-between gap-4 transition-colors cursor-pointer",
                      isSelected ? "bg-surface" : "hover:bg-surface/45",
                    )}
                  >
                    {isSelected && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF4B4B]" />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#FF4B4B] font-bold">
                          KF-{String(idx + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-foreground truncate">
                          {project.name}
                        </h3>
                      </div>
                      <p className="mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-1 pl-14">
                        {project.description}
                      </p>
                    </div>

                    <div
                      className="flex items-center gap-2 shrink-0 font-mono text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.codeLink && (
                        <a
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.name} source`}
                          className="w-8 h-8 border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <FaGithub className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 h-8 px-3 bg-[#FF4B4B] text-[#1D1C1B] font-bold hover:bg-[#FFC730] transition-colors"
                        >
                          <span>LIVE</span>
                          <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-14 self-start">
              <div ref={splitPreviewRef}>
                <div className="px-4 h-9 border-b border-border bg-surface/60 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                  <span>PREVIEW MONITOR</span>
                  <span>{hoveredProject.name.toUpperCase()}</span>
                </div>
                <div className="relative aspect-[16/10] bg-muted border-b border-border">
                  <Image
                    fill
                    src={hoveredProject.image}
                    alt={hoveredProject.name}
                    sizes="(max-width: 1024px) 100vw, 460px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <h4 className="text-xl font-bold text-foreground">
                    {hoveredProject.name}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {hoveredProject.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {hoveredProject.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 border border-border bg-background font-mono text-[10px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Portal Lightbox Modal — rendered on document.body at z-[110] cleanly above header */}
      {mounted &&
        previewProject &&
        createPortal(
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${previewProject.name} preview`}
          >
            <div
              ref={modalBackdropRef}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setPreviewProject(null)}
            />
            <div
              ref={modalCardRef}
              className="relative z-10 w-full max-w-4xl max-h-[88vh] flex flex-col border border-border bg-card overflow-hidden shadow-2xl will-change-transform"
            >
              <div className="flex items-center justify-between px-5 h-12 border-b border-border bg-surface shrink-0">
                <div className="flex items-center gap-3 min-w-0 pr-4 font-mono text-xs">
                  <span className="w-2.5 h-2.5 bg-[#FF4B4B] shrink-0" />
                  <h3 className="font-bold text-foreground truncate">
                    {previewProject.name}
                  </h3>
                  <span className="hidden sm:inline text-muted-foreground truncate">
                    // {previewProject.tags.join(" · ")}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewProject(null)}
                  aria-label="Close preview"
                  className="w-8 h-8 border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="relative w-full h-[46vh] sm:h-[56vh] bg-[#141312] shrink-0">
                <Image
                  fill
                  src={previewProject.image}
                  alt={previewProject.name}
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-contain p-3 sm:p-5"
                />
              </div>

              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border overflow-y-auto">
                <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                  {previewProject.description}
                </p>
                <div className="flex items-center gap-2.5 shrink-0 font-mono text-xs">
                  {previewProject.codeLink && (
                    <a
                      href={previewProject.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-border bg-surface text-foreground hover:bg-background transition-colors"
                    >
                      <FaGithub className="w-3.5 h-3.5" />
                      <span>SOURCE</span>
                    </a>
                  )}
                  {previewProject.link && (
                    <a
                      href={previewProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF4B4B] text-[#1D1C1B] font-bold hover:bg-[#FFC730] transition-colors"
                    >
                      <span>OPEN LIVE</span>
                      <FaArrowUpRightFromSquare className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </SectionContainer>
  );
}
