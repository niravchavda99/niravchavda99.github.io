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
    <section
      id={id}
      className={cn(
        "relative w-full scroll-mt-14 border-b border-border",
        className,
      )}
    >
      {children}
    </section>
  );
}
