"use client";

import React from "react";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { Maximize2 } from "lucide-react";
import { Project } from "@/src/data/projects";
import Image from "next/image";
import { cn } from "@/src/lib/utils";

export interface ProjectCardProps {
  project: Project;
  index?: number;
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
  onPreview,
}: ProjectCardProps) => {
  const hostname = formatHostname(project.link ?? project.codeLink);
  const indexLabel =
    typeof index === "number" ? String(index).padStart(2, "0") : "00";

  return (
    <article
      className={cn(
        "group flex flex-col h-full border border-border bg-card hover:border-[#FF4B4B] transition-colors",
        project.featured && "md:col-span-2",
      )}
    >
      {/* Instrument Window Bar */}
      <div className="flex items-center justify-between gap-3 px-4 h-10 border-b border-border bg-surface/60 font-mono text-[11px]">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-2 h-2 bg-[#FF4B4B] shrink-0" />
          <span className="font-bold text-foreground">KF-{indexLabel}</span>
          <span className="text-border">/</span>
          <span className="text-muted-foreground truncate">{hostname}</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {onPreview && (
            <button
              type="button"
              onClick={() => onPreview(project)}
              aria-label={`Inspect ${project.name} screenshot`}
              title="Expand preview"
              className="w-7 h-7 flex items-center justify-center border border-transparent hover:border-border hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
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
              className="w-7 h-7 flex items-center justify-center border border-transparent hover:border-border hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
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
              className="w-7 h-7 flex items-center justify-center text-[#FF4B4B] hover:bg-[#FF4B4B] hover:text-[#1D1C1B] transition-colors"
            >
              <FaArrowUpRightFromSquare className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Media Viewport */}
      <div
        className={cn(
          "relative overflow-hidden bg-muted border-b border-border",
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
                  : "(max-width: 768px) 100vw, 560px"
              }
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </a>
        ) : (
          <Image
            fill
            src={project.image}
            alt={project.name}
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 gap-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-[#FF4B4B] transition-colors">
            {project.link ? (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                {project.name}
              </a>
            ) : (
              project.name
            )}
          </h3>

          <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FF4B4B] text-[#1D1C1B] font-bold hover:bg-[#FFC730] transition-colors"
              >
                <span>LIVE</span>
                <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
              </a>
            )}
            {project.codeLink && (
              <a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-border bg-surface text-foreground hover:bg-background transition-colors"
              >
                <FaGithub className="w-3 h-3" />
                <span>CODE</span>
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {project.description}
        </p>
      </div>

      {/* Tags Strip */}
      <div className="px-5 py-3 border-t border-border bg-surface/35 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 font-mono text-[10px] bg-background text-muted-foreground border border-border"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};
