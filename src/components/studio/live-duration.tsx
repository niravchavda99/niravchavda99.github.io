"use client";
import { useEffect, useState } from "react";
import {
  currentMonth,
  durationLabel,
  type MonthDate,
} from "@/src/content/dates";

export function LiveDuration({
  start,
  end,
  referenceMonth,
}: {
  start: MonthDate;
  end?: MonthDate;
  referenceMonth: MonthDate;
}) {
  const [month, setMonth] = useState(referenceMonth);
  useEffect(() => {
    if (!end) setMonth(currentMonth());
  }, [end]);
  return (
    <span className="career-duration">
      {durationLabel(start, end ?? month)}
    </span>
  );
}
