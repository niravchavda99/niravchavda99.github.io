import "./Footer.scss";
import tailwind from "../../assets/icons/tech/tailwind.png";
import react from "../../assets/icons/tech/react.svg";
import Image from "next/image";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="py-1 flex flex-row justify-center items-center">
        <div>Made with ❤️ by</div>
        <a href="https://niravchavda99.github.io" className="name">
          Nirav Chavda
        </a>
        <div className="footer-text ml-2">© {year}</div>
      </div>
      <div className="py-1 flex flex-row justify-center items-center">
        <Image
          width={24}
          height={24}
          src={react.src}
          alt="React"
          className="object-contain"
        />
        <Image
          src={tailwind.src}
          alt="React"
          className="object-contain ml-2"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};

export default Footer;
