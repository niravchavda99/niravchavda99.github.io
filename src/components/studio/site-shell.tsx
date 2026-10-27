"use client";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Pause, Play, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/src/content/portfolio";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "running";
  }, [paused]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="Nirav Chavda home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark">
            n<span>.</span>
          </span>
          <span>
            NIRAV CHAVDA
            <span className="brand-caption">{profile.role.toUpperCase()}</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <Link href="/#toolkit">Skills</Link>
          <Link href="/#journey">Journey</Link>
          <Link href="/#education">Education</Link>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button motion-toggle"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Play animations" : "Pause animations"}
            aria-pressed={paused}
          >
            {paused ? <Play size={15} /> : <Pause size={15} />}
          </button>
          <a
            className="contact-link"
            href={`mailto:${profile.email}`}
            aria-label="Email Nirav"
          >
            <span className="contact-label">Let’s talk</span>{" "}
            <ArrowUpRight size={16} />
          </a>
          <button
            className="icon-button menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {[
            { label: "Work", href: "/#work" },
            { label: "About", href: "/#about" },
            { label: "Skills", href: "/#toolkit" },
            { label: "Journey", href: "/#journey" },
            { label: "Education", href: "/#education" },
            { label: "All projects", href: "/projects/" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer container">
      <Link href="/" className="footer-name">
        Nirav Chavda<span>Built with intention. Always evolving.</span>
      </Link>
      <div className="footer-socials">
        {profile.socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
          >
            {social.label}
            <ArrowUpRight size={13} />
          </a>
        ))}
      </div>
      <a href="#top" className="back-top" aria-label="Back to top">
        <ArrowUp size={19} />
      </a>
    </footer>
  );
}
