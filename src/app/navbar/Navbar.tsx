import './Navbar.scss';
import React, {useState} from "react";
import {NavLink} from "react-router-dom";

interface NavbarProps {
    className: string;
}

const Navbar = (props: NavbarProps) => {
    const className = props.className ?? "";
    const [isProjectsRoute, setIsProjectsRoute] = useState<boolean>(false);

    return <nav className={`${className} header-container`}>
        <div className="flex flex-row justify-between">
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
                    className={({isActive}) => {
                        setIsProjectsRoute(isActive);
                        return `header-content${isActive ? ' text-blue-500' : ''}`;
                    }}>
                    Projects
                </NavLink>
            </div>
        </div>
    </nav>;
}

export default Navbar;