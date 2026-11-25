"use client";

import { ReactNode, useEffect, useRef } from "react";
import {
  createScope,
  createTimeline,
  onScroll,
  scrambleText,
  stagger,
  svg,
} from "animejs";
import { cn } from "@/src/lib/utils";

export interface HeadingTextProps {
  index?: string;
  eyebrow?: string;
  precedingText?: string;
  coloredText: string;
  italicAccent?: string;
  subtitle?: string;
  rightSlot?: ReactNode;
  className?: string;
}

export function HeadingText({
  index,
  eyebrow,
  precedingText,
  coloredText,
  italicAccent,
  subtitle,
  rightSlot,
  className,
}: HeadingTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const scope = createScope({ root }).add(() => {
      const tl = createTimeline({
        autoplay: onScroll({
          target: root,
          enter: "bottom-=80 top",
        }),
        defaults: { ease: "outExpo" },
      });

      // 1. SVG accent hairline draws itself via Anime.js createDrawable
      const ruleDraw = svg.createDrawable(".anime-heading-rule");
      if (ruleDraw.length > 0) {
        tl.add(
          ruleDraw,
          {
            draw: ["0 0", "0 1"],
            duration: 900,
          },
          0,
        );
      }

      // 2. Eyebrow text decrypts via Anime.js v4.5 scrambleText
      if (eyebrowRef.current && eyebrow) {
        tl.add(
          eyebrowRef.current,
          {
            innerHTML: scrambleText({
              text: eyebrow,
              chars: "uppercase",
              revealRate: 52,
              settleDuration: 240,
            }),
            duration: 750,
          },
          60,
        );
      }

      // 3. Staggered reveal of heading lines, subtitle, and right slot
      tl.add(
        ".anime-heading-item",
        {
          y: [26, 0],
          opacity: [0, 1],
          duration: 820,
          delay: stagger(90),
        },
        80,
      );
    });

    return () => {
      scope.revert();
    };
  }, [eyebrow]);

  return (
    <div ref={rootRef} className={cn("mb-12 sm:mb-16", className)}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          {(index || eyebrow) && (
            <div className="anime-heading-item inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
              {index && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-semibold">
                  {index}
                </span>
              )}
              {eyebrow && <span ref={eyebrowRef}>{eyebrow}</span>}
            </div>
          )}

          <h2 className="anime-heading-item text-3xl sm:text-5xl lg:text-[3.1rem] font-semibold tracking-[-0.04em] text-foreground leading-[1.05]">
            {precedingText && <span>{precedingText} </span>}
            <span>{coloredText}</span>
            {italicAccent && (
              <>
                {" "}
                <span className="font-serif italic font-normal text-primary">
                  {italicAccent}
                </span>
              </>
            )}
          </h2>

          {subtitle && (
            <p className="anime-heading-item mt-4 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl">
              {subtitle}
            </p>
          )}
        </div>

        {rightSlot && (
          <div className="anime-heading-item shrink-0">{rightSlot}</div>
        )}
      </div>

      {/* Anime.js Drawable Precision Vector Divider */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 6"
        preserveAspectRatio="none"
        className="mt-7 w-full h-[3px] overflow-visible"
      >
        <line
          className="anime-heading-rule"
          x1="0"
          y1="3"
          x2="1000"
          y2="3"
          stroke="hsl(var(--border))"
          strokeWidth="1.5"
        />
        <line
          className="anime-heading-rule"
          x1="0"
          y1="3"
          x2="180"
          y2="3"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
