"use client";
import { useEffect, useRef } from "react";

/** A single passive listener updates a compositor transform without React renders. */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const range =
          document.documentElement.scrollHeight - window.innerHeight;
        ref.current?.style.setProperty(
          "--reading-progress",
          `${range > 0 ? window.scrollY / range : 0}`,
        );
      });
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return <div ref={ref} className="reading-progress" aria-hidden="true" />;
}
