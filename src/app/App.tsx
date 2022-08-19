import React from 'react';
import './App.scss';
import ScrollToTop from 'react-scroll-to-top';
import Footer from "./footer/Footer";
import {Outlet} from "react-router-dom";
import DarkModeValueProps from "./common/DarkModeValueProps";

function App({darkMode}: DarkModeValueProps) {
  return (
      <div className={`App ${darkMode ? 'dark' : 'light'}`}>
        <ScrollToTop className={'flex flex-col items-center justify-center'} smooth
                     color="#8b5cf6"/>
        <Outlet/>
        <Footer/>
      </div>
  );
}

export default App;
