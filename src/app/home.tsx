"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { CommandPalette } from "@/src/components/command-palette/command-palette";
import { SpatialScene3D } from "@/src/components/motion/spatial-scene-3d";
import { CustomCursor } from "@/src/components/motion/custom-cursor";
import { ReactNode, useEffect, useState } from "react";

interface HomeProps {
  children: ReactNode;
}

export function Home({ children }: HomeProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 480);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/25">
      {/* Subtle perspective spatial grid */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 bg-spatial-grid opacity-30 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_35%,#000_35%,transparent_100%)]"
      />

      {/* Live 60fps 3D Tensegrity Sculpture & Warp Starfield */}
      <SpatialScene3D />

      {/* Spring-Physics Kinetic Cursor Follower (Desktop) */}
      <CustomCursor />

      {/* Floating Spatial Dock & Command HUD */}
      <Navbar />
      <CommandPalette />

      {/* Spatial Content Layer */}
      <main className="relative z-10 max-w-6xl w-full mx-auto flex-1 flex flex-col">
        {children}
      </main>

      <div className="relative z-10">
        <Footer />
      </div>

      {/* Spring-Animated Back-to-Top Capsule */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.7, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 16 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 360, damping: 24 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll back to top"
            className="fixed bottom-6 right-6 z-40 h-11 w-11 rounded-full border border-border bg-card/90 backdrop-blur-md text-foreground shadow-xl flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
