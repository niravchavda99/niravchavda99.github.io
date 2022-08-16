import './Header.scss';
import DarkModeToggle from "../darkmodetoggle/DarkModeToggle";
import {Link} from "react-router-dom";

type HeaderProps = {
  darkMode: boolean,
  toggleDarkMode: Function
};

const Header = ({darkMode, toggleDarkMode}: HeaderProps) => {
  return <div>
    <nav className={`header-container`}>
      <div>
        <a href={"/home"} className={'header-logo'}>Nirav Chavda</a>
      </div>
      <div className={'header-content-container'}>
        <a href={"/#about"} className={'header-content'}>About</a>
        <a href={"/#experience"} className={'header-content'}>Experience</a>
        <a href={"/#skills"} className={'header-content'}>Skills</a>
        <Link to={"/projects"} className={'header-content'}>
          Projects
        </Link>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      </div>
    </nav>
  </div>;
}

export default Header;