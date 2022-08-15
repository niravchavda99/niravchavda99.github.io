import MonthYear from "../../common/MonthYear";

type JobProfile = {
  dateStarted: MonthYear,
  dateEnded: MonthYear,
  organizationName: string,
  designation: string,
  achievements: string[]
};

export default JobProfile;