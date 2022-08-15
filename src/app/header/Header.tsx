import './Header.scss';

const Header = () => {
  return <nav className={"header-container"}>
    <div>
      <div className={'header-logo'}>Nirav Chavda</div>
    </div>
    <div className={'header-content-container'}>
      <a href={"#about"} className={'header-content'}>About</a>
      <a href={"#experience"} className={'header-content'}>Experience</a>
      <a href={"#skills"} className={'header-content'}>Skills</a>
      <a href={"#links"} className={'header-content'}>Links</a>
    </div>
  </nav>;
}

export default Header;