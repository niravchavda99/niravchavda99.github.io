import { expect, test } from "@playwright/test";
import { durationLabel } from "../src/content/dates";

test("career durations exclude the end month", () => {
  expect(durationLabel("2022-01", "2022-07")).toBe("6 months");
  expect(durationLabel("2022-07", "2026-08")).toBe("4 years 1 month");
  expect(durationLabel("2019-08", "2022-08")).toBe("3 years");
  expect(durationLabel("2026-08", "2026-10")).toBe("2 months");
  expect(durationLabel("2026-08", "2026-08")).toBe("Less than a month");
  expect(durationLabel("2025-12", "2026-01")).toBe("1 month");
});
