import React from 'react';
import './App.scss';
import ScrollToTop from 'react-scroll-to-top';
import Footer from "./footer/Footer";
import {Outlet} from "react-router-dom";
import ThemeValueProps from "./common/ThemeValueProps";

function App({theme}: ThemeValueProps) {
  return (
      <div className={`App ${theme}`}>
        <ScrollToTop className={'flex flex-col items-center justify-center'} smooth
                     color="#8b5cf6"/>
        <Outlet/>
        <Footer/>
      </div>
  );
}

export default App;
