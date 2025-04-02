import ScrollToTop from "react-scroll-to-top";
import { ChevronUpIcon } from "lucide-react";
import Navbar from "@/src/components/navbar/navbar";
import { cn } from "@/src/lib/utils";
import Footer from "@/src/components/footer/footer";
import { ReactNode, useMemo } from "react";
import { ThemeMode, useTheme } from "../components/theme/theme-context";

interface HomeProps {
  children: ReactNode;
}

export function Home({ children }: HomeProps) {
  const { mode: theme } = useTheme();
  const scrollToTopComponent = useMemo(() => {
    return (
      <ScrollToTop
        smooth
        style={{
          border:
            theme === ThemeMode.Dark
              ? "1px solid #2b7fff"
              : "1px solid #51a2ff",
          borderRadius: "100%",
          backgroundColor: theme === ThemeMode.Dark ? "#1c398e" : "#dbeafe",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bottom: "24px",
          right: "24px",
        }}
        component={<ChevronUpIcon size={20} color={"#51a2ff"} />}
      />
    );
  }, [theme]);
  return (
    <>
      {scrollToTopComponent}
      <Navbar />
      <div
        className={cn(
          "bg-slate-300/30 dark:bg-tertiary-dark",
          "text-center flex flex-col justify-between",
          "backdrop-blur-sm h-max min-h-screen",
        )}
      >
        {children}
        <Footer />
      </div>
    </>
  );
}
