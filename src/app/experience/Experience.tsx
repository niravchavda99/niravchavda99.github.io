import "./Experience.scss";
import React from "react";
import {jobs} from "./jobs";
import Job from "./job/Job";
import {EducationProfile, JobProfile} from "./job/JobProfile";

const Experience = () => {
  return <div id={'experience'}>
    <div className="experience-header">Experience & Education</div>
    <div className={'flex flex-col justify-center items-center'}>
      <div className="jobs-container">
        {jobs.map((job) => {
          const designation = job.type == "job" ? (job as JobProfile).designation : (job as EducationProfile).degree;
          const jobKey = `job-${job.organizationName}-${designation}`;
          return <Job key={jobKey} profile={job}/>;
        })}
      </div>
    </div>
  </div>;
}

export default Experience;