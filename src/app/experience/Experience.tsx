import "./Experience.scss";
import {jobs} from './jobs';
import Job from "./job/Job";
import VerticalRuler from "../common/VerticalRuler";
import React from "react";
import DarkModeProps from "../common/DarkModeProps";

const Experience = ({darkMode}: DarkModeProps) => {
  return <div id={'experience'}>
    <div className="text-5xl">Experience</div>
    <br/>
    <div className="jobs-container">
      {jobs.map((jobProfile, index) =>
          <React.Fragment key={`jobProfile${index}`}>
            <Job profile={jobProfile}/>
            {index !== jobs.length - 1 && <VerticalRuler/>}
          </React.Fragment>
      )}
    </div>
  </div>;
}

export default Experience;