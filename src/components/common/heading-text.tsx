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
    <h1
      className={cn(
        "text-slate-700 dark:text-white",
        "sm:text-5xl text-3xl font-semibold sm:leading-snug",
        "flex items-center justify-center gap-2",
        className,
      )}
    >
      {precedingText}
      <span className="blue-gradient-text font-semibold drop-shadow">
        {coloredText}
      </span>
    </h1>
  );
}
