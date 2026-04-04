"use client";

import { useEffect, useState } from "react";

export function ScrollHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-1.5 text-slate-400 dark:text-slate-600 animate-bounce pointer-events-none">
      <span className="font-mono text-xs">scroll</span>
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
        <path
          d="M1 1L6 6L11 1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
