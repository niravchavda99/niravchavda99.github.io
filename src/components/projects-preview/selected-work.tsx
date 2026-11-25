"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { animate, createScope, onScroll } from "animejs";
import { projects } from "@/src/data/projects";
import { HeadingText } from "@/src/components/common/heading-text";

export default function SelectedWork() {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const [activeFrame, setActiveFrame] = useState(1);

  useEffect(() => {
    const track = scrollTrackRef.current;
    const strip = stripRef.current;
    if (!track || !strip) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    const scope = createScope({ root: track }).add(() => {
      const getMaxTranslate = () => {
        const viewportW = track.clientWidth;
        const stripW = strip.scrollWidth;
        return -Math.max(0, stripW - viewportW + 80);
      };

      animate(strip, {
        x: () => [0, getMaxTranslate()],
        ease: "linear",
        autoplay: onScroll({
          target: track,
          enter: "top top+=56",
          leave: "bottom bottom",
          sync: 0.25,
          onUpdate: (self) => {
            const p = Math.max(0, Math.min(1, self.progress));
            const idx = Math.min(
              projects.length,
              Math.max(1, Math.round(p * (projects.length - 1)) + 1),
            );
            setActiveFrame(idx);
            if (progressFillRef.current) {
              progressFillRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
            }
          },
        }),
      });
    });

    return () => {
      scope.revert();
    };
  }, []);

  return (
    <section
      id="work"
      className="relative w-full scroll-mt-14 border-b border-border"
    >
      <HeadingText
        index="01"
        eyebrow="SCROLL-SYNCED REEL"
        coloredText="Shipped"
        italicAccent="artifacts."
        signalColor="#FFC730"
        subtitle="Scroll vertically to scrub the horizontal project timeline — Chrome extensions, financial tools, web apps, and Three.js experiments."
        rightSlot={
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 h-10 px-4 border border-border bg-card hover:bg-[#FFC730] hover:text-[#1D1C1B] hover:border-[#FFC730] font-mono text-xs uppercase tracking-[0.12em] transition-colors"
          >
            <span>Open Full Archive [{projects.length}]</span>
            <ArrowRight size={13} />
          </Link>
        }
      />

      {/* Desktop Scroll-Pinned Horizontal Filmstrip Stage (animejs.com signature!) */}
      <div ref={scrollTrackRef} className="lg:h-[270vh] relative">
        <div className="lg:sticky lg:top-14 lg:h-[calc(100vh-6.25rem)] flex flex-col justify-between overflow-hidden bg-dot-matrix">
          {/* Sub-bar Frame Counter + Scrub Progress */}
          <div className="px-5 sm:px-8 lg:px-10 h-10 border-b border-border bg-card/85 backdrop-blur-sm flex items-center justify-between gap-4 font-mono text-[11px]">
            <div className="flex items-center gap-3">
              <span className="text-[#FFC730] font-bold">
                FRAME {String(activeFrame).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
              <span className="hidden sm:inline text-muted-foreground">
                · SCROLL TO SCRUB TRACK
              </span>
            </div>

            <div className="hidden lg:block w-48 h-1.5 bg-surface overflow-hidden">
              <div
                ref={progressFillRef}
                style={{ transform: "scaleX(0)" }}
                className="h-full w-full origin-left bg-[#FFC730]"
              />
            </div>
          </div>

          {/* Horizontal Keyframe Reel (Scrubbed on Desktop, Touch-Scrollable on Mobile) */}
          <div className="flex-1 flex items-center py-8 lg:py-0 overflow-x-auto lg:overflow-visible">
            <div
              ref={stripRef}
              className="flex items-stretch gap-5 px-5 sm:px-8 lg:px-10 will-change-transform"
            >
              {projects.map((project, idx) => (
                <article
                  key={project.name}
                  className="group w-[300px] sm:w-[390px] lg:w-[430px] shrink-0 border border-border bg-card flex flex-col justify-between hover:border-[#FFC730] transition-colors"
                >
                  <div>
                    {/* Keyframe Card Top Strip */}
                    <div className="px-4 h-9 border-b border-border bg-surface/60 flex items-center justify-between font-mono text-[11px]">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#FFC730]" />
                        <span className="font-bold text-foreground">
                          KF-{String(idx + 1).padStart(2, "0")}
                        </span>
                      </span>

                      <div className="flex items-center gap-2">
                        {project.codeLink && (
                          <a
                            href={project.codeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.name} source code`}
                            className="text-muted-foreground hover:text-foreground transition-colors"
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
                            className="inline-flex items-center gap-1 text-[#FFC730] hover:underline"
                          >
                            <span>LIVE</span>
                            <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Screenshot */}
                    <div className="relative aspect-[16/10] bg-muted border-b border-border overflow-hidden">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full h-full"
                        >
                          <Image
                            fill
                            src={project.image}
                            alt={project.name}
                            sizes="430px"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        </a>
                      ) : (
                        <Image
                          fill
                          src={project.image}
                          alt={project.name}
                          sizes="430px"
                          className="object-cover object-top"
                        />
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-[#FFC730] transition-colors">
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
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Tags Footer */}
                  <div className="px-5 py-3 border-t border-border bg-surface/30 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 border border-border bg-background font-mono text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Bottom Millimeter Ruler Strip */}
          <div className="hidden lg:block h-5 border-t border-border bg-surface/40 bg-ruler-x" />
        </div>
      </div>
    </section>
  );
}
