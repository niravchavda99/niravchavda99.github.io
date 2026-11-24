"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Tilt3DCard } from "@/src/components/motion/tilt-3d-card";

export default function CustomNotFoundPage() {
  return (
    <div className="flex items-center justify-center flex-1 px-6 pt-32 pb-24">
      <div className="max-w-md w-full">
        <Tilt3DCard
          maxTilt={12}
          className="rounded-3xl border border-border bg-card/85 backdrop-blur-xl p-8 sm:p-12 text-center shadow-2xl"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 font-mono text-[11px] uppercase tracking-[0.18em] text-primary mb-6">
            Lost in Space // 404
          </span>

          <h1 className="text-7xl sm:text-8xl font-bold font-mono tracking-tighter text-foreground mb-3">
            404
          </h1>

          <p className="text-lg font-medium text-foreground mb-2">
            Coordinates not found
          </p>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
            The requested route lies outside the mapped studio sector.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground text-sm font-medium transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Studio</span>
          </Link>
        </Tilt3DCard>
      </div>
    </div>
  );
}
