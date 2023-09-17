import './Header.scss';
import DarkModeToggle from "../darkmodetoggle/DarkModeToggle";
import React, {ReactNode} from "react";
import {Link} from "react-router-dom";
import ThemeProps from "../common/ThemeProps";

type HeaderProps = ThemeProps & { children?: ReactNode };

const Header = ({theme, toggleTheme, children}: HeaderProps) => {
  return <nav className={`header-container`}>
    <div>
      <Link to={"/"} className={'header-logo'}>Nirav Chavda</Link>
    </div>
    <div className={'header-content-container'}>
      <a href={"/#about"} className={"header-content mobile-hidden"}>
        About
      </a>
      <a href={"/#experience"} className={"header-content mobile-hidden"}>
        Experience
      </a>
      <a href={"/#skills"} className={"header-content mobile-hidden"}>
        Skills
      </a>
      <a href={"/#activities"} className={"header-content mobile-hidden"}>
        Activities
      </a>
      <Link to={"/projects"} className={'header-content'}>Projects</Link>
      <DarkModeToggle theme={theme} toggleTheme={toggleTheme}/>
    </div>
  </nav>;
}

export default Header;