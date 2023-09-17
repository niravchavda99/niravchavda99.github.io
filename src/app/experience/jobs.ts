import {EducationProfile, JobProfile, Profile} from "./job/JobProfile";
import MonthYear from "../common/MonthYear";

export const jobs: Profile[] = [
  {
    dateStarted: MonthYear.of(7, 2022),
    dateEnded: MonthYear.of(0, 0),
    organizationName: 'Incubyte',
    designation: 'Software Craftsperson',
    achievements: [],
    type: "job"
  } as JobProfile,
  {
    dateStarted: MonthYear.of(1, 2022),
    dateEnded: MonthYear.of(7, 2022),
    organizationName: 'Incubyte',
    designation: 'Software Craftsperson in Training',
    achievements: [],
    type: "job"
  } as JobProfile,
  {
    dateStarted: MonthYear.of(8, 2019),
    dateEnded: MonthYear.of(6, 2022),
    organizationName: "Department of Computer Science, Gujarat University",
    achievements: [],
    degree: "Masters in Computer Application - MCA",
    location: "Ahmedabad, Gujarat",
    type: "education",
  } as EducationProfile,
  {
    dateStarted: MonthYear.of(7, 2016),
    dateEnded: MonthYear.of(6, 2019),
    organizationName: "Krantiguru Shyamji Krishna Verma Kachchh University",
    achievements: [],
    degree: "Bachelors in Computer Application - BCA",
    location: "Bhuj, Kachchh, Gujarat",
    type: "education",
  } as EducationProfile
];