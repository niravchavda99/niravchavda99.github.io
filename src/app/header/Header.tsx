import './Header.scss';
import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
  return <nav className={`header-container`}>
    <div>
      <Link to={"/"} className={'header-logo'}>Nirav Chavda</Link>
    </div>
    <div className={'header-content-container'}>
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
    </div>
  </nav>;
}

export default Header;