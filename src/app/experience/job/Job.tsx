import {EducationProfile, JobProfile, Profile} from "./JobProfile";
import './Job.scss';
import {MdSchool, MdWork} from "react-icons/md";
import React from "react";

type JobProps = {
  profile: Profile
};

const iconSize = 24;

const Job = ({profile}: JobProps) => {
  const isJobProfile: boolean = profile?.type === 'job';
  const {organizationName, dateStarted, dateEnded} = profile;

  return (
      <div className={"flex flex-row text-left"}>
        <div className={'job-icon-container'}>
          {isJobProfile ? <MdWork size={iconSize}/> : <MdSchool size={iconSize}/>}
        </div>
        <div className={"job-info-container"}>
          <span className="organization-name">{organizationName}</span>
          <span className="designation">
            {isJobProfile ?
                (profile as JobProfile)?.designation :
                (profile as EducationProfile)?.degree}
          </span>
          {profile?.location && <div className="dates">{profile.location}</div>}
          <span className="dates">{`${dateStarted} - ${dateEnded.toString()}`}</span>
          <p className="achievements"></p>
        </div>
      </div>
      // <div className="job-container">
      //   <span className="job-icon-container">
      //     {isJobProfile ?
      //         <MdWork className='job-icon' size={18}/> :
      //         <MdSchool className='job-icon' size={18}/>
      //     }
      //   </span>
      //   <span className="organization-name">{organizationName}</span>
      //   <span
      //       className="designation">{isJobProfile ? (profile as JobProfile)?.designation : (profile as EducationProfile)?.degree}</span>
      //   <time className="dates">{`${dateStarted} - ${dateEnded.toString()}`}</time>
      //   <p className="achievements"></p>
      // </div>
  );
};

export default Job;