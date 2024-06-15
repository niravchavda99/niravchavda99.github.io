import MonthYear from "../common/MonthYear";

export interface Profile {
  dateEnded: MonthYear;
  dateStarted: MonthYear;
  icon: string;
  iconBg: string;
  location: string;
  points: string[];
}

export interface JobProfile extends Profile {
  designation: string;
  organizationName: string;
}

export interface EducationProfile extends Profile {
  degree: string;
  instituteName: string;
}
