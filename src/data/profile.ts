import { jobs } from "./experience";

// Internship completed July 2022, YOE counted from there
export const CAREER_START = new Date(2022, 6, 1);

export const CURRENT_ROLE = jobs[0]?.designation ?? "Tech Lead";
