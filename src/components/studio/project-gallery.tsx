"use client";
import Image from "next/image";
import { ArrowUpRight, Code2 } from "lucide-react";
import { useState } from "react";
import {
  projects,
  type Project,
  type ProjectCategory,
} from "@/src/content/projects";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card">
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className={`project-visual ${project.color}`}
        aria-label={`Open ${project.name} website (new tab)`}
      >
        <div className="project-browser">
          <div className="browser-bar">
            <span />
            <span />
            <span />
            <i>{new URL(project.href).hostname}</i>
          </div>
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.name} application screenshot`}
              sizes="(max-width: 760px) 90vw, (max-width: 1100px) 45vw, 50vw"
              className="project-image"
            />
          ) : (
            <div className="project-placeholder">
              <span aria-hidden="true">✳</span>
              <strong>{project.name}</strong>
              <span>{project.category}</span>
            </div>
          )}
        </div>
      </a>
      <div className="project-details">
        <div className="project-meta">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.category}</span>
        </div>
        <div className="project-heading">
          <h3>
            <a href={project.href} target="_blank" rel="noreferrer">
              {project.name}
            </a>
          </h3>
          {project.source && (
            <a
              className="source-link"
              href={project.source}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name} source code`}
            >
              <Code2 size={18} />
            </a>
          )}
        </div>
        <p>{project.description}</p>
        <ul className="project-tags" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <a
          className="project-visit"
          href={project.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Explore ${project.name} (new tab)`}
        >
          Explore project <ArrowUpRight size={16} />
        </a>
      </div>
    </article>
  );
}

export function ProjectGallery({ featured = false }: { featured?: boolean }) {
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");
  const visible = featured
    ? projects.slice(0, 4)
    : projects.filter(
        (project) => filter === "All" || project.category === filter,
      );
  return (
    <>
      {!featured && (
        <div
          className="project-filters"
          role="group"
          aria-label="Filter projects"
        >
          {(["All", "Tools", "Web apps", "Experiments"] as const).map(
            (category) => (
              <button
                key={category}
                aria-pressed={filter === category}
                onClick={() => setFilter(category)}
              >
                {category}
                <span>
                  {category === "All"
                    ? projects.length
                    : projects.filter((p) => p.category === category).length}
                </span>
              </button>
            ),
          )}
        </div>
      )}
      <div
        className={`project-grid${featured ? " project-grid-featured" : ""}`}
        aria-live="polite"
        aria-atomic="false"
      >
        {visible.map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={projects.indexOf(project)}
          />
        ))}
      </div>
    </>
  );
}
