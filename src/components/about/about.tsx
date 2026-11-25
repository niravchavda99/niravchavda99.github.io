"use client";

import React, { useEffect, useRef, useState } from "react";
import profileImage from "@/src/assets/images/profile.jpg";
import { BsGithub, BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { ArrowRight, ArrowUpRight, ImageIcon, UserCheck } from "lucide-react";
import {
  animate,
  createScope,
  createSpring,
  createTimeline,
  splitText,
  stagger,
} from "animejs";
import SocialMediaLink from "@/src/components/common/social-media-link";
import Image from "next/image";
import Link from "next/link";
import { SocialMediaPlatform } from "../common/social-media-platform";
import { YoeValue } from "./yoe-value";
import { AnimatedAvatar3D } from "./animated-avatar-3d";
import { CURRENT_ROLE } from "@/src/data/profile";
import { jobs } from "@/src/data/experience";

const SOCIAL_ICONS = [
  {
    platform: SocialMediaPlatform.Github,
    icon: <BsGithub size={16} />,
    label: "GitHub",
  },
  {
    platform: SocialMediaPlatform.Linkedin,
    icon: <BsLinkedin size={15} />,
    label: "LinkedIn",
  },
  {
    platform: SocialMediaPlatform.X,
    icon: <BsTwitterX size={14} />,
    label: "X",
  },
  {
    platform: SocialMediaPlatform.Instagram,
    icon: <BsInstagram size={15} />,
    label: "Instagram",
  },
  {
    platform: SocialMediaPlatform.Mail,
    icon: <IoMail size={17} />,
    label: "Email",
  },
];

type PortraitMode = "avatar" | "photo";

const About = () => {
  const [portraitMode, setPortraitMode] = useState<PortraitMode>("avatar");
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const currentJob = jobs[0];

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const scope = createScope({ root }).add(() => {
      const tl = createTimeline({
        defaults: { ease: "outExpo" },
      });

      tl.add(
        ".anime-hero-pill",
        {
          y: [14, 0],
          opacity: [0, 1],
          duration: 650,
        },
        0,
      );

      if (nameRef.current) {
        const splitted = splitText(nameRef.current, {
          chars: { wrap: "clip" },
        });
        if (splitted.chars.length > 0) {
          tl.add(
            splitted.chars,
            {
              y: ["110%", "0%"],
              opacity: [0, 1],
              ease: createSpring({ stiffness: 220, damping: 20 }),
              delay: stagger(24, { from: "first" }),
            },
            80,
          );
        }
      }

      tl.add(
        ".anime-hero-fade",
        {
          y: [18, 0],
          opacity: [0, 1],
          duration: 750,
          delay: stagger(90),
        },
        240,
      );

      tl.add(
        ".anime-hero-portrait",
        {
          y: [24, 0],
          scale: [0.96, 1],
          opacity: [0, 1],
          duration: 900,
        },
        160,
      );
    });

    return () => {
      scope.revert();
    };
  }, []);

  useEffect(() => {
    if (!viewportRef.current) return;
    animate(viewportRef.current, {
      opacity: [0.35, 1],
      scale: [0.98, 1],
      duration: 280,
      ease: "outCubic",
    });
  }, [portraitMode]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full pt-32 sm:pt-40 pb-16 sm:pb-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Calm Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Simple Role Pill */}
          <div className="anime-hero-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card text-xs text-muted-foreground mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-medium text-foreground">{CURRENT_ROLE}</span>
            {currentJob && (
              <>
                <span>at</span>
                <a
                  href={currentJob.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-foreground hover:text-primary transition-colors font-medium"
                >
                  {currentJob.organizationName}
                  <ArrowUpRight size={12} />
                </a>
              </>
            )}
          </div>

          <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.04em] text-foreground leading-[1.05]">
            <span ref={nameRef} className="block">
              Nirav Chavda
            </span>
          </h1>

          <p className="anime-hero-fade mt-5 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
            I build thoughtful software with care and craftsmanship — from
            backend services to browser extensions and mobile apps.
          </p>

          {/* Subtle Two-Item Highlights */}
          <div className="anime-hero-fade mt-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="px-3.5 py-1.5 rounded-full bg-surface text-foreground/90 font-medium">
              <YoeValue /> experience
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-surface text-foreground/90 font-medium">
              MCA Gold Medallist
            </span>
          </div>

          {/* Clean Rounded CTA & Social Row */}
          <div className="anime-hero-fade mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground text-sm font-medium transition-colors duration-200"
            >
              <span>View Projects</span>
              <ArrowRight size={15} />
            </Link>

            <div className="flex items-center gap-1.5">
              {SOCIAL_ICONS.map(({ platform, icon, label }) => (
                <SocialMediaLink key={platform} platform={platform}>
                  <span
                    className="w-11 h-11 rounded-full flex items-center justify-center border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
                    title={label}
                    aria-label={label}
                  >
                    {icon}
                  </span>
                </SocialMediaLink>
              ))}
            </div>
          </div>
        </div>

        {/* Right Clean Rounded 3D Avatar / Photo Card */}
        <div className="anime-hero-portrait lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-[350px] sm:max-w-[380px] rounded-[2rem] border border-border bg-card p-3 shadow-xl shadow-black/5 dark:shadow-black/30">
            <div
              ref={viewportRef}
              className="relative aspect-[4/4.3] rounded-[1.5rem] overflow-hidden bg-[#141418]"
            >
              {portraitMode === "avatar" ? (
                <AnimatedAvatar3D />
              ) : (
                <Image
                  src={profileImage.src}
                  alt="Nirav Chavda"
                  fill
                  sizes="(max-width: 1024px) 350px, 380px"
                  className="object-cover"
                  priority
                />
              )}

              {/* Single discreet rounded toggle pill in bottom-right */}
              <button
                type="button"
                onClick={() =>
                  setPortraitMode((m) => (m === "avatar" ? "photo" : "avatar"))
                }
                className="absolute bottom-3.5 right-3.5 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur-md border border-white/15 text-xs text-white/90 transition-colors"
              >
                {portraitMode === "avatar" ? (
                  <>
                    <ImageIcon size={12} />
                    <span>Photo</span>
                  </>
                ) : (
                  <>
                    <UserCheck size={12} />
                    <span>3D Avatar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
