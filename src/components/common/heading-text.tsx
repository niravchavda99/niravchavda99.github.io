"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";

export interface HeadingTextProps {
  index?: string;
  eyebrow?: string;
  precedingText?: string;
  coloredText: string;
  italicAccent?: string;
  subtitle?: string;
  rightSlot?: ReactNode;
  className?: string;
}

export function HeadingText({
  index,
  eyebrow,
  precedingText,
  coloredText,
  italicAccent,
  subtitle,
  rightSlot,
  className,
}: HeadingTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16",
        className,
      )}
    >
      <div className="max-w-2xl">
        {(index || eyebrow) && (
          <div className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
            {index && (
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-semibold">
                {index}
              </span>
            )}
            {eyebrow && <span>{eyebrow}</span>}
          </div>
        )}
        <h2 className="text-3xl sm:text-5xl lg:text-[3.1rem] font-semibold tracking-[-0.04em] text-foreground leading-[1.05]">
          {precedingText && <span>{precedingText} </span>}
          <span>{coloredText}</span>
          {italicAccent && (
            <>
              {" "}
              <span className="font-serif italic font-normal text-primary">
                {italicAccent}
              </span>
            </>
          )}
        </h2>
        {subtitle && (
          <p className="mt-4 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl">
            {subtitle}
          </p>
        )}
      </div>

      {rightSlot && <div className="shrink-0">{rightSlot}</div>}
    </motion.div>
  );
}
