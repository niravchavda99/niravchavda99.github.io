"use client";

import { useEffect, useState } from "react";

// Internship completed July 2022, YOE counted from there
const CAREER_START = new Date(2022, 6, 1);

function calculateYOE(): string {
  const now = new Date();
  const months =
    (now.getFullYear() - CAREER_START.getFullYear()) * 12 +
    (now.getMonth() - CAREER_START.getMonth());
  return (months / 12).toFixed(1);
}

export function YoeValue() {
  const [yoe, setYoe] = useState<string>(() => calculateYOE());

  useEffect(() => {
    setYoe(calculateYOE());
  }, []);

  return <>{yoe} yrs</>;
}
