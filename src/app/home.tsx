"use client";

import { ArrowUp } from "lucide-react";
import { animate, createSpring } from "animejs";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { CommandPalette } from "@/src/components/command-palette/command-palette";
import { ReactNode, useEffect, useRef, useState } from "react";

interface HomeProps {
  children: ReactNode;
}

export function Home({ children }: HomeProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const topBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 520);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!topBtnRef.current) return;
    animate(topBtnRef.current, {
      opacity: showScrollTop ? 1 : 0,
      scale: showScrollTop ? 1 : 0.75,
      y: showScrollTop ? 0 : 12,
      ease: createSpring({ stiffness: 280, damping: 22 }),
    });
  }, [showScrollTop]);

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground">
      {/* Calm, subtle top ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full bg-primary/[0.045] blur-[130px] -z-10"
      />

      <Navbar />
      <CommandPalette />

      <main className="max-w-5xl w-full mx-auto flex-1 flex flex-col px-5 sm:px-8">
        {children}
      </main>

      <Footer />

      <button
        ref={topBtnRef}
        type="button"
        style={{
          opacity: 0,
          pointerEvents: showScrollTop ? "auto" : "none",
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll back to top"
        className="fixed bottom-6 right-6 z-40 h-11 w-11 rounded-full border border-border bg-card/90 backdrop-blur-md text-muted-foreground hover:text-foreground shadow-lg flex items-center justify-center transition-colors"
      >
        <ArrowUp size={16} />
      </button>
    </div>
  );
}
