"use client";

import React, { useState } from "react";
import nextjsDark from "@/src/assets/icons/tech/nextjs-dark.svg";
import nextjsLight from "@/src/assets/icons/tech/nextjs-light.svg";
import tailwind from "@/src/assets/icons/tech/tailwind.png";
import Image from "next/image";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { ThemeMode, useTheme } from "@/src/components/theme/theme-context";
import { getSocialMediaLink } from "@/src/app/links";
import { SocialMediaPlatform } from "@/src/components/common/social-media-platform";
import { triggerCommandPalette } from "@/src/components/command-palette/command-palette";

const FOOTER_SOCIALS = [
  { label: "GitHub", platform: SocialMediaPlatform.Github, color: "#FF4B4B" },
  {
    label: "LinkedIn",
    platform: SocialMediaPlatform.Linkedin,
    color: "#38BDF8",
  },
  { label: "X / Twitter", platform: SocialMediaPlatform.X, color: "#FFC730" },
  {
    label: "Instagram",
    platform: SocialMediaPlatform.Instagram,
    color: "#C084FC",
  },
];

const Footer = () => {
  const { mode } = useTheme();
  const [copied, setCopied] = useState(false);
  const year = new Date().getFullYear();

  const mailHref = getSocialMediaLink(SocialMediaPlatform.Mail);
  const email = mailHref.replace(/^mailto:/i, "");

  const handleCopy = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="max-w-[1360px] mx-auto sm:border-x sm:border-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border">
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 bg-card/45">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF4B4B] mb-4">
              <span className="w-2 h-2 bg-[#FF4B4B]" />
              <span>END OF TIMELINE // CONNECT</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.045em] text-foreground leading-[1.03]">
              Let&apos;s build something{" "}
              <span className="text-[#FFC730]">remarkable.</span>
            </h2>

            <p className="mt-3.5 text-sm sm:text-base text-muted-foreground max-w-lg leading-relaxed">
              Open to open-source collaboration, developer tooling ideas, and
              thoughtful software engineering conversations.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5 font-mono text-xs">
              <a
                href={mailHref}
                className="inline-flex items-center gap-2 h-11 px-5 bg-[#FF4B4B] text-[#1D1C1B] font-bold uppercase tracking-wider hover:bg-[#FFC730] transition-colors"
              >
                <Mail size={14} />
                <span>SEND EMAIL</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 h-11 px-4 border border-border bg-card hover:bg-surface text-foreground transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-[#5CE68A]" />
                    <span>COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} className="text-muted-foreground" />
                    <span>{email}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 divide-x divide-y divide-border bg-surface/25">
            {FOOTER_SOCIALS.map(({ label, platform, color }) => (
              <a
                key={platform}
                href={getSocialMediaLink(platform)}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 sm:p-8 flex flex-col justify-between gap-6 hover:bg-card transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{ backgroundColor: color }}
                    className="w-2.5 h-2.5"
                  />
                  <ArrowUpRight
                    size={15}
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                  />
                </div>
                <span className="font-mono text-sm font-bold text-foreground">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Colophon Bar */}
        <div className="px-5 sm:px-8 lg:px-10 py-4 border-t border-border bg-surface/40 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>
              © {year}{" "}
              <a
                href="https://niravchavda.in"
                className="text-foreground font-semibold hover:text-[#FF4B4B] transition-colors"
              >
                Nirav Chavda
              </a>
            </span>
            <span>·</span>
            <span>ANIME.JS v4 + THREE.JS</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={triggerCommandPalette}
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <span>COMMAND</span>
              <kbd className="px-1.5 py-0.5 border border-border bg-card text-[10px]">
                ⌘K
              </kbd>
            </button>

            <div className="flex items-center gap-2">
              <Image
                width={13}
                height={13}
                src={mode === ThemeMode.Dark ? nextjsLight.src : nextjsDark.src}
                alt="Next.js"
                className="object-contain opacity-75"
              />
              <span>+</span>
              <Image
                src={tailwind.src}
                alt="Tailwind CSS"
                className="object-contain opacity-85"
                width={13}
                height={13}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
