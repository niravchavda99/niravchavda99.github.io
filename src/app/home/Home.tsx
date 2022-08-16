import About from "../about/About";
import Experience from "../experience/Experience";
import Skills from "../skills/Skills";
import React from "react";
import DarkModeProps from "../common/DarkModeProps";

const Home = ({darkMode}: DarkModeProps) => {
  return <>
    <About/>
    <Experience/>
    <Skills darkMode={darkMode}/>
  </>;
};

export default Home;