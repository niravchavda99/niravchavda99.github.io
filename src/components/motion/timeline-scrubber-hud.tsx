"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { createAnimatable } from "animejs";
import type { AnimatableObject } from "animejs";

const TRACK_CHAPTERS = [
  { id: "about", code: "00", label: "ENGINE", color: "#FF4B4B" },
  { id: "work", code: "01", label: "WORKS", color: "#FFC730" },
  { id: "experience", code: "02", label: "TIMELINE", color: "#5CE68A" },
  { id: "skills", code: "03", label: "MATRIX", color: "#38BDF8" },
  { id: "activities", code: "04", label: "LABS", color: "#C084FC" },
];

function formatTimecode(progress: number): string {
  // Maps 0..1 page scroll to a 60fps 00:00:00 -> 04:00:00 studio timeline counter
  const totalFrames = Math.round(progress * 240 * 60);
  const mins = Math.floor(totalFrames / 3600);
  const secs = Math.floor((totalFrames % 3600) / 60);
  const frames = totalFrames % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
}

export function TimelineScrubberHud() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const [timecode, setTimecode] = useState("00:00:00");
  const [activeTrack, setActiveTrack] = useState("about");
  const playheadRef = useRef<HTMLDivElement>(null);
  const velocityBarRef = useRef<HTMLDivElement>(null);
  const scrubberTrackRef = useRef<HTMLDivElement>(null);
  const playheadAnim = useRef<AnimatableObject | null>(null);
  const velAnim = useRef<AnimatableObject | null>(null);

  useEffect(() => {
    if (playheadRef.current) {
      playheadAnim.current = createAnimatable(playheadRef.current, {
        left: { unit: "%", duration: 140, ease: "out(3)" },
      });
    }
    if (velocityBarRef.current) {
      velAnim.current = createAnimatable(velocityBarRef.current, {
        scaleX: { duration: 180, ease: "out(3)" },
      });
    }
    return () => {
      playheadAnim.current?.revert();
      velAnim.current?.revert();
    };
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let decay: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      const y = window.scrollY;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const progress = Math.min(1, Math.max(0, y / maxScroll));

      setTimecode(formatTimecode(progress));
      playheadAnim.current?.left(progress * 100);

      const speed = Math.min(1, Math.abs(y - lastY) / 65);
      lastY = y;
      velAnim.current?.scaleX(speed);

      if (decay) clearTimeout(decay);
      decay = setTimeout(() => {
        velAnim.current?.scaleX(0.04);
      }, 110);

      if (isHome) {
        let current = "about";
        for (const ch of TRACK_CHAPTERS) {
          const el = document.getElementById(ch.id);
          if (
            el &&
            el.getBoundingClientRect().top <= window.innerHeight * 0.42
          ) {
            current = ch.id;
          }
        }
        setActiveTrack(current);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      if (decay) clearTimeout(decay);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  const handleScrubClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = scrubberTrackRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width),
    );
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: ratio * maxScroll, behavior: "smooth" });
  };

  const jumpToChapter = (id: string) => {
    if (!isHome) {
      router.push(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur-md select-none">
      <div className="max-w-[1360px] mx-auto sm:border-x sm:border-border h-11 flex items-center divide-x divide-border font-mono text-[10px]">
        {/* Left Timecode & Velocity Telemetry */}
        <div className="px-3 sm:px-4 h-full flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center gap-1.5 text-foreground font-semibold tabular-nums">
            <span className="w-2 h-2 rounded-full bg-[#FF4B4B] animate-pulse" />
            <span>{timecode}</span>
          </span>

          <div className="hidden lg:flex items-center gap-1.5 text-muted-foreground">
            <span>VEL</span>
            <div className="w-12 h-1.5 bg-surface overflow-hidden">
              <div
                ref={velocityBarRef}
                style={{ transform: "scaleX(0.05)" }}
                className="h-full w-full origin-left bg-[#FFC730]"
              />
            </div>
          </div>
        </div>

        {/* Center Interactive Millimeter Scrubber Ruler & Chapter Tracks */}
        <div className="flex-1 h-full flex flex-col justify-between relative overflow-hidden">
          {/* Chapter Quick-Seek Buttons */}
          <div className="hidden md:grid grid-cols-5 h-[22px] divide-x divide-border/60">
            {TRACK_CHAPTERS.map((ch) => {
              const isAct = isHome && activeTrack === ch.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => jumpToChapter(ch.id)}
                  className="px-2.5 flex items-center gap-1.5 text-left hover:bg-surface/80 transition-colors truncate"
                >
                  <span
                    style={{ backgroundColor: ch.color }}
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                  />
                  <span
                    className={
                      isAct
                        ? "text-foreground font-bold"
                        : "text-muted-foreground"
                    }
                  >
                    {ch.code} {ch.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Click-to-Seek Millimeter Tick Ruler */}
          <div
            ref={scrubberTrackRef}
            onClick={handleScrubClick}
            data-cursor="SCRUB"
            title="Click anywhere to scrub timeline"
            className="relative flex-1 w-full bg-ruler-x cursor-ew-resize"
          >
            {/* Red Playhead Needle */}
            <div
              ref={playheadRef}
              style={{ left: "0%" }}
              className="pointer-events-none absolute top-[-22px] bottom-0 w-[2px] bg-[#FF4B4B] z-20"
            >
              <span className="absolute -top-0.5 -left-[4px] w-2.5 h-2 bg-[#FF4B4B] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
            </div>
          </div>
        </div>

        {/* Right Back-to-Top Cell */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Jump to start of timeline"
          className="px-3 sm:px-4 h-full flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:bg-surface transition-colors shrink-0"
        >
          <span>00:00</span>
          <ArrowUp size={12} />
        </button>
      </div>
    </div>
  );
}
