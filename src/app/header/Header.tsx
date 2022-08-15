import './Header.scss';
import DarkModeToggle from "../darkmodetoggle/DarkModeToggle";

type HeaderProps = {
  darkMode: boolean,
  toggleDarkMode: Function
};

const Header = ({darkMode, toggleDarkMode}: HeaderProps) => {
  return <div>
    <nav className={`header-container`}>
      <div>
        <div className={'header-logo'}>Nirav Chavda</div>
      </div>
      <div className={'header-content-container'}>
        <a href={"#about"} className={'header-content'}>About</a>
        <a href={"#experience"} className={'header-content'}>Experience</a>
        <a href={"#skills"} className={'header-content'}>Skills</a>
        <a href={"#links"} className={'header-content'}>Links</a>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      </div>
    </nav>
  </div>;
}

export default Header;