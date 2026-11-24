"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
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
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const isHovered = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 26, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothHover = useSpring(isHovered, { stiffness: 220, damping: 24 });

  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt]);
  const glareX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(smoothY, [0, 1], ["0%", "100%"]);
  const activeGlareOpacity = useTransform(
    smoothHover,
    [0, 1],
    [0, glareOpacity],
  );

  const glareBackground = useMotionTemplate`radial-gradient(480px circle at ${glareX} ${glareY}, rgba(255, 110, 64, 0.28), rgba(255, 255, 255, 0.08) 40%, transparent 75%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const ny = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handlePointerEnter = () => {
    isHovered.set(1);
  };

  const handlePointerLeave = () => {
    isHovered.set(0);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div className="perspective-1600 h-full">
      <motion.div
        ref={ref}
        data-cursor={cursorLabel}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn("relative h-full will-change-transform", className)}
      >
        {children}

        {/* Dynamic Specular 3D Light Glare Layer */}
        <motion.div
          aria-hidden="true"
          style={{
            background: glareBackground,
            opacity: activeGlareOpacity,
          }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-30 mix-blend-plus-lighter"
        />
      </motion.div>
    </div>
  );
}
