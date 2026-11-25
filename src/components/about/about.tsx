"use client";

import React, { useEffect, useRef, useState } from "react";
import profileImage from "@/src/assets/images/profile.jpg";
import { BsGithub, BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  ImageIcon,
  UserCheck,
} from "lucide-react";
import {
  animate,
  createScope,
  createSpring,
  createTimeline,
  scrambleText,
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
import { projects } from "@/src/data/projects";
import { technologies } from "@/src/data/skills";
import { getSocialMediaLink } from "@/src/app/links";
import { AnimeStaggerPlayground } from "@/src/components/motion/anime-grid-wave";
import { cn } from "@/src/lib/utils";

const SOCIAL_ICONS = [
  {
    platform: SocialMediaPlatform.Github,
    icon: <BsGithub size={15} />,
    label: "GitHub",
  },
  {
    platform: SocialMediaPlatform.Linkedin,
    icon: <BsLinkedin size={14} />,
    label: "LinkedIn",
  },
  {
    platform: SocialMediaPlatform.X,
    icon: <BsTwitterX size={13} />,
    label: "X",
  },
  {
    platform: SocialMediaPlatform.Instagram,
    icon: <BsInstagram size={14} />,
    label: "Instagram",
  },
  {
    platform: SocialMediaPlatform.Mail,
    icon: <IoMail size={16} />,
    label: "Email",
  },
];

type PortraitMode = "avatar" | "photo";

const About = () => {
  const [copied, setCopied] = useState(false);
  const [portraitMode, setPortraitMode] = useState<PortraitMode>("avatar");
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const roleReadoutRef = useRef<HTMLSpanElement>(null);
  const viewportStageRef = useRef<HTMLDivElement>(null);
  const currentJob = jobs[0];

  const emailAddress = getSocialMediaLink(SocialMediaPlatform.Mail).replace(
    /^mailto:/i,
    "",
  );

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

      if (roleReadoutRef.current) {
        tl.add(
          roleReadoutRef.current,
          {
            innerHTML: scrambleText({
              text: `${CURRENT_ROLE} // ${currentJob?.organizationName ?? "Incubyte"}`,
              chars: "uppercase",
              revealRate: 48,
              settleDuration: 240,
            }),
            duration: 760,
          },
          0,
        );
      }

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
              ease: createSpring({ stiffness: 250, damping: 18 }),
              delay: stagger(26, { from: "first" }),
            },
            80,
          );
        }
      }

      tl.add(
        ".anime-hero-line",
        {
          y: [20, 0],
          opacity: [0, 1],
          duration: 720,
          delay: stagger(90),
        },
        240,
      );

      // Animate keyframe bars filling in + oscillating keyframe nodes (animejs.com signature!)
      tl.add(
        ".anime-kf-bar",
        {
          scaleX: [0, 1],
          duration: 900,
          delay: stagger(100),
          ease: "outQuart",
        },
        320,
      );

      animate(".anime-kf-playhead", {
        left: ["8%", "88%"],
        duration: stagger([2600, 3800]),
        delay: stagger(280),
        ease: "inOutSine",
        alternate: true,
        loop: true,
      });
    });

    return () => {
      scope.revert();
    };
  }, [currentJob?.organizationName]);

  useEffect(() => {
    if (!viewportStageRef.current) return;
    animate(viewportStageRef.current, {
      opacity: [0.3, 1],
      scale: [0.98, 1],
      duration: 280,
      ease: "outCubic",
    });
  }, [portraitMode]);

  const keyframeSpecs = [
    {
      prop: "role",
      value: CURRENT_ROLE,
      sub: currentJob?.organizationName ?? "Incubyte",
      color: "#FF4B4B",
    },
    {
      prop: "experience",
      value: <YoeValue />,
      sub: "Since Jul 2022",
      color: "#FFC730",
    },
    {
      prop: "distinction",
      value: "Gold Medallist",
      sub: "MCA · Gujarat Univ.",
      color: "#5CE68A",
    },
    {
      prop: "ecosystem",
      value: `${projects.length} Builds · ${technologies.length} Tech`,
      sub: "Full-Stack & Agentic",
      color: "#38BDF8",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full border-b border-border"
    >
      {/* Top Track Status Strip */}
      <div className="px-5 sm:px-8 lg:px-10 h-10 border-b border-border bg-surface/45 flex items-center justify-between gap-4 font-mono text-[11px]">
        <div className="flex items-center gap-2.5 truncate">
          <span className="w-2.5 h-2.5 bg-[#FF4B4B] shrink-0" />
          <span className="text-[#FF4B4B] font-bold">TRACK 00</span>
          <span className="text-border">/</span>
          <span
            ref={roleReadoutRef}
            className="uppercase tracking-[0.14em] text-foreground truncate"
          >
            {CURRENT_ROLE} // {currentJob?.organizationName ?? "Incubyte"}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-muted-foreground shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#5CE68A] animate-pulse" />
          <span>
            OPEN TO COLLABORATION · {currentJob?.location ?? "REMOTE"}
          </span>
        </div>
      </div>

      {/* Main Split Instrument Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border">
        {/* Left 7 Cols: Display Typography + Keyframe Property Lanes */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="px-5 sm:px-8 lg:px-10 py-10 sm:py-14 bg-dot-matrix">
            <h1 className="text-5xl sm:text-7xl lg:text-[5.25rem] font-bold tracking-[-0.05em] leading-[0.94] text-foreground">
              <span ref={nameRef} className="block">
                Nirav Chavda
              </span>
            </h1>

            <p className="anime-hero-line mt-5 text-xl sm:text-2xl font-medium tracking-[-0.025em] text-foreground/90 max-w-xl leading-snug">
              Crafting resilient software with precision,{" "}
              <span className="text-[#FF4B4B]">motion</span>, and{" "}
              <span className="text-[#FFC730]">care</span>.
            </p>

            <p className="anime-hero-line mt-3.5 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Learner and enthusiast at heart — delivering thoughtfully
              engineered backend systems, interactive web experiences, Chrome
              extensions, and mobile apps at{" "}
              {currentJob ? (
                <a
                  href={currentJob.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-foreground underline decoration-border hover:decoration-[#FF4B4B] transition-colors"
                >
                  {currentJob.organizationName}
                  <ArrowUpRight size={13} />
                </a>
              ) : (
                "Incubyte"
              )}
              .
            </p>

            {/* animejs.com Crisp Modular Action Bar */}
            <div className="anime-hero-line mt-8 flex flex-wrap items-center gap-2.5">
              <Link
                href="/projects"
                data-cursor="OPEN"
                className="inline-flex items-center gap-2.5 h-11 px-5 bg-[#FF4B4B] text-[#1D1C1B] font-mono text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#FFC730] transition-colors"
              >
                <span>Explore Works [{projects.length}]</span>
                <ArrowRight size={14} />
              </Link>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 h-11 px-4 border border-border bg-card hover:bg-surface font-mono text-xs text-foreground transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-[#5CE68A]" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} className="text-muted-foreground" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>

              <div className="flex items-center border border-border bg-card divide-x divide-border">
                {SOCIAL_ICONS.map(({ platform, icon, label }) => (
                  <SocialMediaLink key={platform} platform={platform}>
                    <span
                      className="w-11 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
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

          {/* Live Anime.js Property Keyframe Lanes (Direct homage to animejs.com timeline UI!) */}
          <div className="border-t border-border divide-y divide-border font-mono text-xs bg-card/60">
            {keyframeSpecs.map((item) => (
              <div
                key={item.prop}
                className="grid grid-cols-12 items-center min-h-[46px] divide-x divide-border"
              >
                <div className="col-span-4 sm:col-span-3 px-4 py-2.5 flex items-center gap-2 text-muted-foreground truncate">
                  <span
                    style={{ backgroundColor: item.color }}
                    className="w-2 h-2 shrink-0"
                  />
                  <span className="truncate">{item.prop}</span>
                </div>

                {/* Animated Keyframe Track */}
                <div className="hidden sm:flex sm:col-span-4 h-full items-center px-4 relative bg-surface/35 overflow-hidden">
                  <div
                    style={{ backgroundColor: `${item.color}30` }}
                    className="anime-kf-bar w-full h-1.5 origin-left relative"
                  >
                    <span
                      style={{ backgroundColor: item.color }}
                      className="absolute left-0 -top-[3px] w-3 h-3 rotate-45"
                    />
                    <span
                      style={{ backgroundColor: item.color }}
                      className="absolute right-0 -top-[3px] w-3 h-3 rotate-45"
                    />
                  </div>
                  <span
                    style={{ backgroundColor: item.color }}
                    className="anime-kf-playhead absolute top-1/2 -translate-y-1/2 w-2 h-5"
                  />
                </div>

                <div className="col-span-8 sm:col-span-5 px-4 py-2.5 flex items-center justify-between gap-2">
                  <span className="font-semibold text-foreground truncate">
                    {item.value}
                  </span>
                  <span className="text-[10px] text-muted-foreground hidden md:inline shrink-0">
                    {item.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: Live 3D Viewport Inspector */}
        <div className="lg:col-span-5 flex flex-col bg-card/40">
          {/* Inspector Header Bar */}
          <div className="px-4 h-10 border-b border-border bg-surface/40 flex items-center justify-between gap-2 font-mono text-[10px]">
            <span className="text-muted-foreground uppercase tracking-[0.14em]">
              VIEWPORT // 3D RIG
            </span>

            <div
              role="group"
              aria-label="Portrait view mode"
              className="inline-flex items-center border border-border bg-background divide-x divide-border"
            >
              <button
                type="button"
                onClick={() => setPortraitMode("avatar")}
                aria-pressed={portraitMode === "avatar"}
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 transition-colors",
                  portraitMode === "avatar"
                    ? "bg-[#FFC730] text-[#1D1C1B] font-bold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <UserCheck size={11} />
                <span>3D RIG</span>
              </button>
              <button
                type="button"
                onClick={() => setPortraitMode("photo")}
                aria-pressed={portraitMode === "photo"}
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 transition-colors",
                  portraitMode === "photo"
                    ? "bg-foreground text-background font-bold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <ImageIcon size={11} />
                <span>PHOTO</span>
              </button>
            </div>
          </div>

          {/* 3D Character / Photo Stage */}
          <div
            ref={viewportStageRef}
            className="relative flex-1 min-h-[380px] sm:min-h-[440px] bg-[#191817] overflow-hidden"
          >
            {portraitMode === "avatar" ? (
              <AnimatedAvatar3D />
            ) : (
              <div className="relative w-full h-full min-h-[380px]">
                <Image
                  src={profileImage.src}
                  alt="Nirav Chavda"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Corner Crosshair Brackets */}
            <span className="pointer-events-none absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30 z-20" />
            <span className="pointer-events-none absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30 z-20" />
            <span className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30 z-20" />
          </div>

          {/* Bottom Viewport Telemetry Footer */}
          <div className="px-4 h-9 border-t border-border bg-surface/40 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
            <span>FPS: 60 · PBR THREE.JS</span>
            <span>CURSOR TRACKING: ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Bottom Interactive animejs.com 2D Stagger Playground */}
      <AnimeStaggerPlayground />
    </section>
  );
};

export default About;
