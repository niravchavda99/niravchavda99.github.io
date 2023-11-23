import './Navbar.scss';
import React from "react";
import {NavLink, useLocation} from "react-router-dom";

interface NavbarProps {
    className: string;
}

const Navbar = (props: NavbarProps) => {
    const className = props.className ?? "";
    const isProjectsRoute = useLocation().pathname === '/projects';

    return <nav className={`${className} header-container`}>
        <div className="header">
            <div>
                <NavLink to={"/"} className='header-logo'>
                    <p className='blue-gradient_text'>NC</p>
                </NavLink>
            </div>
            <div className={'header-content-container'}>
                {!isProjectsRoute &&
                    <>
                        <a href={"/#experience"} className={"header-content mobile-hidden"}>Experience</a>
                        <a href={"/#skills"} className={"header-content mobile-hidden"}>Skills</a>
                        <a href={"/#activities"} className={"header-content mobile-hidden"}>Activities</a>
                    </>
                }
                {isProjectsRoute &&
                    <NavLink to={"/"} className='header-content'>Home</NavLink>
                }
                <NavLink
                    to={"/projects"}
                    className={({isActive}) => `header-content${isActive ? ' text-blue-500' : ''}`}>
                    Projects
                </NavLink>
            </div>
        </div>
    </nav>;
}

export default Navbar;