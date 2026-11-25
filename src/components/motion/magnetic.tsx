"use client";

import React, { useEffect, useRef } from "react";
import { animate, createAnimatable, createSpring } from "animejs";
import type { AnimatableObject } from "animejs";
import { cn } from "@/src/lib/utils";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({
  children,
  strength = 0.28,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimatableObject | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    animRef.current = createAnimatable(ref.current, {
      x: { duration: 260, ease: "out(3)" },
      y: { duration: 260, ease: "out(3)" },
    });
    return () => {
      animRef.current?.revert();
      animRef.current = null;
    };
  }, []);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !animRef.current) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    animRef.current.x(dx);
    animRef.current.y(dy);
  };

  const onPointerLeave = () => {
    if (!ref.current) return;
    animate(ref.current, {
      x: 0,
      y: 0,
      ease: createSpring({ stiffness: 280, damping: 14, mass: 0.6 }),
    });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("inline-flex will-change-transform", className)}
    >
      {children}
    </div>
  );
}
