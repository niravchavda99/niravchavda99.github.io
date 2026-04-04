import { cn } from "@/src/lib/utils";

export interface HeadingTextProps {
  precedingText?: string;
  coloredText: string;
  className?: string;
}

export function HeadingText({
  precedingText,
  coloredText,
  className,
}: HeadingTextProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="font-mono text-cyan-400/50 dark:text-cyan-400/40 text-2xl select-none font-light">
        //
      </span>
      <h2 className="text-slate-800 dark:text-slate-100 text-3xl sm:text-4xl font-bold tracking-tight">
        {precedingText && <span>{precedingText} </span>}
        <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          {coloredText}
        </span>
      </h2>
    </div>
  );
}
