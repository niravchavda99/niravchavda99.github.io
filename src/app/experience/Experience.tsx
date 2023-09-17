import "./Experience.scss";
import React from "react";
import {jobs} from "./jobs";
import Job from "./job/Job";

const Experience = () => {
  return <div id={'experience'}>
    <div className="experience-header">Experience & Education</div>
    <div className={'flex flex-col justify-center items-center'}>
      <div className="jobs-container">
        {jobs.map((job, index) => <Job key={`job${index}`} profile={job}/>)}
      </div>
    </div>
  </div>;
}

export default Experience;