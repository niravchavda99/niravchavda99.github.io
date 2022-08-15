import JobProfile from "./JobProfile";
import './Job.scss';

type JobProps = {
  profile: JobProfile
};

const Job = ({profile}: JobProps) => {
  const {organizationName, designation, achievements, dateStarted, dateEnded} = profile;

  return (
      <>
        <div className={'job-container'}>
          <div className={'p-3 border border-violet-500 rounded-lg w-full'}>
            {/*<div className="flex flex-row justify-center">*/}
            {/*  <MdWork color={"#8b5cf6"} size={32}*/}
            {/*          className={'rounded-full border border-violet-500 p-1'}/>*/}
            {/*</div>*/}
            <div className="organization-name">{organizationName}</div>
            <div className="designation">{designation}</div>
            <div className="dates">{dateStarted.toString()} - {dateEnded.toString()}</div>
            {achievements.length > 0 &&
                <ul className={'achievements'}>
                  {achievements.map((achievement, index) =>
                      <li key={`${organizationName}${designation}achievement${index}`}>
                        {achievement}
                      </li>)}
                </ul>}
          </div>
        </div>
      </>
  );
};

export default Job;