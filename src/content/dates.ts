export type MonthDate = `${number}-${number}`;

function monthIndex(value: MonthDate) {
  const [year, month] = value.split("-").map(Number);
  return year * 12 + month - 1;
}

/** End month is exclusive: January to July represents six months. */
export function durationLabel(start: MonthDate, end: MonthDate) {
  const months = Math.max(0, monthIndex(end) - monthIndex(start));
  if (months === 0) return "Less than a month";
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  return [
    years ? `${years} ${years === 1 ? "year" : "years"}` : "",
    remainder ? `${remainder} ${remainder === 1 ? "month" : "months"}` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function monthLabel(value: MonthDate) {
  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

export function currentMonth(): MonthDate {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}` as MonthDate;
}
