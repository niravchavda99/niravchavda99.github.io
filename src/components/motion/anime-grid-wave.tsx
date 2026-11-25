"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { animate, createScope, createSpring, stagger } from "animejs";

const COLS = 16;
const ROWS = 4;
const TOTAL = COLS * ROWS;
const PALETTE = ["#FF4B4B", "#FFC730", "#5CE68A", "#38BDF8", "#C084FC"];

export function AnimeStaggerPlayground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const colorIdxRef = useRef(0);
  const lastHoverCell = useRef<number>(-1);

  const fireWaveFrom = useCallback((originIndex: number, strong = false) => {
    const root = rootRef.current;
    if (!root) return;
    const cells = root.querySelectorAll(".stagger-play-cell");
    if (!cells.length) return;

    const accent = PALETTE[colorIdxRef.current % PALETTE.length];
    colorIdxRef.current += 1;

    animate(cells, {
      scale: [
        { to: strong ? 1.65 : 1.38, duration: 180, ease: "outQuad" },
        {
          to: 1,
          ease: createSpring({ stiffness: 260, damping: 15 }),
        },
      ],
      rotate: [
        { to: strong ? 90 : 45, duration: 220, ease: "outCubic" },
        { to: 0, duration: 480, ease: "outElastic(1, .6)" },
      ],
      backgroundColor: [
        { to: accent, duration: 150, ease: "outQuad" },
        { to: "rgba(150, 144, 136, 0.22)", duration: 650, ease: "outCubic" },
      ],
      delay: stagger(strong ? 28 : 22, {
        grid: [COLS, ROWS],
        from: originIndex,
      }),
    });
  }, []);

  // Gentle autonomous idle wave every few seconds so it's immediately alive
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const scope = createScope({ root }).add(() => {
      // Initial center burst on mount
      const initTimer = setTimeout(() => {
        fireWaveFrom(Math.floor(TOTAL / 2), false);
      }, 650);

      const interval = setInterval(() => {
        const randomOrigin = Math.floor(Math.random() * TOTAL);
        fireWaveFrom(randomOrigin, false);
      }, 4800);

      return () => {
        clearTimeout(initTimer);
        clearInterval(interval);
      };
    });

    return () => {
      scope.revert();
    };
  }, [fireWaveFrom]);

  return (
    <div
      ref={rootRef}
      className="relative border-t border-border bg-surface/35 px-5 sm:px-8 lg:px-10 py-5 select-none"
    >
      <div className="flex items-center justify-between mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#FFC730]" />
          INTERACTIVE STAGGER MATRIX // HOVER OR CLICK ANY NODE
        </span>
        <span className="hidden sm:inline">
          GRID [{COLS} × {ROWS}] · STAGGER(FROM: INDEX)
        </span>
      </div>

      <div
        data-cursor="RIPPLE"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
        }}
        className="grid gap-2 sm:gap-2.5 py-1 cursor-pointer"
      >
        {Array.from({ length: TOTAL }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Trigger stagger wave from node ${idx + 1}`}
            onMouseEnter={() => {
              if (lastHoverCell.current !== idx) {
                lastHoverCell.current = idx;
                if (idx % 2 === 0) fireWaveFrom(idx, false);
              }
            }}
            onClick={() => fireWaveFrom(idx, true)}
            className="h-5 sm:h-6 flex items-center justify-center group focus:outline-none"
          >
            <span
              style={{ backgroundColor: "rgba(150, 144, 136, 0.22)" }}
              className="stagger-play-cell w-2.5 h-2.5 sm:w-3 sm:h-3 block will-change-transform"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
