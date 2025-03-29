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
        "max-w-6xl mx-auto sm:p-16 pt-16 pb-12 px-8",
        "min-h-[calc(100vh-80px)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
