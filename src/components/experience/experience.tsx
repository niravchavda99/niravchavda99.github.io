"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  EducationProfile,
  JobProfile,
  educations,
  jobs,
} from "@/src/data/experience";
import Image from "next/image";
import { ArrowUpRight, Briefcase, GraduationCap } from "lucide-react";
import { animate, createScope, onScroll, stagger } from "animejs";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import MonthYear from "@/src/components/common/month-year";
import { Tilt3DCard } from "@/src/components/motion/tilt-3d-card";
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

type TrackFilter = "all" | "work" | "education";

const GroupedWorkCard = ({ group }: { group: JobGroup }) => {
  const firstRole = group.roles[group.roles.length - 1];
  const latestRole = group.roles[0];
  const totalRange = `${firstRole.dateStarted} — ${latestRole.dateEnded ?? "Present"}`;
  const totalDuration = (latestRole.dateEnded ?? MonthYear.present())
    .diff(firstRole.dateStarted)
    .toCountString();

  return (
    <div className="anime-trajectory-card relative pl-8 sm:pl-12">
      {/* Laser Spine Node */}
      <span className="absolute left-0 top-8 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-primary/20 shadow-lg shadow-primary/40" />

      <Tilt3DCard
        maxTilt={5}
        glareOpacity={0.14}
        className="rounded-2xl border border-border/90 bg-card/85 backdrop-blur-xl overflow-hidden shadow-xl shadow-black/5 dark:shadow-black/35"
      >
        {/* Organization Banner */}
        <div className="p-6 sm:p-7 border-b border-border/80 bg-surface/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href={group.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={group.organizationName}
              className="w-12 h-12 rounded-xl border border-border bg-white flex items-center justify-center shrink-0 overflow-hidden p-1.5 shadow-sm"
            >
              <Image
                src={group.icon}
                alt={group.organizationName}
                width={36}
                height={36}
                className="w-full h-full object-contain rounded-lg"
              />
            </a>
            <div>
              <a
                href={group.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-xl font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
              >
                <span>{group.organizationName}</span>
                <ArrowUpRight
                  size={15}
                  className="text-muted-foreground group-hover/link:text-primary transition-colors"
                />
              </a>
              {group.location && (
                <p className="font-mono text-xs text-muted-foreground mt-0.5">
                  {group.location}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5 font-mono text-xs">
            <span className="px-3 py-1 rounded-lg border border-border bg-card text-foreground">
              {totalRange}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-primary/15 text-primary font-semibold">
              {totalDuration}
            </span>
          </div>
        </div>

        {/* Stepped Career Progression */}
        <div className="divide-y divide-border/70">
          {group.roles.map((role) => {
            const isCurrent = !role.dateEnded;
            const dateRange = `${role.dateStarted} — ${role.dateEnded ?? "Present"}`;
            const duration = (role.dateEnded ?? MonthYear.present())
              .diff(role.dateStarted)
              .toCountString();

            return (
              <div
                key={`${role.designation}-${role.dateStarted}`}
                className="p-6 sm:p-7 hover:bg-surface/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full shrink-0",
                        isCurrent ? "bg-emerald-500" : "bg-muted-foreground/45",
                      )}
                    />
                    <h4 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
                      {role.designation}
                    </h4>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-semibold">
                        Active Role
                      </span>
                    )}
                  </div>

                  <div className="font-mono text-xs text-muted-foreground pl-4 sm:pl-0">
                    <span>{dateRange}</span>
                    <span className="mx-1.5 text-border">·</span>
                    <span>{duration}</span>
                  </div>
                </div>

                {role.points.length > 0 && (
                  <ul className="mt-4 space-y-2 pl-4">
                    {role.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span className="font-mono text-primary select-none mt-0.5 text-xs">
                          →
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
      </Tilt3DCard>
    </div>
  );
};

const EducationTimelineCard = ({ edu }: { edu: EducationProfile }) => {
  const dateRange = `${edu.dateStarted} — ${edu.dateEnded ?? "Present"}`;
  const duration = (edu.dateEnded ?? MonthYear.present())
    .diff(edu.dateStarted)
    .toCountString();

  return (
    <div className="anime-trajectory-card relative pl-8 sm:pl-12">
      <span className="absolute left-0 top-8 -translate-x-1/2 w-3 h-3 rounded-full bg-accent ring-4 ring-accent/20" />

      <Tilt3DCard
        maxTilt={6}
        glareOpacity={0.14}
        className="rounded-2xl border border-border/90 bg-card/85 backdrop-blur-xl p-6 sm:p-7 shadow-xl shadow-black/5 dark:shadow-black/35"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
          <div className="flex items-start gap-4">
            <a
              href={edu.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={edu.instituteName}
              className="w-12 h-12 rounded-xl border border-border bg-white flex items-center justify-center shrink-0 overflow-hidden p-1.5 shadow-sm"
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
              <h4 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground leading-snug">
                {edu.degree}
              </h4>
              <a
                href={edu.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mt-1"
              >
                <span>{edu.instituteName}</span>
                <ArrowUpRight size={13} className="shrink-0" />
              </a>
              {edu.location && (
                <p className="font-mono text-xs text-muted-foreground mt-0.5">
                  {edu.location}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs shrink-0">
            <span className="px-3 py-1 rounded-lg border border-border bg-surface text-foreground">
              {dateRange}
            </span>
            <span className="text-muted-foreground">{duration}</span>
          </div>
        </div>

        {edu.points.length > 0 && (
          <ul className="space-y-2 pt-4 border-t border-border/70">
            {edu.points.map((point) => {
              const isMedal = point.startsWith("🥇") || point.startsWith("🥈");
              if (isMedal) {
                return (
                  <li key={point} className="pb-1">
                    <span className="inline-flex items-center px-3 py-1 rounded-full border border-amber-500/35 bg-amber-500/12 text-amber-700 dark:text-amber-300 text-xs font-semibold">
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
                  <span className="font-mono text-primary select-none mt-0.5 text-xs">
                    →
                  </span>
                  <span>{point}</span>
                </li>
              );
            })}
          </ul>
        )}
      </Tilt3DCard>
    </div>
  );
};

const Experience = () => {
  const [filter, setFilter] = useState<TrackFilter>("all");
  const timelineRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const jobGroups = groupConsecutiveJobs(jobs);

  // Anime.js v4.5 Scroll-Linked Laser Spine + Staggered Milestone Reveals
  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const scope = createScope({ root }).add(() => {
      if (beamRef.current) {
        animate(beamRef.current, {
          scaleY: [0, 1],
          ease: "linear",
          autoplay: onScroll({
            target: root,
            enter: "bottom-=180 top",
            leave: "top+=200 bottom",
            sync: 0.25,
          }),
        });
      }

      animate(".anime-trajectory-card", {
        y: [28, 0],
        opacity: [0, 1],
        duration: 720,
        delay: stagger(110),
        ease: "outExpo",
        autoplay: onScroll({
          target: root,
          enter: "bottom-=90 top",
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
        eyebrow="Kinetic Trajectory"
        coloredText="Career &"
        italicAccent="academia"
        subtitle="My professional journey, from learning the craft to leading software delivery and earning top university honors."
        rightSlot={
          <div
            role="group"
            aria-label="Filter trajectory"
            className="inline-flex items-center p-1 rounded-xl border border-border bg-card/80 backdrop-blur-md"
          >
            {(
              [
                { id: "all", label: "All" },
                { id: "work", label: "Work" },
                { id: "education", label: "Education" },
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
                    "px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors",
                    active
                      ? "bg-foreground text-background font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        }
      />

      {/* Anime.js Scroll-Synced Laser Spine Container */}
      <div ref={timelineRef} className="relative ml-2 sm:ml-4 space-y-12">
        <div
          aria-hidden="true"
          className="absolute left-0 top-4 bottom-4 w-px bg-border"
        />
        <div
          ref={beamRef}
          aria-hidden="true"
          style={{ transform: "scaleY(0)" }}
          className="absolute left-[-0.5px] top-4 bottom-4 w-[2px] origin-top bg-gradient-to-b from-primary via-accent to-primary shadow-[0_0_12px_rgba(255,88,42,0.7)] will-change-transform"
        />

        {(filter === "all" || filter === "work") && (
          <div className="space-y-6">
            <div className="pl-8 sm:pl-12 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Briefcase size={13} className="text-primary" />
              <span>Work Progression</span>
            </div>
            {jobGroups.map((group) => (
              <GroupedWorkCard
                key={`${group.organizationName}-${group.roles[0].dateStarted}`}
                group={group}
              />
            ))}
          </div>
        )}

        {(filter === "all" || filter === "education") && (
          <div className="space-y-6">
            <div className="pl-8 sm:pl-12 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <GraduationCap size={14} className="text-accent" />
              <span>Academic Milestones</span>
            </div>
            {educations.map((edu) => (
              <EducationTimelineCard
                key={`${edu.instituteName}-${edu.dateStarted}`}
                edu={edu}
              />
            ))}
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

export default Experience;
