import React, {useState} from 'react';
import './App.scss';
import Header from './header/Header';
import ScrollToTop from 'react-scroll-to-top';
import Footer from "./footer/Footer";
import {Outlet} from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
      <div className={`App ${darkMode ? 'dark' : 'light'}`}>
        <ScrollToTop className={'flex flex-col items-center justify-center'} smooth
                     color="#8b5cf6"/>
        <Header darkMode={darkMode} toggleDarkMode={setDarkMode}/>
        <Outlet/>
        <Footer/>
      </div>
  );
}

export default App;
