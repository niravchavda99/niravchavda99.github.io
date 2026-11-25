"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  Code2,
  Compass,
  Copy,
  FolderGit2,
  GraduationCap,
  Home,
  Layers,
  Mail,
  Moon,
  Search,
  Sparkles,
  Sun,
} from "lucide-react";
import { animate, createSpring } from "animejs";
import { projects } from "@/src/data/projects";
import { ThemeMode, useTheme } from "@/src/components/theme/theme-context";
import { getSocialMediaLink } from "@/src/app/links";
import { SocialMediaPlatform } from "@/src/components/common/social-media-platform";
import { cn } from "@/src/lib/utils";

export const OPEN_COMMAND_PALETTE_EVENT = "nc:open-command-palette";

export function triggerCommandPalette() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_COMMAND_PALETTE_EVENT));
  }
}

interface CommandItem {
  id: string;
  group: "Navigate" | "Projects" | "Connect & System";
  label: string;
  hint?: string;
  keywords: string;
  icon: React.ReactNode;
  external?: boolean;
  onSelect: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { mode, toggle } = useTheme();

  const rawMailHref = getSocialMediaLink(SocialMediaPlatform.Mail);
  const emailAddress = rawMailHref.replace(/^mailto:/i, "");

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        closePalette();
      }
    };

    const onCustomOpen = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, onCustomOpen);
    };
  }, [open, closePalette]);

  useEffect(() => {
    if (open) {
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      if (backdropRef.current) {
        animate(backdropRef.current, {
          opacity: [0, 1],
          duration: 180,
          ease: "outQuad",
        });
      }
      if (modalRef.current) {
        animate(modalRef.current, {
          opacity: [0, 1],
          scale: [0.95, 1],
          y: [-10, 0],
          ease: createSpring({ stiffness: 340, damping: 24 }),
        });
      }
    }
  }, [open]);

  const navigateTo = useCallback(
    (href: string) => {
      closePalette();
      router.push(href);
    },
    [closePalette, router],
  );

  const openExternal = useCallback(
    (url: string) => {
      closePalette();
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [closePalette],
  );

  const items = useMemo<CommandItem[]>(() => {
    const navItems: CommandItem[] = [
      {
        id: "nav-home",
        group: "Navigate",
        label: "Overview & Profile",
        hint: "Home",
        keywords: "home about bio profile nirav",
        icon: <Home size={14} />,
        onSelect: () => navigateTo("/#about"),
      },
      {
        id: "nav-selected-work",
        group: "Navigate",
        label: "Selected Work",
        hint: "Section 01",
        keywords: "featured work showcase portfolio",
        icon: <Sparkles size={14} />,
        onSelect: () => navigateTo("/#work"),
      },
      {
        id: "nav-projects",
        group: "Navigate",
        label: "All Projects Archive",
        hint: `${projects.length} builds`,
        keywords: "projects archive apps extensions",
        icon: <FolderGit2 size={14} />,
        onSelect: () => navigateTo("/projects"),
      },
      {
        id: "nav-experience",
        group: "Navigate",
        label: "Experience & Education",
        hint: "Section 02",
        keywords: "work career jobs incubyte education university mca bca",
        icon: <Briefcase size={14} />,
        onSelect: () => navigateTo("/#experience"),
      },
      {
        id: "nav-skills",
        group: "Navigate",
        label: "Technical Stack",
        hint: "Section 03",
        keywords: "skills tech stack languages frameworks backend frontend",
        icon: <Layers size={14} />,
        onSelect: () => navigateTo("/#skills"),
      },
      {
        id: "nav-activities",
        group: "Navigate",
        label: "Activities & Labs",
        hint: "Section 04",
        keywords: "activities bootathon iit bombay virtual labs chandrayaan",
        icon: <GraduationCap size={14} />,
        onSelect: () => navigateTo("/#activities"),
      },
    ];

    const projectItems: CommandItem[] = projects.map((project) => ({
      id: `proj-${project.name}`,
      group: "Projects",
      label: project.name,
      hint: project.tags.slice(0, 2).join(" · "),
      keywords: `${project.name} ${project.description} ${project.tags.join(" ")}`,
      icon: <Code2 size={14} />,
      external: Boolean(project.link || project.codeLink),
      onSelect: () => {
        const target = project.link ?? project.codeLink;
        if (target) {
          openExternal(target);
        } else {
          navigateTo("/projects");
        }
      },
    }));

    const actionItems: CommandItem[] = [
      {
        id: "act-theme",
        group: "Connect & System",
        label:
          mode === ThemeMode.Dark
            ? "Switch to Light Theme"
            : "Switch to Dark Theme",
        hint: `Current: ${mode}`,
        keywords: "theme dark light mode appearance color",
        icon: mode === ThemeMode.Dark ? <Sun size={14} /> : <Moon size={14} />,
        onSelect: () => {
          toggle();
          closePalette();
        },
      },
      {
        id: "act-copy-email",
        group: "Connect & System",
        label: copiedEmail
          ? "Email Copied to Clipboard!"
          : "Copy Email Address",
        hint: emailAddress,
        keywords: `email copy contact mail ${emailAddress}`,
        icon: copiedEmail ? (
          <Check size={14} className="text-emerald-500" />
        ) : (
          <Copy size={14} />
        ),
        onSelect: () => {
          navigator.clipboard?.writeText(emailAddress);
          setCopiedEmail(true);
          setTimeout(() => {
            setCopiedEmail(false);
            closePalette();
          }, 650);
        },
      },
      {
        id: "act-send-email",
        group: "Connect & System",
        label: "Compose Email",
        hint: emailAddress,
        keywords: "mailto send email message hire",
        icon: <Mail size={14} />,
        external: true,
        onSelect: () => {
          closePalette();
          window.location.href = rawMailHref;
        },
      },
      {
        id: "act-github",
        group: "Connect & System",
        label: "GitHub Profile",
        hint: "@niravchavda99",
        keywords: "github source code repositories",
        icon: <Compass size={14} />,
        external: true,
        onSelect: () =>
          openExternal(getSocialMediaLink(SocialMediaPlatform.Github)),
      },
      {
        id: "act-linkedin",
        group: "Connect & System",
        label: "LinkedIn Profile",
        hint: "in/niravchavda99",
        keywords: "linkedin network social",
        icon: <Compass size={14} />,
        external: true,
        onSelect: () =>
          openExternal(getSocialMediaLink(SocialMediaPlatform.Linkedin)),
      },
      {
        id: "act-x",
        group: "Connect & System",
        label: "X (Twitter)",
        hint: "@niravchavda99",
        keywords: "twitter x social",
        icon: <Compass size={14} />,
        external: true,
        onSelect: () => openExternal(getSocialMediaLink(SocialMediaPlatform.X)),
      },
    ];

    return [...navItems, ...projectItems, ...actionItems];
  }, [
    mode,
    copiedEmail,
    emailAddress,
    rawMailHref,
    navigateTo,
    openExternal,
    toggle,
    closePalette,
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q) ||
        (item.hint && item.hint.toLowerCase().includes(q)),
    );
  }, [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (!filtered.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[activeIndex]?.onSelect();
    }
  };

  const groups = useMemo(() => {
    const order: CommandItem["group"][] = [
      "Navigate",
      "Projects",
      "Connect & System",
    ];
    return order
      .map((group) => ({
        group,
        entries: filtered.filter((i) => i.group === group),
      }))
      .filter((g) => g.entries.length > 0);
  }, [filtered]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Command menu"
    >
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/55 backdrop-blur-sm"
        onClick={closePalette}
      />

      <div
        ref={modalRef}
        onKeyDown={handleListKeyDown}
        className="relative z-10 w-full max-w-xl rounded-3xl border border-border bg-card text-card-foreground shadow-2xl overflow-hidden will-change-transform"
      >
        {/* Search input bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
          <Search size={16} className="text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to section, open a project, or run an action..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="button"
            onClick={closePalette}
            aria-label="Close command menu"
            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-muted/60 font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[360px] overflow-y-auto p-2">
          {groups.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-mono text-xs text-muted-foreground">
                No matching commands or projects for &ldquo;{query}&rdquo;
              </p>
            </div>
          ) : (
            groups.map(({ group, entries }) => (
              <div key={group} className="mb-2 last:mb-0">
                <div className="px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {group}
                </div>
                <div className="space-y-0.5">
                  {entries.map((entry) => {
                    const globalIndex = filtered.indexOf(entry);
                    const isActive = globalIndex === activeIndex;
                    return (
                      <button
                        key={entry.id}
                        type="button"
                        onMouseEnter={() => setActiveIndex(globalIndex)}
                        onClick={entry.onSelect}
                        className={cn(
                          "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-muted",
                        )}
                      >
                        <span className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={cn(
                              "shrink-0",
                              isActive
                                ? "text-primary-foreground"
                                : "text-muted-foreground",
                            )}
                          >
                            {entry.icon}
                          </span>
                          <span className="truncate font-medium">
                            {entry.label}
                          </span>
                        </span>

                        <span className="flex items-center gap-1.5 shrink-0">
                          {entry.hint && (
                            <span
                              className={cn(
                                "font-mono text-[11px]",
                                isActive
                                  ? "text-primary-foreground/80"
                                  : "text-muted-foreground",
                              )}
                            >
                              {entry.hint}
                            </span>
                          )}
                          {entry.external && (
                            <ArrowUpRight
                              size={13}
                              className={cn(
                                isActive
                                  ? "text-primary-foreground/80"
                                  : "text-muted-foreground",
                              )}
                            />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/40 font-mono text-[10px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>Nirav Chavda · Quick Index</span>
        </div>
      </div>
    </div>
  );
}
