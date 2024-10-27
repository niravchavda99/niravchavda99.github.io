"use client";

import "./experience.scss";
import { educations, jobs } from "./constants";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Profile } from "./profile";
import Image from "next/image";

const Experience = () => {
  return (
    <div
      id="experience"
      className="max-container h-max min-h-[100vh] select-none transition-all"
    >
      <h1 className="head-text">
        My{" "}
        <span className=" blue-gradient_text font-semibold drop-shadow">
          Experience
        </span>
      </h1>
      <div className="flex flex-col justify-center items-center mt-10">
        <VerticalTimeline>
          {jobs.map((job) =>
            renderTimelineElement(job, job.organizationName, job.designation),
          )}
        </VerticalTimeline>
      </div>

      <div className="flex flex-col justify-center items-center mt-4">
        <VerticalTimeline lineColor="#94a3b8">
          {educations.map((education) =>
            renderTimelineElement(
              education,
              education.instituteName,
              education.degree,
            ),
          )}
        </VerticalTimeline>
      </div>
    </div>
  );
};

const renderTimelineElement = (
  profile: Profile,
  name: string,
  heading1: string,
) => {
  return (
    <VerticalTimelineElement
      visible={true}
      key={name + profile.dateStarted + profile.dateEnded}
      date={`${profile.dateStarted} - ${profile.dateEnded}`}
      dateClassName="timeline-date"
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <Image
            src={profile.icon}
            alt={name}
            className="w-[70%] h-[70%] object-contain rounded-full"
            width={40}
            height={40}
          />
        </div>
      }
      contentStyle={{
        borderBottom: "8px",
        borderStyle: "solid",
        borderBottomColor: profile.iconBg,
        boxShadow: "none",
      }}
      iconStyle={{ background: profile.iconBg }}
    >
      <div className="text-left">
        <h3 className="text-black text-xl font-semibold">{heading1}</h3>
        <p
          className="text-black-500 font-medium font-base"
          style={{ margin: 0 }}
        >
          {profile.location}
        </p>
      </div>
      {profile.points.length > 0 && (
        <ul className="mt-4 list-disc ml-5 space-y-2 text-left">
          {profile.points.map((point) => (
            <li
              key={`experience-${point}`}
              className="text-black-500/50 font-normal pl-1 text-small"
            >
              {point}
            </li>
          ))}
        </ul>
      )}
    </VerticalTimelineElement>
  );
};

export default Experience;
