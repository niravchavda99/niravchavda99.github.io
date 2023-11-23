import './Header.scss';
import React from "react";
import {Link, NavLink} from "react-router-dom";

const Header = () => {
    return <nav className={`header-container`}>
        <div>
            <Link to={"/"} className={'header-logo'}>
                <p className='blue-gradient_text'>NC</p>
            </Link>
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
            <NavLink
                to={"/projects"}
                className={({isActive}) => `header-content${isActive ? ' text-blue-500' : ''}`}>
                Projects
            </NavLink>
        </div>
    </nav>;
}

export default Header;