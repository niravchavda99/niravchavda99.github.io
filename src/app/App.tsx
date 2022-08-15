import React, {useState} from 'react';
import './App.scss';
import Header from './header/Header';
import About from "./about/About";
import Experience from "./experience/Experience";
import Skills from "./skills/Skills";
import ScrollToTop from 'react-scroll-to-top';
import Footer from "./footer/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
      <div className="App">
        <ScrollToTop className={'flex flex-col items-center justify-center'} smooth
                     color="#8b5cf6"/>
        <Header darkMode={darkMode} toggleDarkMode={setDarkMode}/>
        <About darkMode={darkMode}/>
        <Experience darkMode={darkMode}/>
        <Skills darkMode={darkMode}/>
        <Footer/>
      </div>
  );
}

export default App;
