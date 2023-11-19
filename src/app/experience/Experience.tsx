import "./Experience.scss";
import React from "react";
import {educations, jobs} from "./constants";
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {Profile} from "./Profile";

const Experience = () => {
    return <div id={'experience'}>
        <div className="text-5xl p-2 pb-8 transition-all text-slate-200">Experience</div>
        <div className={'flex flex-col justify-center items-center'}>
            <VerticalTimeline>
                {jobs.map(job => renderTimelineElement(job, job.organizationName, job.designation))}
            </VerticalTimeline>
        </div>

        <div className={'flex flex-col justify-center items-center mt-4'}>
            <VerticalTimeline>
                {educations.map(education => renderTimelineElement(education, education.instituteName, education.degree))}
            </VerticalTimeline>
        </div>
    </div>;
}

const renderTimelineElement = (profile: Profile, name: string, heading1: string) => {
    return (
        <VerticalTimelineElement
            key={name}
            date={`${profile.dateStarted} - ${profile.dateEnded}`}
            dateClassName={'text-white'}
            icon={<div className='flex justify-center items-center w-full h-full'>
                <img src={profile.icon} alt={name}
                     className='w-[70%] h-[70%] object-contain rounded-full'/>
            </div>}
            contentStyle={{
                borderBottom: '8px',
                borderStyle: 'solid',
                borderBottomColor: profile.iconBg,
                boxShadow: 'none',
            }}
            iconStyle={{background: profile.iconBg}}
        >
            <div className={'text-left'}>
                <h3 className='text-black text-xl font-poppins font-semibold'>
                    {heading1}
                </h3>
                <p className='text-black-500 font-medium font-base' style={{margin: 0}}>
                    {profile.location}
                </p>
            </div>
            {profile.points.length > 0 && <ul className='mt-4 list-disc ml-5 space-y-2 text-left'>
                {profile.points.map(point => (
                    <li key={`experience-${point}`}
                        className='text-black-500/50 font-normal pl-1 text-small'>{point}</li>
                ))}
            </ul>}
        </VerticalTimelineElement>
    );
}

export default Experience;