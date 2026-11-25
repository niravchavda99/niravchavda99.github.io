"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { animate, createSpring, stagger } from "animejs";
import { Project, projects } from "@/src/data/projects";
import { ProjectItem } from "./project-item/project-item";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import { cn } from "@/src/lib/utils";

export function ProjectsExplorer() {
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);
  const modalBackdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const container = gridRef.current;
    if (!container) return;
    const items = container.querySelectorAll(".anime-project-card");
    if (!items.length) return;
    animate(items, {
      y: [24, 0],
      opacity: [0, 1],
      delay: stagger(70),
      duration: 680,
      ease: "outExpo",
    });
  }, []);

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
        ease: createSpring({ stiffness: 300, damping: 24 }),
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
    <SectionContainer id="projects" className="pt-32 sm:pt-36">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
      </div>

      <HeadingText
        coloredText="Projects"
        subtitle="A selection of things I've built — developer tools, Chrome extensions, web apps, and 3D experiments."
      />

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.name}
            className={cn(
              "anime-project-card",
              project.featured && "md:col-span-2",
            )}
          >
            <ProjectItem project={project} onPreview={setPreviewProject} />
          </div>
        ))}
      </div>

      {/* Portal Lightbox Modal — rendered on document.body cleanly above navbar */}
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
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
              onClick={() => setPreviewProject(null)}
            />
            <div
              ref={modalCardRef}
              className="relative z-10 w-full max-w-4xl max-h-[88vh] flex flex-col rounded-3xl border border-border bg-card overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
                <h3 className="font-semibold text-lg text-foreground truncate pr-4">
                  {previewProject.name}
                </h3>
                <button
                  type="button"
                  onClick={() => setPreviewProject(null)}
                  aria-label="Close preview"
                  className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="relative w-full h-[46vh] sm:h-[56vh] bg-surface/60 shrink-0">
                <Image
                  fill
                  src={previewProject.image}
                  alt={previewProject.name}
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-contain p-3 sm:p-5"
                />
              </div>

              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border overflow-y-auto">
                <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                  {previewProject.description}
                </p>
                <div className="flex items-center gap-2.5 shrink-0">
                  {previewProject.codeLink && (
                    <a
                      href={previewProject.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface text-sm font-medium text-foreground hover:bg-muted transition-colors"
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
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground text-sm font-medium transition-colors"
                    >
                      <span>Open Live</span>
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
