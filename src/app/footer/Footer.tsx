import './Footer.scss';

const Footer = () => {
  return (
      <div className={'footer'}>
        <span className={'theme-color'}>©</span>
        <span className={'theme-color font-semibold'}> 2022</span>
        <a href="https://niravchavda99.github.io" className={'name'}>
          Nirav Chavda
        </a>
      </div>
  );
};

export default Footer;