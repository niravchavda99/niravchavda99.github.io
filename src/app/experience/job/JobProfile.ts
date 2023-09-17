import MonthYear from "../../common/MonthYear";

export interface Profile {
  dateStarted: MonthYear,
  dateEnded: MonthYear,
  organizationName: string,
  achievements: string[]
  type: 'job' | 'education';
}

export interface JobProfile extends Profile {
  designation: string,
  type: 'job'
}

export interface EducationProfile extends Profile {
  degree: string,
  type: 'education'
}