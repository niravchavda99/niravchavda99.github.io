"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { animate, createScope, onScroll, stagger } from "animejs";
import { projects } from "@/src/data/projects";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import { ProjectItem } from "@/src/app/projects/project-item/project-item";

export default function SelectedWork() {
  const gridRef = useRef<HTMLDivElement>(null);
  const featured = projects.slice(0, 4);

  useEffect(() => {
    const root = gridRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const scope = createScope({ root }).add(() => {
      animate(".anime-selected-card", {
        y: [28, 0],
        opacity: [0, 1],
        duration: 780,
        delay: stagger(100),
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

  return (
    <SectionContainer id="work">
      <HeadingText
        coloredText="Selected Work"
        subtitle="Tools, extensions, and web apps built along the way."
        rightSlot={
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card hover:bg-surface text-sm font-medium text-foreground transition-colors"
          >
            <span>All {projects.length} projects</span>
            <ArrowRight size={14} />
          </Link>
        }
      />

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featured.map((project) => (
          <div key={project.name} className="anime-selected-card">
            <ProjectItem project={project} />
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
