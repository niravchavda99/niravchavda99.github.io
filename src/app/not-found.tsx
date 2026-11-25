"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CustomNotFoundPage() {
  return (
    <div className="flex items-center justify-center flex-1 px-6 py-24 bg-dot-matrix">
      <div className="max-w-md w-full border border-border bg-card p-8 sm:p-12 text-center">
        <span className="inline-flex items-center gap-2 px-2.5 py-1 border border-border bg-surface font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF4B4B] mb-6">
          <span className="w-2 h-2 bg-[#FF4B4B]" />
          ERR // FRAME_NOT_FOUND
        </span>

        <h1 className="text-7xl sm:text-8xl font-bold font-mono tracking-tighter text-foreground mb-3">
          404
        </h1>

        <p className="text-sm text-muted-foreground mb-8 font-mono">
          The requested timeline track does not exist.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 h-11 px-6 bg-[#FF4B4B] text-[#1D1C1B] hover:bg-[#FFC730] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={14} />
          <span>RETURN TO 00:00</span>
        </Link>
      </div>
    </div>
  );
}
