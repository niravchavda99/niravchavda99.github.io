"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

interface VelocityMarqueeProps {
  items: string[];
  baseVelocity?: number;
}

function wrap(min: number, max: number, v: number): number {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export function VelocityMarquee({
  items,
  baseVelocity = -2.2,
}: VelocityMarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 380,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4.5], {
    clamp: false,
  });
  const skewX = useTransform(smoothVelocity, [-1200, 1200], [6, -6]);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * Math.abs(velocityFactor.get());
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden border-y border-border/80 bg-surface/50 backdrop-blur-sm py-3.5 select-none"
    >
      <motion.div
        style={{ x, skewX }}
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
      </motion.div>
    </div>
  );
}
