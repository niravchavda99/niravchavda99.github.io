"use client";

import React, { useEffect, useRef, useState } from "react";
import { ThemeSwitch } from "@/src/components/theme/theme-switch";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Command, Menu, X } from "lucide-react";
import { animate, createAnimatable, createSpring } from "animejs";
import type { AnimatableObject } from "animejs";
import { cn } from "@/src/lib/utils";
import { projects } from "@/src/data/projects";
import { CURRENT_ROLE } from "@/src/data/profile";
import { triggerCommandPalette } from "@/src/components/command-palette/command-palette";
import { Magnetic } from "@/src/components/motion/magnetic";

const HOME_SECTIONS = [
  { label: "Work", href: "/#work", id: "work" },
  { label: "Trajectory", href: "/#experience", id: "experience" },
  { label: "Constellation", href: "/#skills", id: "skills" },
  { label: "Labs", href: "/#activities", id: "activities" },
];

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjects = pathname === "/projects" || pathname === "/projects/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const progressAnimRef = useRef<AnimatableObject | null>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Anime.js Dock Entrance + Scroll Progress Laser Animatable
  useEffect(() => {
    if (dockRef.current) {
      animate(dockRef.current, {
        y: [-24, 0],
        opacity: [0, 1],
        ease: createSpring({ stiffness: 240, damping: 22 }),
      });
    }

    if (progressRef.current) {
      progressAnimRef.current = createAnimatable(progressRef.current, {
        scaleX: { duration: 220, ease: "out(3)" },
      });
    }

    return () => {
      progressAnimRef.current?.revert();
      progressAnimRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen && mobileDrawerRef.current) {
      animate(mobileDrawerRef.current, {
        opacity: [0, 1],
        y: [-8, 0],
        duration: 240,
        ease: "outCubic",
      });
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const NAVBAR_OFFSET = 160;

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const ratio = Math.min(1, Math.max(0, y / maxScroll));
      progressAnimRef.current?.scaleX(ratio);

      if (!isHome) {
        setActiveSection("");
        return;
      }
      if (y < 200) {
        setActiveSection("");
        return;
      }
      let current = "";
      for (const { id } of HOME_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= NAVBAR_OFFSET) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      ref={navRef}
      className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-3 sm:pt-4 pointer-events-none"
    >
      <div
        ref={dockRef}
        className={cn(
          "pointer-events-auto relative max-w-5xl mx-auto rounded-2xl border transition-all duration-300 overflow-hidden",
          scrolled
            ? "border-border/90 bg-card/80 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/50"
            : "border-border/60 bg-card/55 backdrop-blur-md",
        )}
      >
        <div className="px-4 sm:px-5 h-14 flex items-center justify-between gap-3">
          {/* Identity Capsule */}
          <Magnetic strength={0.18}>
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-xl bg-foreground text-background flex items-center justify-center shrink-0 overflow-hidden">
                <span className="font-mono text-[11px] font-bold tracking-tight relative z-10">
                  NC
                </span>
                <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight text-foreground leading-none">
                  Nirav Chavda
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground mt-1 leading-none">
                  {CURRENT_ROLE}
                </span>
              </div>
            </Link>
          </Magnetic>

          {/* Spatial Pill Navigation */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-0.5 p-1 rounded-xl border border-border/70 bg-surface/50"
          >
            {HOME_SECTIONS.map(({ label, href, id }) => {
              const active = isHome && activeSection === id;
              const itemClass = cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                active
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              );

              return isHome ? (
                <a key={id} href={href} className={itemClass}>
                  {label}
                </a>
              ) : (
                <Link key={id} href={href} className={itemClass}>
                  {label}
                </Link>
              );
            })}

            <Link
              href="/projects"
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-all duration-200",
                isProjects
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span>Archive</span>
              <span
                className={cn(
                  "font-mono text-[10px] px-1.5 py-0.5 rounded leading-none",
                  isProjects
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {projects.length}
              </span>
            </Link>
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Magnetic strength={0.22}>
              <button
                type="button"
                onClick={triggerCommandPalette}
                aria-label="Open command menu"
                className="hidden sm:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-border bg-card/80 hover:border-primary/50 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Command size={12} className="text-primary" />
                <span className="font-mono text-[11px]">K</span>
              </button>
            </Magnetic>

            <Magnetic strength={0.22}>
              <ThemeSwitch />
            </Magnetic>

            <button
              type="button"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-menu"
              className="md:hidden h-8 w-8 rounded-lg flex items-center justify-center border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
            >
              {isMenuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>

        {/* Anime.js Live Scroll Laser Progress Bar */}
        <div
          ref={progressRef}
          aria-hidden="true"
          style={{ transform: "scaleX(0)" }}
          className="h-[2px] w-full origin-left bg-gradient-to-r from-primary via-accent to-primary will-change-transform"
        />

        {/* Mobile Drawer */}
        {isMenuOpen && (
          <div
            ref={mobileDrawerRef}
            id="mobile-nav-menu"
            className="md:hidden border-t border-border bg-card/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-1">
              {!isHome && (
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  Overview
                </Link>
              )}
              {HOME_SECTIONS.map(({ label, href, id }) => {
                const active = isHome && activeSection === id;
                const classes = cn(
                  "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-foreground/85 hover:text-foreground hover:bg-muted",
                );
                return isHome ? (
                  <a
                    key={id}
                    href={href}
                    onClick={closeMenu}
                    className={classes}
                  >
                    <span>{label}</span>
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </a>
                ) : (
                  <Link
                    key={id}
                    href={href}
                    onClick={closeMenu}
                    className={classes}
                  >
                    <span>{label}</span>
                  </Link>
                );
              })}

              <Link
                href="/projects"
                onClick={closeMenu}
                className={cn(
                  "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between",
                  isProjects
                    ? "bg-primary/15 text-primary"
                    : "text-foreground/85 hover:text-foreground hover:bg-muted",
                )}
              >
                <span>Projects Archive</span>
                <span className="font-mono text-xs text-muted-foreground">
                  [{projects.length}]
                </span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  triggerCommandPalette();
                }}
                className="mt-2 w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-border bg-surface text-xs font-mono text-muted-foreground hover:text-foreground"
              >
                <span>Command HUD</span>
                <span>⌘K</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
