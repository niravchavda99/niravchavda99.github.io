import { Outlet } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import "./App.scss";
import ThemeValueProps from "./common/ThemeValueProps";
import Footer from "./footer/Footer";

function App({ theme }: ThemeValueProps) {
  const backToTopColor = theme === "dark" ? "black" : "#8b5cf6";

  return (
    <div className={`App ${theme}`}>
      <ScrollToTop
        className={"flex flex-col items-center justify-center"}
        smooth
        color={backToTopColor}
      />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
