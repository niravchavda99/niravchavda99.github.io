"use client";

import { activities } from "@/src/data/activities";
import React, { useEffect, useRef } from "react";
import { animate, createScope, onScroll, stagger } from "animejs";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";

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
      animate(".anime-act-card", {
        y: [22, 0],
        opacity: [0, 1],
        duration: 720,
        delay: stagger(100),
        ease: "outExpo",
        autoplay: onScroll({
          target: root,
          enter: "bottom-=70 top",
        }),
      });
    });

    return () => {
      scope.revert();
    };
  }, []);

  return (
    <SectionContainer id="activities">
      <HeadingText
        coloredText="Activities"
        subtitle="Writing, open engineering labs, and mentorship beyond day-to-day product work."
      />

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {activities.map((activity) => (
          <article
            key={activity.title}
            className="anime-act-card rounded-3xl border border-border bg-card p-6 sm:p-7 flex flex-col justify-between gap-4"
          >
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-surface text-xs text-muted-foreground mb-4">
                {activity.subtitle}
              </span>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {activity.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activity.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Activities;
