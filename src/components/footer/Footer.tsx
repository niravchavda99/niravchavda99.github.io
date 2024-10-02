import "./Footer.scss";
import nextjsDark from "@/src/assets/icons/tech/nextjs-dark.svg";
import nextjsLight from "@/src/assets/icons/tech/nextjs-light.svg";
import tailwind from "@/src/assets/icons/tech/tailwind.png";
import Image from "next/image";
import { useContext } from "react";
import { ThemeContext, ThemeMode } from "@/src/components/theme/ThemeContext";

const Footer = () => {
  const { mode } = useContext(ThemeContext);
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
          src={mode === ThemeMode.Dark ? nextjsLight.src : nextjsDark.src}
          alt="Next.js"
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
