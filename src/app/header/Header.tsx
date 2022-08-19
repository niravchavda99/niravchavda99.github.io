import './Header.scss';
import DarkModeToggle from "../darkmodetoggle/DarkModeToggle";
import {ReactNode} from "react";
import {Link} from "react-router-dom";
import DarkModeProps from "../common/DarkModeProps";

type HeaderProps = DarkModeProps & { children?: ReactNode };

const Header = ({darkMode, toggleDarkMode, children}: HeaderProps) => {
  return <div>
    <nav className={`header-container`}>
      <div>
        <Link to={"/"} className={'header-logo'}>Nirav Chavda</Link>
      </div>
      <div className={'header-content-container'}>
        {children}
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      </div>
    </nav>
  </div>;
}

export default Header;