"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LayoutGrid, List, Search, X } from "lucide-react";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { Project, projects } from "@/src/data/projects";
import { ProjectItem } from "./project-item/project-item";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import { Tilt3DCard } from "@/src/components/motion/tilt-3d-card";
import { cn } from "@/src/lib/utils";

type ViewMode = "grid" | "index";

export function ProjectsExplorer() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [hoveredProject, setHoveredProject] = useState<Project>(projects[0]);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!previewProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previewProject]);

  const tagCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of projects) {
      for (const t of p.tags) {
        map.set(t, (map.get(t) ?? 0) + 1);
      }
    }
    return Array.from(map.entries()).sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
    );
  }, []);

  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesTag = !selectedTag || p.tags.includes(selectedTag);
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [selectedTag, search]);

  useEffect(() => {
    if (
      filteredProjects.length > 0 &&
      !filteredProjects.some((p) => p.name === hoveredProject.name)
    ) {
      setHoveredProject(filteredProjects[0]);
    }
  }, [filteredProjects, hoveredProject.name]);

  const handleTagToggle = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <SectionContainer id="projects" className="pt-28 sm:pt-36">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Studio Overview</span>
        </Link>
      </div>

      <HeadingText
        index="ARCHIVE"
        eyebrow={`${projects.length} Public Artifacts`}
        coloredText="Projects &"
        italicAccent="experiments"
        subtitle="A complete index of things I've built — Chrome extensions, developer utilities, web apps, and Three.js 3D explorations."
        rightSlot={
          <div
            role="group"
            aria-label="View mode"
            className="inline-flex items-center p-1 rounded-xl border border-border bg-card/80 backdrop-blur-md"
          >
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-pressed={viewMode === "grid"}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors",
                viewMode === "grid"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <LayoutGrid size={13} />
              <span>3D Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("index")}
              aria-pressed={viewMode === "index"}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors",
                viewMode === "index"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <List size={13} />
              <span>Split Stage</span>
            </button>
          </div>
        }
      />

      {/* Interactive Search & Tag Matrix */}
      <div className="mb-12 space-y-4 rounded-2xl border border-border bg-card/75 backdrop-blur-xl p-4 sm:p-6 shadow-lg shadow-black/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by title, keyword, or technology..."
              aria-label="Search projects"
              className="w-full h-10 pl-9 pr-8 rounded-xl border border-border bg-surface/70 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
            <span>
              Showing{" "}
              <strong className="text-foreground font-semibold">
                {filteredProjects.length}
              </strong>{" "}
              of {projects.length}
            </span>
            {(selectedTag || search) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedTag(null);
                  setSearch("");
                }}
                className="text-primary hover:underline"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => setSelectedTag(null)}
            className={cn(
              "px-2.5 py-1 rounded-lg font-mono text-[11px] border transition-colors",
              selectedTag === null
                ? "bg-foreground text-background border-foreground"
                : "bg-surface/60 text-muted-foreground border-border hover:text-foreground",
            )}
          >
            all ({projects.length})
          </button>
          {tagCounts.map(([tag, count]) => {
            const active = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={cn(
                  "px-2.5 py-1 rounded-lg font-mono text-[11px] border transition-colors",
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-surface/60 text-muted-foreground border-border hover:text-foreground",
                )}
              >
                {tag}{" "}
                <span className={cn("opacity-65", active && "opacity-90")}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border border-dashed border-border bg-card/40">
          <p className="text-base font-medium text-foreground">
            No matching artifacts found
          </p>
          <p className="text-sm text-muted-foreground mt-1 mb-5">
            Try clearing the search query or selecting another tag.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedTag(null);
              setSearch("");
            }}
            className="px-4 py-2 rounded-xl bg-foreground text-background text-xs font-mono uppercase tracking-wider"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.name}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={cn(project.featured && "md:col-span-2")}
              >
                <ProjectItem
                  project={project}
                  index={idx + 1}
                  activeTag={selectedTag}
                  onTagClick={handleTagToggle}
                  onPreview={setPreviewProject}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Interactive Split-Stage 3D Hover Preview Index */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 rounded-2xl border border-border bg-card/80 backdrop-blur-xl divide-y divide-border overflow-hidden">
            {filteredProjects.map((project, idx) => {
              const isSelected = hoveredProject.name === project.name;
              return (
                <div
                  key={project.name}
                  onMouseEnter={() => setHoveredProject(project)}
                  onFocus={() => setHoveredProject(project)}
                  className={cn(
                    "relative p-5 flex items-center justify-between gap-4 transition-colors cursor-pointer",
                    isSelected ? "bg-surface/90" : "hover:bg-surface/40",
                  )}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="split-stage-bar"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-primary font-semibold">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">
                        {project.name}
                      </h3>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-1 pl-7">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} source`}
                        className="w-8 h-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        <FaGithub className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-mono text-xs transition-colors"
                      >
                        <span>Open</span>
                        <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky 3D Preview Stage on Right */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <Tilt3DCard
              maxTilt={11}
              className="rounded-2xl border border-border bg-card/90 backdrop-blur-xl overflow-hidden shadow-2xl"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredProject.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative aspect-[16/10] bg-muted border-b border-border">
                    <Image
                      fill
                      src={hoveredProject.image}
                      alt={hoveredProject.name}
                      sizes="(max-width: 1024px) 100vw, 440px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="p-5 space-y-3">
                    <h4 className="text-xl font-semibold text-foreground">
                      {hoveredProject.name}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {hoveredProject.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {hoveredProject.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md border border-border bg-surface font-mono text-[10px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </Tilt3DCard>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {previewProject && (
          <div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${previewProject.name} preview`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
              onClick={() => setPreviewProject(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-4xl rounded-2xl border border-border bg-card overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface/60">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {previewProject.name}
                  </h3>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {previewProject.tags.join(" · ")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewProject(null)}
                  aria-label="Close preview"
                  className="w-8 h-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="relative aspect-[16/10] bg-muted">
                <Image
                  fill
                  src={previewProject.image}
                  alt={previewProject.name}
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-contain"
                />
              </div>

              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border">
                <p className="text-sm text-muted-foreground max-w-xl">
                  {previewProject.description}
                </p>
                <div className="flex items-center gap-2.5 shrink-0">
                  {previewProject.codeLink && (
                    <a
                      href={previewProject.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-surface text-xs font-mono text-foreground hover:bg-muted transition-colors"
                    >
                      <FaGithub className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  )}
                  {previewProject.link && (
                    <a
                      href={previewProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-medium transition-opacity hover:opacity-90"
                    >
                      <span>Open Live</span>
                      <FaArrowUpRightFromSquare className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </SectionContainer>
  );
}
