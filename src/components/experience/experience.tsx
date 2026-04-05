"use client";

import { educations, jobs } from "./constants";
import { EducationProfile, JobProfile, Profile } from "./profile";
import Image from "next/image";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import MonthYear from "@/src/components/common/month-year";

const TimelineItem = ({
  profile,
  primaryLabel,
  secondaryLabel,
  accentColor,
  isLast,
}: {
  profile: Profile;
  primaryLabel: string;
  secondaryLabel: string;
  accentColor: string;
  isLast: boolean;
}) => {
  const dateRange = `${profile.dateStarted} — ${profile.dateEnded ?? "Present"}`;
  const duration = (profile.dateEnded ?? MonthYear.present())
    .diff(profile.dateStarted)
    .toCountString();

  return (
    <div className="flex gap-5 group">
      {/* Timeline marker column */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-11 h-11 rounded-full border-2 flex items-center justify-center bg-white dark:bg-slate-900 z-10 shadow-md transition-shadow duration-300 group-hover:shadow-lg"
          style={{ borderColor: `${accentColor}60` }}
        >
          <a
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={primaryLabel}
          >
            <Image
              src={profile.icon}
              alt={primaryLabel}
              width={28}
              height={28}
              className="w-7 h-7 rounded-full object-contain"
            />
          </a>
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-2 bg-gradient-to-b from-slate-300/60 to-transparent dark:from-slate-700/60" />
        )}
      </div>

      {/* Content card */}
      <div className="flex-1 mb-8 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm p-5 hover:border-cyan-400/30 dark:hover:border-cyan-400/20 hover:shadow-lg hover:shadow-cyan-400/5 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">
              {primaryLabel}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
              {secondaryLabel}
              {profile.location && (
                <span className="text-slate-400 dark:text-slate-500">
                  {" "}
                  · {profile.location}
                </span>
              )}
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
            <span className="font-mono text-xs text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-400/10 border border-cyan-200/60 dark:border-cyan-400/20 px-2.5 py-1 rounded-md whitespace-nowrap">
              {dateRange}
            </span>
            <span className="font-mono text-xs text-slate-400 dark:text-slate-500 px-1">
              {duration}
            </span>
          </div>
        </div>

        {profile.points.length > 0 && (
          <ul className="space-y-2">
            {profile.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
              >
                <span className="text-cyan-400 mt-0.5 shrink-0 text-xs">▸</span>
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <SectionContainer id="experience">
      <HeadingText coloredText="Experience" />
      <p className="mt-4 mb-14 text-slate-500 dark:text-slate-400 text-base max-w-xl">
        My professional journey — from learning the craft to delivering
        production software.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
        <div>
          <h3 className="font-mono text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
            <span className="text-cyan-400">▸</span> Work
          </h3>
          {jobs.map((job: JobProfile, i) => (
            <TimelineItem
              key={`${job.organizationName}-${job.dateStarted}`}
              profile={job}
              primaryLabel={job.designation}
              secondaryLabel={job.organizationName}
              accentColor={job.iconBg}
              isLast={i === jobs.length - 1}
            />
          ))}
        </div>

        <div>
          <h3 className="font-mono text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
            <span className="text-violet-400">▸</span> Education
          </h3>
          {educations.map((edu: EducationProfile, i) => (
            <TimelineItem
              key={`${edu.instituteName}-${edu.dateStarted}`}
              profile={edu}
              primaryLabel={edu.degree}
              secondaryLabel={edu.instituteName}
              accentColor={edu.iconBg}
              isLast={i === educations.length - 1}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default Experience;
