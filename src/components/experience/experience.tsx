"use client";

import { educations, jobs } from "./constants";
import { EducationProfile, JobProfile, Profile } from "./profile";
import Image from "next/image";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import MonthYear from "@/src/components/common/month-year";

interface JobGroup {
  organizationName: string;
  location: string;
  icon: string;
  iconBg: string;
  url: string;
  roles: JobProfile[];
}

function groupConsecutiveJobs(jobList: JobProfile[]): JobGroup[] {
  const groups: JobGroup[] = [];
  for (const job of jobList) {
    const prev = groups[groups.length - 1];
    if (prev && prev.organizationName === job.organizationName) {
      prev.roles.push(job);
    } else {
      groups.push({
        organizationName: job.organizationName,
        location: job.location,
        icon: job.icon,
        iconBg: job.iconBg,
        url: job.url,
        roles: [job],
      });
    }
  }
  return groups;
}

const TimelineMarker = ({
  url,
  label,
  icon,
  accentColor,
  isLast,
}: {
  url: string;
  label: string;
  icon: string;
  accentColor: string;
  isLast: boolean;
}) => (
  <div className="flex flex-col items-center shrink-0">
    <div
      className="w-11 h-11 rounded-full border-2 flex items-center justify-center bg-white dark:bg-slate-900 z-10 shadow-md transition-shadow duration-300 group-hover:shadow-lg"
      style={{ borderColor: `${accentColor}60` }}
    >
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
        <Image
          src={icon}
          alt={label}
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
);

const GroupedJobItem = ({
  group,
  isLast,
}: {
  group: JobGroup;
  isLast: boolean;
}) => {
  const firstRole = group.roles[group.roles.length - 1];
  const latestRole = group.roles[0];
  const totalRange = `${firstRole.dateStarted} to ${latestRole.dateEnded ?? "Present"}`;
  const totalDuration = (latestRole.dateEnded ?? MonthYear.present())
    .diff(firstRole.dateStarted)
    .toCountString();

  return (
    <div className="flex gap-5 group">
      <TimelineMarker
        url={group.url}
        label={group.organizationName}
        icon={group.icon}
        accentColor={group.iconBg}
        isLast={isLast}
      />

      <div className="flex-1 mb-8 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm p-5 hover:border-cyan-400/30 dark:hover:border-cyan-400/20 hover:shadow-lg hover:shadow-cyan-400/5 transition-all duration-300">
        {/* Company header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">
              {group.organizationName}
            </h3>
            {group.location && (
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
                {group.location}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
            <span className="font-mono text-xs text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-400/10 border border-cyan-200/60 dark:border-cyan-400/20 px-2.5 py-1 rounded-md whitespace-nowrap">
              {totalRange}
            </span>
            <span className="font-mono text-xs text-slate-400 dark:text-slate-500 px-1">
              {totalDuration}
            </span>
          </div>
        </div>

        {/* Roles */}
        <div className="space-y-5">
          {group.roles.map((role, idx) => {
            const dateRange = `${role.dateStarted} to ${role.dateEnded ?? "Present"}`;
            const duration = (role.dateEnded ?? MonthYear.present())
              .diff(role.dateStarted)
              .toCountString();
            const isLastRole = idx === group.roles.length - 1;

            return (
              <div
                key={`${role.designation}-${role.dateStarted}`}
                className="relative pl-5"
              >
                {/* Sub-timeline dot and connector */}
                <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-cyan-400/80 ring-4 ring-cyan-400/10" />
                {!isLastRole && (
                  <span className="absolute left-[3.5px] top-4 bottom-[-20px] w-px bg-slate-200 dark:bg-slate-700/70" />
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-base leading-snug">
                    {role.designation}
                  </h4>
                  <span className="font-mono text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
                    {dateRange} · {duration}
                  </span>
                </div>

                {role.points.length > 0 && (
                  <ul className="space-y-1.5">
                    {role.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
                      >
                        <span className="text-cyan-400 mt-0.5 shrink-0 text-xs">
                          ▸
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

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
  const dateRange = `${profile.dateStarted} to ${profile.dateEnded ?? "Present"}`;
  const duration = (profile.dateEnded ?? MonthYear.present())
    .diff(profile.dateStarted)
    .toCountString();

  return (
    <div className="flex gap-5 group">
      <TimelineMarker
        url={profile.url}
        label={primaryLabel}
        icon={profile.icon}
        accentColor={accentColor}
        isLast={isLast}
      />

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
  const jobGroups = groupConsecutiveJobs(jobs);

  return (
    <SectionContainer id="experience">
      <HeadingText coloredText="Experience" />
      <p className="mt-4 mb-14 text-slate-500 dark:text-slate-400 text-base max-w-xl">
        My professional journey, from learning the craft to delivering
        production software.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
        <div>
          <h3 className="font-mono text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
            <span className="text-cyan-400">▸</span> Work
          </h3>
          {jobGroups.map((group, i) => (
            <GroupedJobItem
              key={`${group.organizationName}-${group.roles[0].dateStarted}`}
              group={group}
              isLast={i === jobGroups.length - 1}
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
