"use client";

import React from "react";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { Maximize2 } from "lucide-react";
import { Project } from "@/src/data/projects";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { Tilt3DCard } from "@/src/components/motion/tilt-3d-card";

export interface ProjectCardProps {
  project: Project;
  index?: number;
  activeTag?: string | null;
  onTagClick?: (tag: string) => void;
  onPreview?: (project: Project) => void;
}

function formatHostname(url?: string): string {
  if (!url) return "local.artifact";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export const ProjectItem = ({
  project,
  index,
  activeTag,
  onTagClick,
  onPreview,
}: ProjectCardProps) => {
  const hostname = formatHostname(project.link ?? project.codeLink);
  const indexLabel =
    typeof index === "number" ? String(index).padStart(2, "0") : null;

  return (
    <div className={cn("h-full", project.featured && "md:col-span-2")}>
      <Tilt3DCard
        maxTilt={8}
        glareOpacity={0.2}
        cursorLabel="EXPLORE 3D"
        className="group flex flex-col h-full rounded-2xl border border-border/90 bg-card/85 backdrop-blur-xl overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/35 hover:border-primary/45 transition-colors duration-300"
      >
        {/* Spatial Window Bar */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border/80 bg-surface/65">
          <div className="flex items-center gap-2.5 min-w-0">
            {indexLabel ? (
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/15 text-primary">
                {indexLabel}
              </span>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-border" />
                <span className="w-2 h-2 rounded-full bg-border" />
              </div>
            )}
            <span className="font-mono text-[11px] text-muted-foreground truncate">
              {hostname}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onPreview && (
              <button
                type="button"
                onClick={() => onPreview(project)}
                aria-label={`Inspect ${project.name} screenshot`}
                title="Inspect full preview"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Maximize2 size={12} />
              </button>
            )}
            {project.codeLink && (
              <a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} source code`}
                title="View source code"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
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
                title="Open live project"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <FaArrowUpRightFromSquare className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Media Viewport */}
        <div
          className={cn(
            "relative overflow-hidden bg-muted border-b border-border/80",
            project.featured ? "aspect-[16/8.5]" : "aspect-[16/10]",
          )}
        >
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.name}`}
              className="block w-full h-full"
            >
              <Image
                fill
                src={project.image}
                alt={project.name}
                sizes={
                  project.featured
                    ? "(max-width: 768px) 100vw, 1100px"
                    : "(max-width: 768px) 100vw, 540px"
                }
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </a>
          ) : (
            <Image
              fill
              src={project.image}
              alt={project.name}
              sizes="(max-width: 768px) 100vw, 540px"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          )}
        </div>

        {/* Elevated Z-Plane Content Body */}
        <div className="flex flex-col flex-1 p-5 sm:p-6 gap-4 translate-z-10">
          <div className="flex items-start justify-between gap-3">
            <div>
              {project.featuredBadge && (
                <span className="inline-flex items-center gap-1.5 mb-2 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {project.featuredBadge}
                </span>
              )}
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-surface/80 hover:border-primary hover:text-primary font-mono text-[11px] text-foreground transition-colors"
                >
                  <span>Live</span>
                  <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
                </a>
              )}
              {project.codeLink && (
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-surface/80 hover:border-foreground/40 font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FaGithub className="w-3 h-3" />
                  <span>Code</span>
                </a>
              )}
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/60">
            {project.tags.map((tag) => {
              const isSelected = activeTag === tag;
              if (onTagClick) {
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onTagClick(tag)}
                    className={cn(
                      "px-2 py-0.5 rounded-md font-mono text-[11px] border transition-colors",
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-surface/80 text-muted-foreground border-border hover:text-foreground hover:border-foreground/30",
                    )}
                  >
                    {tag}
                  </button>
                );
              }
              return (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md font-mono text-[11px] bg-surface/80 text-muted-foreground border border-border"
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </Tilt3DCard>
    </div>
  );
};
