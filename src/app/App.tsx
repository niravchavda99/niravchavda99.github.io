import {Outlet} from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import "./App.scss";
import Footer from "./footer/Footer";
import {CSSProperties} from "react";
import {BsArrowUp} from "react-icons/bs";

function App() {
  const style = {backgroundColor: "#0284C7"} as CSSProperties;

  return (
      <>
        <ScrollToTop
            className={"flex flex-col items-center justify-center"}
            smooth
            style={style}
            component={<BsArrowUp size={26} color={'white'}/>}
        />
        <div className={`App transition-all`}>
          <Outlet/>
          <Footer/>
        </div>
      </>
  );
}

export default App;
