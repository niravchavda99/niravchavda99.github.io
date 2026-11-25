"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, createAnimatable, createSpring } from "animejs";
import type { AnimatableObject } from "animejs";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimatableObject | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled || !outerRef.current) return;

    animRef.current = createAnimatable(outerRef.current, {
      x: { duration: 190, ease: "out(3)" },
      y: { duration: 190, ease: "out(3)" },
    });

    const onMove = (e: PointerEvent) => {
      animRef.current?.x(e.clientX);
      animRef.current?.y(e.clientY);

      const target = e.target as HTMLElement | null;
      const labeledEl = target?.closest?.(
        "[data-cursor]",
      ) as HTMLElement | null;
      setLabel(labeledEl?.getAttribute("data-cursor") ?? null);
    };

    const onDown = () => {
      if (badgeRef.current) {
        animate(badgeRef.current, {
          scale: 0.84,
          duration: 120,
          ease: "outQuad",
        });
      }
    };

    const onUp = () => {
      if (badgeRef.current) {
        animate(badgeRef.current, {
          scale: 1,
          ease: createSpring({ stiffness: 380, damping: 18 }),
        });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    return () => {
      animRef.current?.revert();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled]);

  useEffect(() => {
    if (!badgeRef.current) return;
    animate(badgeRef.current, {
      scale: [0.7, 1],
      opacity: [0.5, 1],
      ease: createSpring({ stiffness: 420, damping: 22 }),
    });
  }, [label]);

  if (!enabled) return null;

  return (
    <div
      ref={outerRef}
      aria-hidden="true"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
      className="fixed top-0 left-0 z-[120] pointer-events-none hidden lg:block -translate-x-1/2 -translate-y-1/2 will-change-transform"
    >
      <div ref={badgeRef} className="flex items-center justify-center">
        {label ? (
          <div className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground font-mono text-[10px] font-bold uppercase tracking-[0.16em] shadow-lg shadow-primary/30 whitespace-nowrap">
            {label}
          </div>
        ) : (
          <div className="w-4 h-4 rounded-full border border-primary/60 bg-primary/10 backdrop-blur-[1px]" />
        )}
      </div>
    </div>
  );
}
