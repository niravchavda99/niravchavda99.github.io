import React from 'react';
import './App.scss';
import Header from './header/Header';
import About from "./about/About";
import Experience from "./experience/Experience";
import Skills from "./skills/Skills";

function App() {
  return (
      <div className="App">
        <Header/>
        <About/>
        <Experience/>
        <Skills/>
      </div>
  );
}

export default App;
