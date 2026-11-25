"use client";

import React, { useEffect, useRef, useState } from "react";
import { ThemeSwitch } from "@/src/components/theme/theme-switch";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Command, Menu, X } from "lucide-react";
import { animate } from "animejs";
import { cn } from "@/src/lib/utils";
import { projects } from "@/src/data/projects";
import { CURRENT_ROLE } from "@/src/data/profile";
import { triggerCommandPalette } from "@/src/components/command-palette/command-palette";

const HOME_SECTIONS = [
  { label: "Works", href: "/#work", id: "work", dot: "#FFC730" },
  { label: "Timeline", href: "/#experience", id: "experience", dot: "#5CE68A" },
  { label: "Matrix", href: "/#skills", id: "skills", dot: "#38BDF8" },
  { label: "Labs", href: "/#activities", id: "activities", dot: "#C084FC" },
];

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjects = pathname === "/projects" || pathname === "/projects/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navRef = useRef<HTMLElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen && mobileDrawerRef.current) {
      animate(mobileDrawerRef.current, {
        opacity: [0, 1],
        y: [-6, 0],
        duration: 200,
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
    const NAVBAR_OFFSET = 180;
    const handleScroll = () => {
      if (!isHome || window.scrollY < 180) {
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
      className="sticky top-0 z-50 w-full border-b border-border bg-background/92 backdrop-blur-md"
    >
      <div className="max-w-[1360px] mx-auto sm:border-x sm:border-border h-14 flex items-center justify-between divide-x divide-border">
        {/* Cell 1: Brand Monogram + Spectrum Tag */}
        <Link
          href="/"
          className="px-4 sm:px-6 h-full flex items-center gap-3 hover:bg-surface/60 transition-colors shrink-0"
        >
          <div className="flex items-center gap-1">
            <span className="w-2 h-4 bg-[#FF4B4B]" />
            <span className="w-2 h-4 bg-[#FFC730]" />
            <span className="w-2 h-4 bg-[#5CE68A]" />
          </div>
          <span className="font-mono text-xs sm:text-sm font-bold tracking-tight text-foreground">
            nirav.chavda
          </span>
          <span className="hidden lg:inline-flex px-1.5 py-0.5 bg-surface border border-border font-mono text-[10px] text-muted-foreground">
            {CURRENT_ROLE}
          </span>
        </Link>

        {/* Cell 2: Modular Track Navigation (Desktop) */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center flex-1 h-full divide-x divide-border overflow-x-auto"
        >
          {HOME_SECTIONS.map(({ label, href, id, dot }) => {
            const active = isHome && activeSection === id;
            const cls = cn(
              "px-4 lg:px-5 h-full inline-flex items-center gap-2 font-mono text-xs transition-colors",
              active
                ? "bg-foreground text-background font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-surface/50",
            );
            const inner = (
              <>
                <span
                  style={{ backgroundColor: dot }}
                  className="w-2 h-2 rounded-full shrink-0"
                />
                <span>{label}</span>
              </>
            );
            return isHome ? (
              <a key={id} href={href} className={cls}>
                {inner}
              </a>
            ) : (
              <Link key={id} href={href} className={cls}>
                {inner}
              </Link>
            );
          })}

          <Link
            href="/projects"
            className={cn(
              "px-4 lg:px-5 h-full inline-flex items-center gap-2 font-mono text-xs transition-colors",
              isProjects
                ? "bg-foreground text-background font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-surface/50",
            )}
          >
            <span className="w-2 h-2 rounded-full bg-[#FF4B4B]" />
            <span>Archive</span>
            <span
              className={cn(
                "px-1.5 py-0.5 text-[10px]",
                isProjects
                  ? "bg-background/20 text-background"
                  : "bg-surface text-muted-foreground",
              )}
            >
              {projects.length}
            </span>
          </Link>
        </nav>

        {/* Cell 3: Right Instrument Controls */}
        <div className="px-3 sm:px-5 h-full flex items-center gap-2 shrink-0 ml-auto md:ml-0">
          <button
            type="button"
            onClick={triggerCommandPalette}
            aria-label="Open command menu"
            className="hidden sm:inline-flex items-center gap-1.5 h-8 px-2.5 border border-border bg-card hover:bg-surface font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <Command size={12} className="text-[#FF4B4B]" />
            <span>K</span>
          </button>

          <ThemeSwitch />

          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="md:hidden h-8 w-8 flex items-center justify-center border border-border bg-card text-muted-foreground hover:text-foreground"
          >
            {isMenuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile Instrument Drawer */}
      {isMenuOpen && (
        <div
          ref={mobileDrawerRef}
          className="md:hidden border-t border-border bg-background divide-y divide-border font-mono text-xs"
        >
          {!isHome && (
            <Link
              href="/"
              onClick={closeMenu}
              className="px-5 py-3.5 flex items-center gap-2.5 text-muted-foreground hover:text-foreground hover:bg-surface"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF4B4B]" />
              <span>00 Overview</span>
            </Link>
          )}
          {HOME_SECTIONS.map(({ label, href, id, dot }, idx) => {
            const inner = (
              <>
                <span
                  style={{ backgroundColor: dot }}
                  className="w-2 h-2 rounded-full"
                />
                <span>
                  0{idx + 1} {label}
                </span>
              </>
            );
            return isHome ? (
              <a
                key={id}
                href={href}
                onClick={closeMenu}
                className="px-5 py-3.5 flex items-center gap-2.5 text-foreground hover:bg-surface"
              >
                {inner}
              </a>
            ) : (
              <Link
                key={id}
                href={href}
                onClick={closeMenu}
                className="px-5 py-3.5 flex items-center gap-2.5 text-foreground hover:bg-surface"
              >
                {inner}
              </Link>
            );
          })}
          <Link
            href="/projects"
            onClick={closeMenu}
            className="px-5 py-3.5 flex items-center justify-between text-foreground hover:bg-surface"
          >
            <span className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FF4B4B]" />
              <span>Projects Archive</span>
            </span>
            <span className="text-muted-foreground">[{projects.length}]</span>
          </Link>
          <button
            type="button"
            onClick={() => {
              closeMenu();
              triggerCommandPalette();
            }}
            className="w-full px-5 py-3.5 flex items-center justify-between text-muted-foreground hover:text-foreground bg-surface/40"
          >
            <span>Command Palette</span>
            <span>⌘K</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
