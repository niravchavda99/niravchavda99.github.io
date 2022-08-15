import JobProfile from "./job/JobProfile";
import MonthYear from "../common/MonthYear";

export const jobs: JobProfile[] = [
  {
    dateStarted: new MonthYear(7, 2022),
    dateEnded: new MonthYear(0, 0),
    organizationName: 'Incubyte',
    designation: 'Software Craftsperson',
    achievements: []
  },
  {
    dateStarted: new MonthYear(1, 2022),
    dateEnded: new MonthYear(7, 2022),
    organizationName: 'Incubyte',
    designation: 'Software Craftsperson in Training',
    achievements: []
  }
];