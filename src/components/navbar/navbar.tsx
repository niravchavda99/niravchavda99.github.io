"use client";

import React, { useEffect, useRef, useState } from "react";
import { ThemeSwitch } from "@/src/components/theme/theme-switch";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { animate, createSpring } from "animejs";
import { cn } from "@/src/lib/utils";

const HOME_SECTIONS = [
  { label: "Work", href: "/#work", id: "work" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Activities", href: "/#activities", id: "activities" },
];

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjects = pathname === "/projects" || pathname === "/projects/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navRef = useRef<HTMLElement>(null);
  const pillBarRef = useRef<HTMLDivElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pillBarRef.current) {
      animate(pillBarRef.current, {
        y: [-20, 0],
        opacity: [0, 1],
        ease: createSpring({ stiffness: 220, damping: 22 }),
      });
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen && mobileDrawerRef.current) {
      animate(mobileDrawerRef.current, {
        opacity: [0, 1],
        scale: [0.96, 1],
        y: [-6, 0],
        duration: 220,
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
      if (!isHome || window.scrollY < 200) {
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
      className="fixed top-0 inset-x-0 z-50 px-4 pt-4 sm:pt-5 pointer-events-none flex flex-col items-center"
    >
      <div
        ref={pillBarRef}
        className="pointer-events-auto flex items-center gap-1 sm:gap-2 p-1.5 rounded-full border border-border/80 bg-card/85 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/30"
      >
        {/* Minimal Brand Pill */}
        <Link
          href="/"
          className="flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full hover:bg-surface transition-colors"
        >
          <span className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center font-mono text-[11px] font-bold">
            NC
          </span>
          <span className="text-sm font-medium text-foreground hidden sm:inline">
            Nirav
          </span>
        </Link>

        {/* Clean Pill Links (Desktop) */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-0.5"
        >
          {HOME_SECTIONS.map(({ label, href, id }) => {
            const active = isHome && activeSection === id;
            const cls = cn(
              "px-3.5 py-1.5 rounded-full text-sm transition-all duration-200",
              active
                ? "bg-foreground text-background font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-surface/70",
            );
            return isHome ? (
              <a key={id} href={href} className={cls}>
                {label}
              </a>
            ) : (
              <Link key={id} href={href} className={cls}>
                {label}
              </Link>
            );
          })}

          <Link
            href="/projects"
            className={cn(
              "px-3.5 py-1.5 rounded-full text-sm transition-all duration-200",
              isProjects
                ? "bg-foreground text-background font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-surface/70",
            )}
          >
            Projects
          </Link>
        </nav>

        <div className="w-px h-4 bg-border hidden md:block mx-0.5" />

        <div className="flex items-center gap-1">
          <ThemeSwitch />

          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="md:hidden h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Soft Rounded Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={mobileDrawerRef}
          className="pointer-events-auto md:hidden mt-2 w-full max-w-xs rounded-3xl border border-border bg-card/95 backdrop-blur-xl p-3 shadow-2xl flex flex-col gap-1"
        >
          {!isHome && (
            <Link
              href="/"
              onClick={closeMenu}
              className="px-4 py-2.5 rounded-2xl text-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
            >
              Home
            </Link>
          )}
          {HOME_SECTIONS.map(({ label, href, id }) => {
            const active = isHome && activeSection === id;
            const cls = cn(
              "px-4 py-2.5 rounded-2xl text-sm transition-colors",
              active
                ? "bg-foreground text-background font-medium"
                : "text-foreground/85 hover:bg-surface",
            );
            return isHome ? (
              <a key={id} href={href} onClick={closeMenu} className={cls}>
                {label}
              </a>
            ) : (
              <Link key={id} href={href} onClick={closeMenu} className={cls}>
                {label}
              </Link>
            );
          })}
          <Link
            href="/projects"
            onClick={closeMenu}
            className={cn(
              "px-4 py-2.5 rounded-2xl text-sm transition-colors",
              isProjects
                ? "bg-foreground text-background font-medium"
                : "text-foreground/85 hover:bg-surface",
            )}
          >
            All Projects
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
