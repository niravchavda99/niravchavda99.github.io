import React from 'react';
import './App.scss';
import Header from './header/Header';
import About from "./about/About";
import Experience from "./experience/Experience";
import Skills from "./skills/Skills";
import ScrollToTop from 'react-scroll-to-top';

function App() {
  return (
      <div className="App">
        <ScrollToTop className={'flex flex-col items-center justify-center'} smooth color="#8b5cf6" />
        <Header/>
        <About/>
        <Experience/>
        <Skills/>
      </div>
  );
}

export default App;
