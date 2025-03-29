import nextjsDark from "@/src/assets/icons/tech/nextjs-dark.svg";
import nextjsLight from "@/src/assets/icons/tech/nextjs-light.svg";
import tailwind from "@/src/assets/icons/tech/tailwind.png";
import Image from "next/image";
import { ThemeMode, useTheme } from "@/src/components/theme/theme-context";

const Footer = () => {
  const { mode } = useTheme();
  const year = new Date().getFullYear();

  return (
    <div className="text-center inline-block p-2 w-full text-slate-700 dark:text-slate-200">
      <div className="py-1 flex flex-row justify-center items-center">
        <div>Made with ❤️ by</div>
        <a
          href="https://niravchavda99.github.io"
          className="font-semibold ml-1 underline underline-offset-2"
        >
          Nirav Chavda
        </a>
        <div className="ml-2 text-slate-700 dark:text-slate-200">© {year}</div>
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
