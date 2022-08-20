import JobProfile from "./JobProfile";
import './Job.scss';
import {MdWork} from "react-icons/md";
import React from "react";

type JobProps = {
  profile: JobProfile
};

const Job = ({profile}: JobProps) => {
  const {organizationName, designation, dateStarted, dateEnded} = profile;

  return (
      <div className="job-container">
        <span className="job-icon"><MdWork size={18}/></span>
        <span className="organization-name">{organizationName}</span>
        <span className="designation">{designation}</span>
        <time className="dates">{`${dateStarted} - ${dateEnded.toString()}`}</time>
        <p className="achievements"></p>
      </div>
  );
};

export default Job;