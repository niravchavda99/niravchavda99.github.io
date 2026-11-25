"use client";

import React, { useEffect, useRef, useState } from "react";
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

type TrackFilter = "work" | "education";

const Experience = () => {
  const [tab, setTab] = useState<TrackFilter>("work");
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
        y: [20, 0],
        opacity: [0, 1],
        duration: 680,
        delay: stagger(90),
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
  }, [tab]);

  return (
    <SectionContainer id="experience">
      <HeadingText
        coloredText="Experience"
        subtitle="My career progression and academic background."
        rightSlot={
          <div
            role="group"
            aria-label="Experience category"
            className="inline-flex items-center p-1 rounded-full border border-border bg-card"
          >
            {(
              [
                { id: "work", label: "Work" },
                { id: "education", label: "Education" },
              ] as const
            ).map((item) => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  aria-pressed={active}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm transition-colors",
                    active
                      ? "bg-foreground text-background font-medium"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        }
      />

      <div ref={listRef} className="space-y-5">
        {tab === "work"
          ? jobGroups.map((group) => {
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
                            <h3 className="text-base font-semibold text-foreground">
                              {role.designation}
                            </h3>
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
            })
          : educations.map((edu: EducationProfile) => {
              const dateRange = `${edu.dateStarted} – ${edu.dateEnded ?? "Present"}`;
              return (
                <div
                  key={`${edu.instituteName}-${edu.dateStarted}`}
                  className="anime-exp-card rounded-3xl border border-border bg-card p-6 sm:p-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <a
                        href={edu.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-2xl border border-border bg-white flex items-center justify-center shrink-0 p-1.5"
                      >
                        <Image
                          src={edu.icon}
                          alt={edu.instituteName}
                          width={34}
                          height={34}
                          className="w-full h-full object-contain"
                        />
                      </a>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {edu.degree}
                        </h3>
                        <a
                          href={edu.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mt-0.5"
                        >
                          <span>{edu.instituteName}</span>
                          <ArrowUpRight size={13} />
                        </a>
                      </div>
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-surface text-muted-foreground shrink-0">
                      {dateRange}
                    </span>
                  </div>

                  {edu.points.length > 0 && (
                    <ul className="mt-5 pt-5 border-t border-border space-y-2">
                      {edu.points.map((point) => {
                        const isMedal =
                          point.startsWith("🥇") || point.startsWith("🥈");
                        if (isMedal) {
                          return (
                            <li key={point} className="pb-1">
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
              );
            })}
      </div>
    </SectionContainer>
  );
};

export default Experience;
