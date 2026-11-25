"use client";

import { ReactNode, useEffect, useRef } from "react";
import {
  createScope,
  createTimeline,
  onScroll,
  scrambleText,
  stagger,
} from "animejs";
import { cn } from "@/src/lib/utils";

export interface HeadingTextProps {
  index?: string;
  eyebrow?: string;
  precedingText?: string;
  coloredText: string;
  italicAccent?: string;
  subtitle?: string;
  signalColor?: string;
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
  signalColor = "#FF4B4B",
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
          enter: "bottom-=70 top",
        }),
        defaults: { ease: "outExpo" },
      });

      if (eyebrowRef.current && eyebrow) {
        tl.add(
          eyebrowRef.current,
          {
            innerHTML: scrambleText({
              text: eyebrow,
              chars: "uppercase",
              revealRate: 55,
              settleDuration: 220,
            }),
            duration: 680,
          },
          0,
        );
      }

      tl.add(
        ".anime-ch-reveal",
        {
          y: [22, 0],
          opacity: [0, 1],
          duration: 750,
          delay: stagger(80),
        },
        40,
      );
    });

    return () => {
      scope.revert();
    };
  }, [eyebrow]);

  return (
    <div ref={rootRef} className={cn("border-b border-border", className)}>
      {/* Top Module Track Strip with Millimeter Ruler */}
      <div className="px-5 sm:px-8 lg:px-10 h-10 border-b border-border bg-surface/50 flex items-center justify-between gap-4 font-mono text-[11px]">
        <div className="flex items-center gap-2.5">
          <span
            style={{ backgroundColor: signalColor }}
            className="w-2.5 h-2.5 inline-block shrink-0"
          />
          {index && (
            <span style={{ color: signalColor }} className="font-bold">
              TRACK {index}
            </span>
          )}
          {eyebrow && (
            <>
              <span className="text-border">/</span>
              <span
                ref={eyebrowRef}
                className="uppercase tracking-[0.16em] text-foreground"
              >
                {eyebrow}
              </span>
            </>
          )}
        </div>

        <div className="hidden sm:block flex-1 max-w-xs h-full bg-ruler-x opacity-65" />
      </div>

      {/* Main Chapter Display Header */}
      <div className="px-5 sm:px-8 lg:px-10 py-10 sm:py-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="anime-ch-reveal text-3xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-[-0.045em] text-foreground leading-[1.02]">
            {precedingText && <span>{precedingText} </span>}
            <span>{coloredText}</span>
            {italicAccent && (
              <>
                {" "}
                <span
                  style={{ color: signalColor }}
                  className="font-normal tracking-[-0.03em]"
                >
                  {italicAccent}
                </span>
              </>
            )}
          </h2>

          {subtitle && (
            <p className="anime-ch-reveal mt-3.5 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl">
              {subtitle}
            </p>
          )}
        </div>

        {rightSlot && (
          <div className="anime-ch-reveal shrink-0">{rightSlot}</div>
        )}
      </div>
    </div>
  );
}
