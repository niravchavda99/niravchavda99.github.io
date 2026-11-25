"use client";

import React, { useEffect, useRef } from "react";
import { animate, createScope, createTimeline, stagger, svg } from "animejs";

const COLS = 15;
const ROWS = 7;
const TOTAL_CELLS = COLS * ROWS;

export function AnimeCircuitBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const scope = createScope({ root: rootRef }).add(() => {
      // 1. SVG Circuit Paths self-drawing via Anime.js v4 svg.createDrawable
      const drawables = svg.createDrawable(".anime-circuit-line");
      if (drawables.length > 0) {
        createTimeline({
          defaults: { ease: "inOutQuart" },
          loop: true,
          alternate: true,
          loopDelay: 1200,
        }).add(drawables, {
          draw: ["0 0", "0 1", "1 1"],
          opacity: [0.15, 0.65, 0.2],
          duration: 4600,
          delay: stagger(420),
        });
      }

      // 2. Orbiting telemetry spark riding an SVG path via svg.createMotionPath
      const motion1 = svg.createMotionPath("#anime-orbit-track-1");
      animate(".anime-orbit-spark-1", {
        ...motion1,
        duration: 9500,
        ease: "linear",
        loop: true,
      });

      const motion2 = svg.createMotionPath("#anime-orbit-track-2");
      animate(".anime-orbit-spark-2", {
        ...motion2,
        duration: 12500,
        reversed: true,
        ease: "linear",
        loop: true,
      });

      // 3. Signature Anime.js 2D Stagger Grid ambient wave
      animate(".anime-grid-dot", {
        scale: [
          { to: 1.85, ease: "outSine", duration: 700 },
          { to: 1, ease: "inOutQuad", duration: 1100 },
        ],
        opacity: [
          { to: 0.65, ease: "outSine", duration: 700 },
          { to: 0.16, ease: "inOutQuad", duration: 1100 },
        ],
        delay: stagger(95, { grid: [COLS, ROWS], from: "center" }),
        loop: true,
        loopDelay: 1800,
      });
    });

    return () => {
      scope.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
    >
      {/* Anime.js Drawable Architectural SVG Vector Traces */}
      <svg
        viewBox="0 0 1200 760"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full opacity-75"
      >
        {/* Circuit blueprint lines */}
        <path
          id="anime-orbit-track-1"
          className="anime-circuit-line"
          d="M -40 160 H 260 L 330 230 H 680 L 760 150 H 1240"
          stroke="hsl(var(--primary) / 0.35)"
          strokeWidth="1.2"
        />
        <path
          id="anime-orbit-track-2"
          className="anime-circuit-line"
          d="M 1240 560 H 840 L 770 490 H 410 L 340 560 H -40"
          stroke="hsl(var(--accent) / 0.32)"
          strokeWidth="1.2"
        />
        <path
          className="anime-circuit-line"
          d="M 180 -20 V 210 L 250 280 V 780"
          stroke="hsl(var(--border))"
          strokeWidth="1"
        />
        <path
          className="anime-circuit-line"
          d="M 980 -20 V 320 L 910 390 V 780"
          stroke="hsl(var(--border))"
          strokeWidth="1"
        />

        {/* Sparks riding SVG motion paths */}
        <g className="anime-orbit-spark-1">
          <circle r="3.5" fill="hsl(var(--primary))" />
          <circle r="9" fill="hsl(var(--primary) / 0.22)" />
        </g>
        <g className="anime-orbit-spark-2">
          <circle r="3" fill="hsl(var(--accent))" />
          <circle r="8" fill="hsl(var(--accent) / 0.22)" />
        </g>
      </svg>

      {/* Signature Anime.js 2D Stagger Lattice */}
      <div
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
        }}
        className="absolute inset-x-8 top-24 bottom-12 grid place-items-center opacity-60 [mask-image:radial-gradient(ellipse_65%_60%_at_50%_45%,#000_25%,transparent_100%)]"
      >
        {Array.from({ length: TOTAL_CELLS }).map((_, idx) => (
          <span
            key={idx}
            className="anime-grid-dot w-1 h-1 rounded-full bg-primary opacity-15"
          />
        ))}
      </div>
    </div>
  );
}
