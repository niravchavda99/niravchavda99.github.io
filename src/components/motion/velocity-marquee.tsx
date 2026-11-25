"use client";

import React, { useEffect, useRef } from "react";
import { animate, createAnimatable, createScope } from "animejs";

interface VelocityMarqueeProps {
  items: string[];
  baseVelocity?: number;
}

export function VelocityMarquee({
  items,
  baseVelocity = 1,
}: VelocityMarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const baseRate = Math.max(0.4, Math.abs(baseVelocity) * 0.55);

    const scope = createScope({ root }).add(() => {
      // Infinite seamless Anime.js v4 ticker
      const loopAnim = animate(track, {
        x: ["0%", "-50%"],
        duration: 28000,
        ease: "linear",
        loop: true,
      });
      loopAnim.speed = baseRate;

      const skewAnim = createAnimatable(track, {
        skewX: { unit: "deg", duration: 320, ease: "out(3)" },
      });

      let lastY = window.scrollY;
      let decayTimer: ReturnType<typeof setTimeout> | null = null;

      const handleScroll = () => {
        const currentY = window.scrollY;
        const delta = currentY - lastY;
        lastY = currentY;

        const boost = Math.min(4.5, Math.abs(delta) * 0.08);
        loopAnim.speed = baseRate + boost;
        skewAnim.skewX(Math.max(-6, Math.min(6, -delta * 0.12)));

        if (decayTimer) clearTimeout(decayTimer);
        decayTimer = setTimeout(() => {
          animate(loopAnim, {
            speed: baseRate,
            duration: 500,
            ease: "outCubic",
          });
          skewAnim.skewX(0);
        }, 90);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        if (decayTimer) clearTimeout(decayTimer);
        window.removeEventListener("scroll", handleScroll);
      };
    });

    return () => {
      scope.revert();
    };
  }, [baseVelocity]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="relative w-full overflow-hidden border-y border-border/80 bg-surface/50 backdrop-blur-sm py-3.5 select-none"
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap w-max will-change-transform"
      >
        {[0, 1, 2, 3].map((rep) => (
          <div key={rep} className="flex items-center">
            {items.map((item, idx) => (
              <span
                key={`${rep}-${idx}`}
                className="inline-flex items-center gap-5 mx-5 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground"
              >
                <span>{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/80" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
