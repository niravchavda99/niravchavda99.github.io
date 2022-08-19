import './Header.scss';
import DarkModeToggle from "../darkmodetoggle/DarkModeToggle";
import {ReactNode} from "react";
import {Link} from "react-router-dom";
import ThemeProps from "../common/ThemeProps";

type HeaderProps = ThemeProps & { children?: ReactNode };

const Header = ({theme, toggleTheme, children}: HeaderProps) => {
  return <div>
    <nav className={`header-container`}>
      <div>
        <Link to={"/"} className={'header-logo'}>Nirav Chavda</Link>
      </div>
      <div className={'header-content-container'}>
        {children}
        <DarkModeToggle theme={theme} toggleTheme={toggleTheme}/>
      </div>
    </nav>
  </div>;
}

export default Header;