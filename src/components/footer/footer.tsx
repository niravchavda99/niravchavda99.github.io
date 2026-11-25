"use client";

import React, { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { getSocialMediaLink } from "@/src/app/links";
import { SocialMediaPlatform } from "@/src/components/common/social-media-platform";

const FOOTER_SOCIALS = [
  { label: "GitHub", platform: SocialMediaPlatform.Github },
  { label: "LinkedIn", platform: SocialMediaPlatform.Linkedin },
  { label: "X", platform: SocialMediaPlatform.X },
  { label: "Instagram", platform: SocialMediaPlatform.Instagram },
];

const Footer = () => {
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
    <footer className="max-w-5xl w-full mx-auto px-5 sm:px-8 pt-6 pb-14">
      <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Get in touch
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-md">
            Always happy to chat about software craftsmanship, developer tools,
            or open-source collaboration.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href={mailHref}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground text-sm font-medium transition-colors"
          >
            <Mail size={15} />
            <span>Email me</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 h-11 px-4 rounded-full border border-border bg-surface hover:bg-muted text-sm text-foreground transition-colors"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} className="text-muted-foreground" />
                <span>Copy email</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-8 px-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© {year} Nirav Chavda</p>

        <div className="flex items-center gap-5">
          {FOOTER_SOCIALS.map(({ label, platform }) => (
            <a
              key={platform}
              href={getSocialMediaLink(platform)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
