"use client";

import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { CommandPalette } from "@/src/components/command-palette/command-palette";
import { CustomCursor } from "@/src/components/motion/custom-cursor";
import { TimelineScrubberHud } from "@/src/components/motion/timeline-scrubber-hud";
import { ReactNode } from "react";

interface HomeProps {
  children: ReactNode;
}

export function Home({ children }: HomeProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground pb-11">
      {/* Anime.js Kinetic Cursor */}
      <CustomCursor />

      {/* Top Modular Instrument Header */}
      <Navbar />
      <CommandPalette />

      {/* Main animejs.com Structural Instrument Frame with Left Millimeter Ruler Gutter */}
      <div className="max-w-[1360px] w-full mx-auto flex-1 flex sm:border-x sm:border-border">
        {/* Left Vertical Millimeter Ruler Rail (Desktop) */}
        <aside
          aria-hidden="true"
          className="hidden xl:block w-8 shrink-0 border-r border-border bg-ruler-y opacity-75 select-none"
        />

        {/* Primary Stage Column */}
        <main className="flex-1 min-w-0 flex flex-col">{children}</main>
      </div>

      <Footer />

      {/* Bottom Live Scroll Timecode & Playhead Scrubber Bar */}
      <TimelineScrubberHud />
    </div>
  );
}
