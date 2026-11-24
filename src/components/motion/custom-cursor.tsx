"use client";

import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, {
    stiffness: 520,
    damping: 34,
    mass: 0.35,
  });
  const springY = useSpring(cursorY, {
    stiffness: 520,
    damping: 34,
    mass: 0.35,
  });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      const labeledEl = target?.closest?.(
        "[data-cursor]",
      ) as HTMLElement | null;
      setLabel(labeledEl?.getAttribute("data-cursor") ?? null);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: springX,
        y: springY,
      }}
      className="fixed top-0 left-0 z-[120] pointer-events-none hidden lg:block -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{
          scale: pressed ? 0.86 : label ? 1 : 1,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
        className="flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {label ? (
            <motion.div
              key="pill"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground font-mono text-[10px] font-bold uppercase tracking-[0.16em] shadow-lg shadow-primary/30 whitespace-nowrap"
            >
              {label}
            </motion.div>
          ) : (
            <motion.div
              key="ring"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="w-4 h-4 rounded-full border border-primary/60 bg-primary/10 backdrop-blur-[1px]"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
