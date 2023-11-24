import './Navbar.scss';
import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import {Theme} from "../theme/Theme";
import {ThemeDto} from "../theme/ThemeDto";

interface NavbarProps {
    currentTheme: ThemeDto;
    toggleTheme: Function;
    className: string;
}

const Navbar = (props: NavbarProps) => {
    const className = props.className ?? "";
    const isProjectsRoute = useLocation().pathname === '/projects';

    return <nav className={`${className} navbar-container`}>
        <div className="navbar">
            <div>
                <NavLink to={"/"} className='navbar-logo'>
                    <p className='blue-gradient_text'>NC</p>
                </NavLink>
            </div>
            <div className={'navbar-content-container'}>
                {!isProjectsRoute &&
                    <>
                        <a href={"/#experience"} className={"navbar-content mobile-hidden"}>Experience</a>
                        <a href={"/#skills"} className={"navbar-content mobile-hidden"}>Skills</a>
                        <a href={"/#activities"} className={"navbar-content mobile-hidden"}>Activities</a>
                    </>
                }
                {isProjectsRoute &&
                    <NavLink to={"/"} className='navbar-content'>Home</NavLink>
                }
                <NavLink
                    to={"/projects"}
                    className={({isActive}) => `navbar-content${isActive ? ' text-blue-500' : ''}`}>
                    Projects
                </NavLink>
                <Theme currentTheme={props.currentTheme} toggleTheme={props.toggleTheme}/>
            </div>
        </div>
    </nav>;
}

export default Navbar;