"use client";

import React, { useEffect, useRef, useState } from "react";
import nextjsDark from "@/src/assets/icons/tech/nextjs-dark.svg";
import nextjsLight from "@/src/assets/icons/tech/nextjs-light.svg";
import tailwind from "@/src/assets/icons/tech/tailwind.png";
import Image from "next/image";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { animate, createScope, onScroll } from "animejs";
import { ThemeMode, useTheme } from "@/src/components/theme/theme-context";
import { getSocialMediaLink } from "@/src/app/links";
import { SocialMediaPlatform } from "@/src/components/common/social-media-platform";
import { triggerCommandPalette } from "@/src/components/command-palette/command-palette";
import { Magnetic } from "@/src/components/motion/magnetic";

const FOOTER_SOCIALS = [
  { label: "GitHub", platform: SocialMediaPlatform.Github },
  { label: "LinkedIn", platform: SocialMediaPlatform.Linkedin },
  { label: "X / Twitter", platform: SocialMediaPlatform.X },
  { label: "Instagram", platform: SocialMediaPlatform.Instagram },
];

const Footer = () => {
  const { mode } = useTheme();
  const [copied, setCopied] = useState(false);
  const footerCardRef = useRef<HTMLDivElement>(null);
  const year = new Date().getFullYear();

  const mailHref = getSocialMediaLink(SocialMediaPlatform.Mail);
  const email = mailHref.replace(/^mailto:/i, "");

  useEffect(() => {
    const root = footerCardRef.current;
    if (!root) return;
    const scope = createScope({ root }).add(() => {
      animate(root, {
        y: [28, 0],
        opacity: [0, 1],
        duration: 820,
        ease: "outExpo",
        autoplay: onScroll({
          target: root,
          enter: "bottom-=60 top",
        }),
      });
    });
    return () => {
      scope.revert();
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="w-full px-5 sm:px-8 lg:px-10 pt-10 pb-10">
      <div className="max-w-6xl mx-auto">
        <div
          ref={footerCardRef}
          className="relative rounded-3xl border border-border bg-card/85 backdrop-blur-xl p-7 sm:p-12 overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/50"
        >
          {/* Ambient radial accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start lg:items-end">
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-3">
                Initiate Connection
              </p>
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.04em] text-foreground leading-[1.05]">
                Let&apos;s build something{" "}
                <span className="font-serif italic font-normal text-primary">
                  remarkable.
                </span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-lg leading-relaxed">
                Open to open-source collaboration, developer tooling ideas, and
                thoughtful engineering conversations.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Magnetic strength={0.2}>
                  <a
                    href={mailHref}
                    className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground text-sm font-medium transition-colors"
                  >
                    <Mail size={15} />
                    <span>Send an Email</span>
                  </a>
                </Magnetic>

                <Magnetic strength={0.2}>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 h-11 px-4 rounded-full border border-border bg-surface/80 hover:border-primary/50 font-mono text-xs text-foreground transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-emerald-500" />
                        <span>Copied to clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} className="text-muted-foreground" />
                        <span>{email}</span>
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </div>

            <div className="lg:col-span-5 w-full grid grid-cols-2 gap-3">
              {FOOTER_SOCIALS.map(({ label, platform }) => (
                <a
                  key={platform}
                  href={getSocialMediaLink(platform)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-4 py-3.5 rounded-2xl border border-border bg-surface/60 hover:border-primary/50 hover:bg-surface transition-all"
                >
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {label}
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Colophon */}
          <div className="relative z-10 mt-10 pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>
                © {year}{" "}
                <a
                  href="https://niravchavda.in"
                  className="text-foreground font-medium hover:text-primary transition-colors"
                >
                  Nirav Chavda
                </a>
              </span>
              <span className="text-border">·</span>
              <span className="font-mono text-[11px]">
                Powered by Anime.js + Three.js
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={triggerCommandPalette}
                className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Command HUD</span>
                <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface text-[10px]">
                  ⌘K
                </kbd>
              </button>

              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span>Built with</span>
                <Image
                  width={14}
                  height={14}
                  src={
                    mode === ThemeMode.Dark ? nextjsLight.src : nextjsDark.src
                  }
                  alt="Next.js"
                  className="object-contain opacity-75"
                />
                <span>+</span>
                <Image
                  src={tailwind.src}
                  alt="Tailwind CSS"
                  className="object-contain opacity-85"
                  width={14}
                  height={14}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
