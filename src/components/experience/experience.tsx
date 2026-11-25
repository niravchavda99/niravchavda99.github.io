"use client";

import React, { useEffect, useRef } from "react";
import {
  EducationProfile,
  JobProfile,
  educations,
  jobs,
} from "@/src/data/experience";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { animate, createScope, onScroll, stagger } from "animejs";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import MonthYear from "@/src/components/common/month-year";
import { cn } from "@/src/lib/utils";

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

const Experience = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const jobGroups = groupConsecutiveJobs(jobs);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const scope = createScope({ root }).add(() => {
      animate(".anime-exp-card", {
        y: [22, 0],
        opacity: [0, 1],
        duration: 720,
        delay: stagger(100),
        ease: "outExpo",
        autoplay: onScroll({
          target: root,
          enter: "bottom-=70 top",
        }),
      });
    });

    return () => {
      scope.revert();
    };
  }, []);

  return (
    <SectionContainer id="experience">
      <HeadingText
        coloredText="Experience & Education"
        subtitle="My career progression and academic background."
      />

      <div ref={listRef} className="space-y-12">
        {/* Work Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground px-1">
            Work
          </h3>

          <div className="space-y-5">
            {jobGroups.map((group) => {
              const firstRole = group.roles[group.roles.length - 1];
              const latestRole = group.roles[0];
              const totalRange = `${firstRole.dateStarted} – ${latestRole.dateEnded ?? "Present"}`;
              const totalDuration = (
                latestRole.dateEnded ?? MonthYear.present()
              )
                .diff(firstRole.dateStarted)
                .toCountString();

              return (
                <div
                  key={`${group.organizationName}-${group.roles[0].dateStarted}`}
                  className="anime-exp-card rounded-3xl border border-border bg-card p-6 sm:p-8"
                >
                  {/* Company Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
                    <div className="flex items-center gap-4">
                      <a
                        href={group.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-2xl border border-border bg-white flex items-center justify-center shrink-0 p-1.5"
                      >
                        <Image
                          src={group.icon}
                          alt={group.organizationName}
                          width={34}
                          height={34}
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </a>
                      <div>
                        <a
                          href={group.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-lg font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          <span>{group.organizationName}</span>
                          <ArrowUpRight size={15} />
                        </a>
                        <p className="text-sm text-muted-foreground">
                          {group.location}
                        </p>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground sm:text-right">
                      <p className="text-foreground font-medium">
                        {totalDuration}
                      </p>
                      <p className="text-xs">{totalRange}</p>
                    </div>
                  </div>

                  {/* Roles */}
                  <div className="pt-6 space-y-7">
                    {group.roles.map((role, idx) => {
                      const isCurrent = !role.dateEnded;
                      const isLast = idx === group.roles.length - 1;
                      const dateRange = `${role.dateStarted} – ${role.dateEnded ?? "Present"}`;
                      const duration = (role.dateEnded ?? MonthYear.present())
                        .diff(role.dateStarted)
                        .toCountString();

                      return (
                        <div
                          key={`${role.designation}-${role.dateStarted}`}
                          className="relative pl-6"
                        >
                          <span
                            className={cn(
                              "absolute left-0 top-2 w-2 h-2 rounded-full",
                              isCurrent ? "bg-primary" : "bg-border",
                            )}
                          />
                          {!isLast && (
                            <span className="absolute left-[3.5px] top-5 bottom-[-22px] w-px bg-border" />
                          )}

                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <h4 className="text-base font-semibold text-foreground">
                              {role.designation}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {dateRange} · {duration}
                            </span>
                          </div>

                          {role.points.length > 0 && (
                            <ul className="mt-2.5 space-y-1.5">
                              {role.points.map((point) => (
                                <li
                                  key={point}
                                  className="text-sm text-muted-foreground leading-relaxed"
                                >
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
              );
            })}
          </div>
        </div>

        {/* Education Section (Always Visible) */}
        <div className="space-y-4">
          <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground px-1">
            Education
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {educations.map((edu: EducationProfile) => {
              const dateRange = `${edu.dateStarted} – ${edu.dateEnded ?? "Present"}`;
              return (
                <div
                  key={`${edu.instituteName}-${edu.dateStarted}`}
                  className="anime-exp-card rounded-3xl border border-border bg-card p-6 sm:p-7 flex flex-col justify-between gap-5"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <a
                        href={edu.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-2xl border border-border bg-white flex items-center justify-center shrink-0 p-1.5"
                      >
                        <Image
                          src={edu.icon}
                          alt={edu.instituteName}
                          width={32}
                          height={32}
                          className="w-full h-full object-contain"
                        />
                      </a>
                      <span className="text-xs px-3 py-1 rounded-full bg-surface text-muted-foreground shrink-0">
                        {dateRange}
                      </span>
                    </div>

                    <h4 className="text-lg font-semibold text-foreground leading-snug">
                      {edu.degree}
                    </h4>
                    <a
                      href={edu.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mt-1"
                    >
                      <span>{edu.instituteName}</span>
                      <ArrowUpRight size={13} className="shrink-0" />
                    </a>

                    {edu.points.length > 0 && (
                      <ul className="mt-4 pt-4 border-t border-border space-y-2">
                        {edu.points.map((point) => {
                          const isMedal =
                            point.startsWith("🥇") || point.startsWith("🥈");
                          if (isMedal) {
                            return (
                              <li key={point} className="pb-0.5">
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-medium">
                                  {point}
                                </span>
                              </li>
                            );
                          }
                          return (
                            <li
                              key={point}
                              className="text-sm text-muted-foreground leading-relaxed"
                            >
                              {point}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Experience;
