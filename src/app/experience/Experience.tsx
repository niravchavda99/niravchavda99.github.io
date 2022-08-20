import "./Experience.scss";
import React from "react";
import {jobs} from "./jobs";
import Job from "./job/Job";

const Experience = () => {
  return <div id={'experience'}>
    <div className="experience-header">Experience</div>
    <div className={'flex flex-col justify-center items-center'}>
      <div className={'w-max'}>
        <div className="jobs-container">
          {jobs.map(job => <Job profile={job}/>)}
        </div>
      </div>
    </div>
  </div>;
}

export default Experience;