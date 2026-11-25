"use client";

import { ReactNode, useEffect, useRef } from "react";
import { animate, createScope, onScroll, stagger } from "animejs";
import { cn } from "@/src/lib/utils";

export interface HeadingTextProps {
  precedingText?: string;
  coloredText: string;
  subtitle?: string;
  rightSlot?: ReactNode;
  className?: string;
}

export function HeadingText({
  precedingText,
  coloredText,
  subtitle,
  rightSlot,
  className,
}: HeadingTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const scope = createScope({ root }).add(() => {
      animate(".anime-heading-el", {
        y: [18, 0],
        opacity: [0, 1],
        duration: 720,
        delay: stagger(80),
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
    <div
      ref={rootRef}
      className={cn(
        "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14",
        className,
      )}
    >
      <div className="max-w-xl">
        <h2 className="anime-heading-el text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-foreground">
          {precedingText && <span>{precedingText} </span>}
          <span>{coloredText}</span>
        </h2>
        {subtitle && (
          <p className="anime-heading-el mt-2.5 text-muted-foreground text-base leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {rightSlot && (
        <div className="anime-heading-el shrink-0">{rightSlot}</div>
      )}
    </div>
  );
}
