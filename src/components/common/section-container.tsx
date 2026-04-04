import { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

export interface SectionContainerProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionContainer({
  id,
  children,
  className,
}: SectionContainerProps) {
  return (
    <div
      id={id}
      className={cn(
        "max-w-6xl mx-auto w-full px-6 sm:px-12 pt-24 pb-16",
        className,
      )}
    >
      {children}
    </div>
  );
}
