import { currentMonth, monthLabel, type MonthDate } from "@/src/content/dates";
import { LiveDuration } from "./live-duration";

export function CareerDates({
  start,
  end,
}: {
  start: MonthDate;
  end?: MonthDate;
}) {
  return (
    <div className="career-dates">
      <span>
        <time dateTime={start}>{monthLabel(start)}</time> —{" "}
        {end ? <time dateTime={end}>{monthLabel(end)}</time> : "Present"}
      </span>
      <LiveDuration start={start} end={end} referenceMonth={currentMonth()} />
    </div>
  );
}
