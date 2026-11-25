"use client";

import { activities } from "@/src/data/activities";
import React, { useEffect, useRef } from "react";
import { animate, createScope, onScroll, stagger, svg } from "animejs";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import { Tilt3DCard } from "@/src/components/motion/tilt-3d-card";

const Activities = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = gridRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const scope = createScope({ root }).add(() => {
      animate(".anime-activity-card", {
        y: [32, 0],
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 780,
        delay: stagger(120),
        ease: "outExpo",
        autoplay: onScroll({
          target: root,
          enter: "bottom-=80 top",
        }),
      });

      const rings = svg.createDrawable(".anime-activity-ring");
      if (rings.length > 0) {
        animate(rings, {
          draw: ["0 0", "0 1"],
          duration: 1600,
          delay: stagger(180),
          ease: "inOutCubic",
          autoplay: onScroll({
            target: root,
            enter: "bottom-=80 top",
          }),
        });
      }
    });

    return () => {
      scope.revert();
    };
  }, []);

  return (
    <SectionContainer id="activities">
      <HeadingText
        index="04"
        eyebrow="Beyond Engineering"
        coloredText="Labs, writing &"
        italicAccent="mentorship"
        subtitle="Engineering publications, open education labs, and student mentorship experiences beyond day-to-day product delivery."
      />

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {activities.map((activity, index) => (
          <div key={activity.title} className="anime-activity-card h-full">
            <Tilt3DCard
              maxTilt={9}
              glareOpacity={0.18}
              className="relative h-full rounded-2xl border border-border/90 bg-card/80 backdrop-blur-xl p-6 sm:p-8 overflow-hidden shadow-xl shadow-black/5 dark:shadow-black/35 flex flex-col justify-between gap-6"
            >
              {/* Anime.js Drawable SVG Orbital Corner Rings */}
              <svg
                aria-hidden="true"
                viewBox="0 0 180 180"
                fill="none"
                className="pointer-events-none absolute -right-12 -bottom-12 w-44 h-44"
              >
                <circle
                  className="anime-activity-ring"
                  cx="90"
                  cy="90"
                  r="82"
                  stroke="hsl(var(--primary) / 0.2)"
                  strokeWidth="1.2"
                />
                <circle
                  className="anime-activity-ring"
                  cx="90"
                  cy="90"
                  r="54"
                  stroke="hsl(var(--accent) / 0.25)"
                  strokeWidth="1.2"
                />
              </svg>

              <div className="relative z-10 translate-z-10">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-primary/30 bg-primary/10 font-mono text-[11px] text-primary font-medium truncate">
                    {activity.subtitle}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-foreground mb-3">
                  {activity.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </Tilt3DCard>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Activities;
