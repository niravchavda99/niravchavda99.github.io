import DevIcon from "../common/DevIcon";
import "./Footer.scss";

const Footer = () => {
  const iconSize = 1.5;
  return (
    <div className={"footer"}>
      <div className="themed-text py-1">
        Made with ❤️ by
        <a href="https://niravchavda99.github.io" className={"name"}>
          Nirav Chavda
        </a>
      </div>
      <div className="pt-1">
        <DevIcon
          className={`devicon-react-original colored icon p-1`}
          size={iconSize}
        />
        <DevIcon
          className={`devicon-tailwindcss-plain colored icon p-1`}
          size={iconSize}
        />
      </div>
      <div className={"footer-text pb-1"}>© 2022</div>
    </div>
  );
};

export default Footer;
