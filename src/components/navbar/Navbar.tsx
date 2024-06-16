import React from "react";
import "./Navbar.scss";
import { ThemeSwitch } from "@/src/components/theme/ThemeSwitch";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavbarProps {
  className: string;
}

const Navbar = (props: NavbarProps) => {
  const className = props.className ?? "";
  let pathname = usePathname();
  const isNotHomeRoute = pathname !== "/";
  const isActive = (path: string) => path === pathname;
  return (
    <nav className={`${className} navbar-container`}>
      <div className="navbar">
        <div>
          <Link href="/" className="navbar-logo">
            <p className="blue-gradient_text">NC</p>
          </Link>
        </div>
        <div className="navbar-content-container">
          {isNotHomeRoute ? (
            <Link href="/" className="navbar-content">
              Home
            </Link>
          ) : (
            <>
              <a href="/#experience" className="navbar-content mobile-hidden">
                Experience
              </a>
              <a href="/#skills" className="navbar-content mobile-hidden">
                Skills
              </a>
              <a href="/#activities" className="navbar-content mobile-hidden">
                Activities
              </a>
            </>
          )}
          <Link
            href="/generator"
            className={`navbar-content${isActive("/generator") ? " navbar-content-active" : ""}`}
          >
            Generator
          </Link>
          <Link
            href="/projects"
            className={`navbar-content${isActive("/projects") ? " navbar-content-active" : ""}`}
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
