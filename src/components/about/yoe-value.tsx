"use client";

import { useEffect, useState } from "react";
import { CAREER_START } from "@/src/data/profile";

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
