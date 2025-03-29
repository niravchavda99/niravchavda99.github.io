import React from "react";
import { ThemeSwitch } from "@/src/components/theme/theme-switch";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/src/lib/utils";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  let pathname = usePathname();
  const isNotHomeRoute = pathname !== "/";
  const isActive = (path: string) => path === pathname;
  return (
    <nav className={cn("w-full fixed top-0 z-30", className)}>
      <div
        className={cn(
          "p-1 flex flex-row justify-between select-none items-center",
          "text-slate-300 bg-[#EFF2F6] dark:bg-tertiary-dark",
        )}
      >
        <div>
          <Link
            href="/"
            className={cn(
              "cursor-pointer p-2 text-xl w-10 h-10 rounded-lg ml-2",
              "bg-white dark:bg-tertiary",
              "items-center justify-center flex font-bold shadow-md",
            )}
          >
            <p className="blue-gradient-text">NC</p>
          </Link>
        </div>
        <div className="flex flex-row items-center">
          {isNotHomeRoute ? (
            <Link
              href="/"
              className="text-slate-800 dark:text-slate-200 mx-1 p-2 cursor-pointer border-2 border-transparent text-lg rounded-lg hover:bg-slate-200 dark:hover:bg-slate-50/15 font-medium"
            >
              Home
            </Link>
          ) : (
            <>
              <a
                href="/#experience"
                className="text-slate-800 dark:text-slate-200 mx-1 p-2 cursor-pointer border-2 border-transparent text-lg rounded-lg hover:bg-slate-200 dark:hover:bg-slate-50/15 mobile-hidden font-medium"
              >
                Experience
              </a>
              <a
                href="/#skills"
                className="text-slate-800 dark:text-slate-200 mx-1 p-2 cursor-pointer border-2 border-transparent text-lg rounded-lg hover:bg-slate-200 dark:hover:bg-slate-50/15 mobile-hidden font-medium"
              >
                Skills
              </a>
              <a
                href="/#activities"
                className="text-slate-800 dark:text-slate-200 mx-1 p-2 cursor-pointer border-2 border-transparent text-lg rounded-lg hover:bg-slate-200 dark:hover:bg-slate-50/15 mobile-hidden font-medium"
              >
                Activities
              </a>
            </>
          )}
          <Link
            href="/projects"
            className={cn(
              "text-slate-800 dark:text-slate-200 mx-1 p-2 cursor-pointer border-2 border-transparent text-lg rounded-lg hover:bg-slate-200 dark:hover:bg-slate-50/15 font-medium",
              isActive("/projects") && "text-blue-500 dark:text-blue-500",
            )}
          >
            Projects
          </Link>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
