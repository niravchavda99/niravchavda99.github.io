"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CustomNotFoundPage() {
  return (
    <div className="flex items-center justify-center flex-1 px-6 py-28">
      <div className="max-w-md w-full rounded-3xl border border-border bg-card p-10 text-center">
        <h1 className="text-6xl font-semibold tracking-tight text-foreground mb-3">
          404
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground text-sm font-medium transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
