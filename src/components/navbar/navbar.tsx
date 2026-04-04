"use client";

import React, { useEffect, useState } from "react";
import { ThemeSwitch } from "@/src/components/theme/theme-switch";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

const NAV_LINKS_HOME = [
  { label: "experience", href: "/#experience", id: "experience" },
  { label: "skills", href: "/#skills", id: "skills" },
  { label: "activities", href: "/#activities", id: "activities" },
];

const NavLink = ({
  href,
  children,
  active,
  onClick,
  isAnchor = false,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
  onClick?: () => void;
  isAnchor?: boolean;
}) => {
  const base =
    "relative px-3 py-1.5 text-sm font-mono transition-colors duration-200 group";
  const activeStyle = "text-cyan-500 dark:text-cyan-400";
  const inactiveStyle =
    "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100";
  const underline = cn(
    "absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-cyan-400 to-violet-400 transition-transform duration-300",
    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 origin-left",
  );

  const content = (
    <>
      {children}
      <span className={underline} />
    </>
  );

  if (isAnchor) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={cn(base, active ? activeStyle : inactiveStyle)}
      >
        {content}
      </a>
    );
  }
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(base, active ? activeStyle : inactiveStyle)}
    >
      {content}
    </Link>
  );
};

const MobileNavLink = ({
  href,
  children,
  active,
  onClick,
  isAnchor = false,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  isAnchor?: boolean;
}) => {
  const className = cn(
    "px-3 py-2.5 text-sm font-mono rounded-lg transition-colors duration-200",
    active
      ? "text-cyan-500 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-400/10"
      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
  );
  if (isAnchor) {
    return (
      <a href={href} onClick={onClick} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) return;
    const NAVBAR_OFFSET = 100;

    const handleScroll = () => {
      let current = "";
      for (const { id } of NAV_LINKS_HOME) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= NAVBAR_OFFSET) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="w-full fixed top-0 z-50 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-[#060b14]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center shadow-lg shadow-cyan-400/20">
            <span className="font-mono text-xs font-bold text-white">NC</span>
          </div>
          <span className="font-mono text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
            Nirav Chavda
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {isHome ? (
            NAV_LINKS_HOME.map(({ label, href, id }) => (
              <NavLink
                key={id}
                href={href}
                active={activeSection === id}
                isAnchor
              >
                <span className="text-cyan-400/60 select-none">./</span>
                {label}
              </NavLink>
            ))
          ) : (
            <NavLink href="/" active={false}>
              <span className="text-cyan-400/60 select-none">~/</span>home
            </NavLink>
          )}
          <NavLink href="/projects" active={pathname === "/projects"}>
            <span className="text-cyan-400/60 select-none">./</span>projects
          </NavLink>
          <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
          <ThemeSwitch />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeSwitch />
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className="w-9 h-9 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:border-cyan-400/50 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-200"
          >
            {isMenuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200/60 dark:border-slate-800/60 bg-white/95 dark:bg-[#060b14]/95 backdrop-blur-md px-6 py-3 flex flex-col gap-1">
          {isHome ? (
            NAV_LINKS_HOME.map(({ label, href, id }) => (
              <MobileNavLink
                key={id}
                href={href}
                active={activeSection === id}
                onClick={closeMenu}
                isAnchor
              >
                <span className="text-cyan-400/60">./</span>
                {label}
              </MobileNavLink>
            ))
          ) : (
            <MobileNavLink href="/" active={false} onClick={closeMenu}>
              <span className="text-cyan-400/60">~/</span>home
            </MobileNavLink>
          )}
          <MobileNavLink
            href="/projects"
            active={pathname === "/projects"}
            onClick={closeMenu}
          >
            <span className="text-cyan-400/60">./</span>projects
          </MobileNavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
