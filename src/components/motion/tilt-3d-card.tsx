"use client";

import React, { useEffect, useRef } from "react";
import { animate, createAnimatable, createSpring } from "animejs";
import type { AnimatableObject } from "animejs";
import { cn } from "@/src/lib/utils";

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
  cursorLabel?: string;
}

export function Tilt3DCard({
  children,
  className,
  maxTilt = 9,
  glareOpacity = 0.16,
  cursorLabel,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const animatableRef = useRef<AnimatableObject | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    animatableRef.current = createAnimatable(el, {
      rotateX: { unit: "deg", duration: 420, ease: "out(3)" },
      rotateY: { unit: "deg", duration: 420, ease: "out(3)" },
    });

    return () => {
      animatableRef.current?.revert();
      animatableRef.current = null;
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el || !animatableRef.current) return;
    const rect = el.getBoundingClientRect();
    const nx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const ny = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    const rx = (0.5 - ny) * 2 * maxTilt;
    const ry = (nx - 0.5) * 2 * maxTilt;

    animatableRef.current.rotateX(rx);
    animatableRef.current.rotateY(ry);

    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(480px circle at ${(nx * 100).toFixed(1)}% ${(ny * 100).toFixed(1)}%, rgba(255, 110, 64, 0.3), rgba(255, 255, 255, 0.08) 40%, transparent 75%)`;
    }
  };

  const handlePointerEnter = () => {
    if (glareRef.current) {
      animate(glareRef.current, {
        opacity: glareOpacity,
        duration: 280,
        ease: "outQuad",
      });
    }
  };

  const handlePointerLeave = () => {
    const el = cardRef.current;
    if (el) {
      animate(el, {
        rotateX: 0,
        rotateY: 0,
        ease: createSpring({ stiffness: 200, damping: 18 }),
      });
    }
    if (glareRef.current) {
      animate(glareRef.current, {
        opacity: 0,
        duration: 360,
        ease: "outQuad",
      });
    }
  };

  return (
    <div className="perspective-1600 h-full">
      <div
        ref={cardRef}
        data-cursor={cursorLabel}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{ transformStyle: "preserve-3d" }}
        className={cn("relative h-full will-change-transform", className)}
      >
        {children}

        {/* Dynamic Specular 3D Light Glare Layer */}
        <div
          ref={glareRef}
          aria-hidden="true"
          style={{ opacity: 0 }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-30 mix-blend-plus-lighter"
        />
      </div>
    </div>
  );
}
