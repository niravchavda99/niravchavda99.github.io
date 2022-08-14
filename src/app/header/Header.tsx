import './Header.scss';

const Header = () => {
  return <div className={"header-container"}>
    <div>
      <div className={'header-logo'}>Nirav Chavda</div>
    </div>
    <div className={'header-content-container'}>
      <div className={'header-content'}>About</div>
      <div className={'header-content'}>Experience</div>
      <div className={'header-content'}>Skills</div>
      <div className={'header-content'}>Links</div>
    </div>
  </div>;
}

export default Header;