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
        "relative w-full scroll-mt-24 px-5 sm:px-8 lg:px-10 py-20 sm:py-28",
        className,
      )}
    >
      {children}
    </section>
  );
}
