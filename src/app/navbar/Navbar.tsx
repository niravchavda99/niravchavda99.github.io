import "./Navbar.scss";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeSwitch } from "../theme/ThemeSwitch";

interface NavbarProps {
  className: string;
}

const Navbar = (props: NavbarProps) => {
  const className = props.className ?? "";
  const isNotHomeRoute = useLocation().pathname !== "/";

  return (
    <nav className={`${className} navbar-container`}>
      <div className="navbar">
        <div>
          <NavLink to="/" className="navbar-logo">
            <p className="blue-gradient_text">NC</p>
          </NavLink>
        </div>
        <div className="navbar-content-container">
          {!isNotHomeRoute && (
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
          {isNotHomeRoute && (
            <NavLink to="/" className="navbar-content">
              Home
            </NavLink>
          )}
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `navbar-content${isActive ? " navbar-content-active" : ""}`
            }
          >
            Projects
          </NavLink>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
