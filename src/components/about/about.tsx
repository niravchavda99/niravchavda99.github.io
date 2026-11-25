"use client";

import React, { useRef, useState } from "react";
import profileImage from "@/src/assets/images/profile.jpg";
import { BsGithub, BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  Copy,
  ImageIcon,
  Sparkles,
  UserCheck,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
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
import { Tilt3DCard } from "@/src/components/motion/tilt-3d-card";
import { Magnetic } from "@/src/components/motion/magnetic";
import { VelocityMarquee } from "@/src/components/motion/velocity-marquee";
import { cn } from "@/src/lib/utils";

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

const EASE = [0.16, 1, 0.3, 1] as const;

type PortraitMode = "avatar" | "photo";

const About = () => {
  const [copied, setCopied] = useState(false);
  const [portraitMode, setPortraitMode] = useState<PortraitMode>("avatar");
  const sectionRef = useRef<HTMLElement>(null);
  const currentJob = jobs[0];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const emailAddress = getSocialMediaLink(SocialMediaPlatform.Mail).replace(
    /^mailto:/i,
    "",
  );

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const marqueeItems = [
    `${CURRENT_ROLE} @ ${currentJob?.organizationName ?? "Incubyte"}`,
    "Software Craftsmanship",
    "Test-Driven Development",
    "Full-Stack & Agentic Workflows",
    "MCA Gold Medallist",
    `${projects.length} Public Artifacts`,
    `${technologies.length} Core Technologies`,
  ];

  return (
    <>
      <section
        id="about"
        ref={sectionRef}
        className="relative w-full px-5 sm:px-8 lg:px-10 pt-28 sm:pt-36 pb-16 sm:pb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Kinetic Typography Stage */}
          <motion.div
            style={{ y: textY }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Animated Status Capsule */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-border bg-card/75 backdrop-blur-md mb-7 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground font-medium">
                {CURRENT_ROLE}
              </span>
              {currentJob && (
                <>
                  <span className="text-border">·</span>
                  <a
                    href={currentJob.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-primary hover:underline"
                  >
                    <span>{currentJob.organizationName}</span>
                    <ArrowUpRight size={11} />
                  </a>
                  <span className="text-border hidden sm:inline">·</span>
                  <span className="font-mono text-[11px] text-muted-foreground hidden sm:inline">
                    {currentJob.location}
                  </span>
                </>
              )}
            </motion.div>

            {/* Masked Kinetic Display Title */}
            <h1 className="text-5xl sm:text-7xl lg:text-[5.15rem] font-semibold tracking-[-0.045em] leading-[0.98] text-foreground">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: "110%", rotateZ: 2 }}
                  animate={{ y: "0%", rotateZ: 0 }}
                  transition={{ duration: 0.75, delay: 0.06, ease: EASE }}
                  className="block"
                >
                  Nirav Chavda
                </motion.span>
              </span>
              <span className="block overflow-hidden pt-1 pb-2 text-2xl sm:text-4xl lg:text-[2.65rem] font-normal tracking-[-0.03em] text-muted-foreground">
                <motion.span
                  initial={{ y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.75, delay: 0.16, ease: EASE }}
                  className="block"
                >
                  Engineering with{" "}
                  <span className="font-serif italic text-primary">
                    craftsmanship
                  </span>{" "}
                  &amp; care.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28, ease: EASE }}
              className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              Learner and enthusiast at heart. Building resilient software
              across backend systems, modern web interfaces, browser extensions,
              and cross-platform mobile apps.
            </motion.p>

            {/* Magnetic CTAs & Social Dock */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.38, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-3.5"
            >
              <Magnetic strength={0.2}>
                <Link
                  href="/projects"
                  data-cursor="ARCHIVE"
                  className="group relative inline-flex items-center gap-2.5 h-12 px-6 rounded-full bg-foreground text-background text-sm font-medium overflow-hidden shadow-lg shadow-black/10 dark:shadow-black/40"
                >
                  <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 group-hover:text-primary-foreground transition-colors">
                    Explore Projects
                  </span>
                  <span className="relative z-10 font-mono text-xs opacity-70 group-hover:text-primary-foreground">
                    [{projects.length}]
                  </span>
                  <ArrowRight
                    size={15}
                    className="relative z-10 group-hover:translate-x-0.5 group-hover:text-primary-foreground transition-all"
                  />
                </Link>
              </Magnetic>

              <Magnetic strength={0.2}>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 h-12 px-5 rounded-full border border-border bg-card/80 backdrop-blur-md hover:border-primary/50 text-foreground text-sm font-medium transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={15} className="text-emerald-500" />
                      <span>Email Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="text-muted-foreground" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </Magnetic>

              <div className="flex items-center gap-1.5 pl-1">
                {SOCIAL_ICONS.map(({ platform, icon, label }) => (
                  <Magnetic key={platform} strength={0.3}>
                    <SocialMediaLink platform={platform}>
                      <span
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-border bg-card/75 backdrop-blur-md text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                        title={label}
                        aria-label={label}
                      >
                        {icon}
                      </span>
                    </SocialMediaLink>
                  </Magnetic>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Animated 3D Character / Portrait Monolith */}
          <motion.div
            style={{ y: cardY }}
            initial={{ opacity: 0, scale: 0.92, rotateY: -8 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[370px] sm:max-w-[405px]">
              <Tilt3DCard
                maxTilt={portraitMode === "avatar" ? 5 : 13}
                glareOpacity={portraitMode === "avatar" ? 0.08 : 0.24}
                className="rounded-3xl border border-border/90 bg-card/85 backdrop-blur-xl p-4 shadow-2xl shadow-black/15 dark:shadow-black/60"
              >
                {/* Top HUD Bar with 3D Avatar <-> Photo Switch */}
                <div className="flex items-center justify-between gap-2 px-1.5 pb-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    <Sparkles size={11} className="text-primary" />
                    STUDIO // NC
                  </span>

                  <div
                    role="group"
                    aria-label="Portrait view mode"
                    className="inline-flex items-center p-0.5 rounded-lg border border-border bg-surface/80"
                  >
                    <button
                      type="button"
                      onClick={() => setPortraitMode("avatar")}
                      aria-pressed={portraitMode === "avatar"}
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-mono text-[10px] transition-colors",
                        portraitMode === "avatar"
                          ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <UserCheck size={10} />
                      <span>3D Avatar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPortraitMode("photo")}
                      aria-pressed={portraitMode === "photo"}
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-mono text-[10px] transition-colors",
                        portraitMode === "photo"
                          ? "bg-foreground text-background font-semibold shadow-sm"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <ImageIcon size={10} />
                      <span>Photo</span>
                    </button>
                  </div>
                </div>

                {/* Viewport Plane */}
                <div className="relative aspect-[4/4.35] rounded-2xl overflow-hidden border border-border bg-[#08080e]">
                  <AnimatePresence mode="wait">
                    {portraitMode === "avatar" ? (
                      <motion.div
                        key="3d-avatar"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full"
                      >
                        <AnimatedAvatar3D />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="photo"
                        initial={{ opacity: 0, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={profileImage.src}
                          alt="Nirav Chavda"
                          fill
                          sizes="(max-width: 1024px) 370px, 405px"
                          className="object-cover"
                          priority
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom Subtle Gradient + Caption */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-20" />
                  <div className="pointer-events-none absolute bottom-3.5 left-4 right-4 z-20 flex items-end justify-between text-white">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/65">
                        Clean Code &amp; Craft
                      </p>
                      <p className="text-base font-semibold tracking-tight">
                        Nirav Chavda
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 font-mono text-[10px]">
                      {currentJob?.location ?? "Remote"}
                    </span>
                  </div>
                </div>

                {/* Floating 3D Z-Translated Telemetry Pills */}
                <div className="mt-3.5 grid grid-cols-2 gap-2.5 translate-z-20">
                  <div className="rounded-xl border border-border bg-surface/80 p-3 backdrop-blur-md">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      Experience
                    </p>
                    <p className="mt-1 text-lg font-bold font-mono text-foreground">
                      <YoeValue />
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-surface/80 p-3 backdrop-blur-md">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground flex items-center gap-1">
                      <Award size={11} className="text-accent" />
                      MCA Honor
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground truncate">
                      Gold Medallist
                    </p>
                  </div>
                </div>
              </Tilt3DCard>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll-Velocity Kinetic Marquee */}
      <VelocityMarquee items={marqueeItems} baseVelocity={-1.8} />
    </>
  );
};

export default About;
