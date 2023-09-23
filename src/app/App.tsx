import {Outlet} from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import "./App.scss";
import Footer from "./footer/Footer";

function App() {
  const backToTopColor = "black";

  return (
      <>
        <ScrollToTop
            className={"flex flex-col items-center justify-center"}
            smooth
            color={backToTopColor}
        />
        <div className={`App transition-all`}>
          <Outlet/>
          <Footer/>
        </div>
      </>
  );
}

export default App;
