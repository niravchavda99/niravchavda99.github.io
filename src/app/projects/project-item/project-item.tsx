"use client";

import React from "react";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { Maximize2 } from "lucide-react";
import { Project } from "@/src/data/projects";
import Image from "next/image";
import { cn } from "@/src/lib/utils";

export interface ProjectCardProps {
  project: Project;
  onPreview?: (project: Project) => void;
}

export const ProjectItem = ({ project, onPreview }: ProjectCardProps) => {
  return (
    <article
      className={cn(
        "group flex flex-col h-full rounded-3xl border border-border bg-card p-3 hover:border-foreground/20 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30",
        project.featured && "md:col-span-2",
      )}
    >
      {/* Soft Inset Rounded Image */}
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden bg-surface",
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
                  ? "(max-width: 768px) 100vw, 960px"
                  : "(max-width: 768px) 100vw, 480px"
              }
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </a>
        ) : (
          <Image
            fill
            src={project.image}
            alt={project.name}
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        )}

        {onPreview && (
          <button
            type="button"
            onClick={() => onPreview(project)}
            aria-label={`Expand ${project.name} preview`}
            title="Expand preview"
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur-md border border-white/15 text-white flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
          >
            <Maximize2 size={13} />
          </button>
        )}
      </div>

      {/* Clean Spacious Body */}
      <div className="flex flex-col flex-1 px-3 pt-5 pb-3 gap-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {project.link ? (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                {project.name}
              </a>
            ) : (
              project.name
            )}
          </h3>

          <div className="flex items-center gap-2 shrink-0">
            {project.codeLink && (
              <a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} source code`}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
              >
                <FaGithub className="w-4 h-4" />
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.name}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface hover:bg-foreground hover:text-background text-xs font-medium text-foreground transition-colors"
              >
                <span>Visit</span>
                <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs bg-surface text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
