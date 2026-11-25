"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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

function toYearFloat(my?: MonthYear): number {
  const ref = my ?? MonthYear.present();
  return ref.year + (ref.month - 1) / 12;
}

type TrackFilter = "all" | "work" | "education";

const Experience = () => {
  const [filter, setFilter] = useState<TrackFilter>("all");
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const jobGroups = groupConsecutiveJobs(jobs);

  const minYear = 2016;
  const maxYear = useMemo(() => {
    const nowY = MonthYear.present().year + 1;
    return Math.max(2027, nowY);
  }, []);
  const spanYears = maxYear - minYear;

  const yearTicks = useMemo(() => {
    const arr: number[] = [];
    for (let y = minYear; y <= maxYear; y += 2) arr.push(y);
    return arr;
  }, [maxYear]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const scope = createScope({ root }).add(() => {
      animate(".anime-gantt-clip", {
        scaleX: [0, 1],
        opacity: [0, 1],
        duration: 850,
        delay: stagger(90),
        ease: "outQuart",
        autoplay: onScroll({
          target: root,
          enter: "bottom-=80 top",
        }),
      });

      animate(".anime-timeline-row", {
        y: [20, 0],
        opacity: [0, 1],
        duration: 680,
        delay: stagger(95),
        ease: "outExpo",
        autoplay: onScroll({
          target: root,
          enter: "bottom-=80 top",
        }),
      });
    });

    return () => {
      scope.revert();
    };
  }, [filter]);

  return (
    <SectionContainer id="experience">
      <HeadingText
        index="02"
        eyebrow="KEYFRAME SEQUENCER"
        coloredText="Career &"
        italicAccent="academia."
        signalColor="#5CE68A"
        subtitle="Mapped across a multi-track timeline from university gold medals to leading engineering teams at Incubyte."
        rightSlot={
          <div
            role="group"
            aria-label="Filter trajectory"
            className="inline-flex items-center border border-border bg-card divide-x divide-border font-mono text-xs"
          >
            {(
              [
                { id: "all", label: "ALL" },
                { id: "work", label: "WORK" },
                { id: "education", label: "ACADEMIA" },
              ] as const
            ).map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  aria-pressed={active}
                  className={cn(
                    "px-3.5 py-2 transition-colors",
                    active
                      ? "bg-[#5CE68A] text-[#1D1C1B] font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        }
      />

      <div ref={rootRef}>
        {/* Visual Multi-Track Gantt Keyframe Editor (animejs.com Timeline UI!) */}
        <div className="border-b border-border bg-surface/35 px-5 sm:px-8 lg:px-10 py-6 overflow-x-auto">
          <div className="min-w-[560px]">
            {/* Year Ruler Header */}
            <div className="grid grid-cols-12 items-end pb-2 border-b border-border font-mono text-[10px] text-muted-foreground">
              <div className="col-span-3 uppercase tracking-[0.14em]">
                TIMELINE // {minYear}—PRESENT
              </div>
              <div className="col-span-9 flex justify-between relative">
                {yearTicks.map((yr) => (
                  <span key={yr}>{yr}</span>
                ))}
              </div>
            </div>

            {/* Track A: Work Clips */}
            <div className="grid grid-cols-12 items-center min-h-[46px] border-b border-border/70 font-mono text-xs">
              <div className="col-span-3 pr-3 flex items-center gap-2 text-foreground">
                <span className="w-2 h-2 bg-[#5CE68A]" />
                <span>WORK_TRACK</span>
              </div>
              <div className="col-span-9 relative h-8 bg-ruler-x">
                {jobs.map((job, idx) => {
                  const id = `job-${job.designation}`;
                  const s = Math.max(
                    0,
                    (toYearFloat(job.dateStarted) - minYear) / spanYears,
                  );
                  const e = Math.min(
                    1,
                    (toYearFloat(job.dateEnded) - minYear) / spanYears,
                  );
                  const widthPct = Math.max(4.5, (e - s) * 100);
                  const colors = ["#FF4B4B", "#5CE68A", "#38BDF8"];
                  const barColor = colors[idx % colors.length];
                  return (
                    <button
                      key={id}
                      type="button"
                      onMouseEnter={() => setFocusedId(id)}
                      onMouseLeave={() => setFocusedId(null)}
                      onClick={() =>
                        setFocusedId((prev) => (prev === id ? null : id))
                      }
                      style={{
                        left: `${(s * 100).toFixed(2)}%`,
                        width: `${widthPct.toFixed(2)}%`,
                        backgroundColor: barColor,
                      }}
                      title={`${job.designation} (${job.dateStarted} – ${job.dateEnded ?? "Present"})`}
                      className="anime-gantt-clip absolute top-1.5 h-5 origin-left px-1.5 flex items-center text-[10px] font-bold text-[#1D1C1B] truncate hover:brightness-110 transition-all"
                    >
                      {job.designation}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Track B: Academia Clips */}
            <div className="grid grid-cols-12 items-center min-h-[46px] font-mono text-xs">
              <div className="col-span-3 pr-3 flex items-center gap-2 text-foreground">
                <span className="w-2 h-2 bg-[#FFC730]" />
                <span>EDU_TRACK</span>
              </div>
              <div className="col-span-9 relative h-8 bg-ruler-x">
                {educations.map((edu, idx) => {
                  const id = `edu-${edu.degree}`;
                  const s = Math.max(
                    0,
                    (toYearFloat(edu.dateStarted) - minYear) / spanYears,
                  );
                  const e = Math.min(
                    1,
                    (toYearFloat(edu.dateEnded) - minYear) / spanYears,
                  );
                  const widthPct = Math.max(5, (e - s) * 100);
                  const barColor = idx === 0 ? "#FFC730" : "#C084FC";
                  return (
                    <button
                      key={id}
                      type="button"
                      onMouseEnter={() => setFocusedId(id)}
                      onMouseLeave={() => setFocusedId(null)}
                      onClick={() =>
                        setFocusedId((prev) => (prev === id ? null : id))
                      }
                      style={{
                        left: `${(s * 100).toFixed(2)}%`,
                        width: `${widthPct.toFixed(2)}%`,
                        backgroundColor: barColor,
                      }}
                      title={`${edu.degree} (${edu.dateStarted} – ${edu.dateEnded ?? "Present"})`}
                      className="anime-gantt-clip absolute top-1.5 h-5 origin-left px-1.5 flex items-center text-[10px] font-bold text-[#1D1C1B] truncate hover:brightness-110 transition-all"
                    >
                      {edu.degree.split(" - ")[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Inspector Rows */}
        <div className="divide-y divide-border">
          {(filter === "all" || filter === "work") &&
            jobGroups.map((group) => {
              const firstRole = group.roles[group.roles.length - 1];
              const latestRole = group.roles[0];
              const totalRange = `${firstRole.dateStarted} — ${latestRole.dateEnded ?? "Present"}`;
              const totalDuration = (
                latestRole.dateEnded ?? MonthYear.present()
              )
                .diff(firstRole.dateStarted)
                .toCountString();

              return (
                <div
                  key={`${group.organizationName}-${group.roles[0].dateStarted}`}
                  className="anime-timeline-row grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border"
                >
                  {/* Left Organization Cell */}
                  <div className="lg:col-span-4 p-6 sm:p-8 bg-card/60 flex flex-col justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <a
                        href={group.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 border border-border bg-white flex items-center justify-center shrink-0 p-1.5"
                      >
                        <Image
                          src={group.icon}
                          alt={group.organizationName}
                          width={36}
                          height={36}
                          className="w-full h-full object-contain"
                        />
                      </a>
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5CE68A] block mb-1">
                          ORGANIZATION
                        </span>
                        <a
                          href={group.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xl font-bold tracking-tight text-foreground hover:text-[#5CE68A] transition-colors"
                        >
                          <span>{group.organizationName}</span>
                          <ArrowUpRight size={15} />
                        </a>
                        <p className="font-mono text-xs text-muted-foreground mt-1">
                          {group.location}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border font-mono text-xs flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {totalRange}
                      </span>
                      <span className="px-2 py-0.5 bg-[#5CE68A]/15 text-[#5CE68A] font-semibold">
                        {totalDuration}
                      </span>
                    </div>
                  </div>

                  {/* Right Roles Progression */}
                  <div className="lg:col-span-8 divide-y divide-border">
                    {group.roles.map((role) => {
                      const id = `job-${role.designation}`;
                      const isCurrent = !role.dateEnded;
                      const isFocused = focusedId === id;
                      const dateRange = `${role.dateStarted} — ${role.dateEnded ?? "Present"}`;
                      const duration = (role.dateEnded ?? MonthYear.present())
                        .diff(role.dateStarted)
                        .toCountString();

                      return (
                        <div
                          key={`${role.designation}-${role.dateStarted}`}
                          className={cn(
                            "p-6 sm:p-8 transition-colors",
                            isFocused
                              ? "bg-[#5CE68A]/10"
                              : "hover:bg-surface/35",
                          )}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <span
                                className={cn(
                                  "w-2.5 h-2.5 shrink-0",
                                  isCurrent ? "bg-[#FF4B4B]" : "bg-[#5CE68A]",
                                )}
                              />
                              <h3 className="text-lg font-bold tracking-tight text-foreground">
                                {role.designation}
                              </h3>
                              {isCurrent && (
                                <span className="px-2 py-0.5 bg-[#FF4B4B] text-[#1D1C1B] font-mono text-[10px] font-bold uppercase tracking-wider">
                                  ACTIVE
                                </span>
                              )}
                            </div>

                            <div className="font-mono text-xs text-muted-foreground">
                              {dateRange} · {duration}
                            </div>
                          </div>

                          {role.points.length > 0 && (
                            <ul className="mt-4 space-y-2">
                              {role.points.map((point) => (
                                <li
                                  key={point}
                                  className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                                >
                                  <span className="font-mono text-[#5CE68A] select-none mt-0.5 text-xs">
                                    ▪
                                  </span>
                                  <span>{point}</span>
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

          {(filter === "all" || filter === "education") &&
            educations.map((edu: EducationProfile) => {
              const id = `edu-${edu.degree}`;
              const isFocused = focusedId === id;
              const dateRange = `${edu.dateStarted} — ${edu.dateEnded ?? "Present"}`;
              const duration = (edu.dateEnded ?? MonthYear.present())
                .diff(edu.dateStarted)
                .toCountString();

              return (
                <div
                  key={`${edu.instituteName}-${edu.dateStarted}`}
                  className={cn(
                    "anime-timeline-row grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border transition-colors",
                    isFocused && "bg-[#FFC730]/10",
                  )}
                >
                  <div className="lg:col-span-4 p-6 sm:p-8 bg-card/60 flex flex-col justify-between gap-5">
                    <div className="flex items-start gap-4">
                      <a
                        href={edu.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 border border-border bg-white flex items-center justify-center shrink-0 p-1.5"
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
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#FFC730] block mb-1">
                          ACADEMIA
                        </span>
                        <a
                          href={edu.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-base font-bold text-foreground hover:text-[#FFC730] transition-colors leading-snug"
                        >
                          <span>{edu.instituteName}</span>
                          <ArrowUpRight size={13} className="shrink-0" />
                        </a>
                        <p className="font-mono text-xs text-muted-foreground mt-1">
                          {edu.location}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border font-mono text-xs flex items-center justify-between text-muted-foreground">
                      <span>{dateRange}</span>
                      <span>{duration}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-8 p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground mb-4">
                      {edu.degree}
                    </h3>

                    {edu.points.length > 0 && (
                      <ul className="space-y-2">
                        {edu.points.map((point) => {
                          const isMedal =
                            point.startsWith("🥇") || point.startsWith("🥈");
                          if (isMedal) {
                            return (
                              <li key={point} className="pb-1">
                                <span className="inline-flex items-center px-3 py-1 bg-[#FFC730]/15 border border-[#FFC730]/40 font-mono text-xs font-bold text-[#FFC730]">
                                  {point}
                                </span>
                              </li>
                            );
                          }
                          return (
                            <li
                              key={point}
                              className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                            >
                              <span className="font-mono text-[#FFC730] select-none mt-0.5 text-xs">
                                ▪
                              </span>
                              <span>{point}</span>
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
    </SectionContainer>
  );
};

export default Experience;
