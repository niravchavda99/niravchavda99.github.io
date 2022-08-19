import About from "../about/About";
import Experience from "../experience/Experience";
import Skills from "../skills/Skills";
import React from "react";
import Header from "../header/Header";
import {Link} from "react-router-dom";
import ThemeProps from "../common/ThemeProps";

const Home = ({theme, toggleTheme}: ThemeProps) => {
  return <>
    <Header theme={theme} toggleTheme={toggleTheme}>
      <a href={"/#about"} className={'header-content'}>About</a>
      <a href={"/#experience"} className={'header-content'}>Experience</a>
      <a href={"/#skills"} className={'header-content'}>Skills</a>
      <Link to={"/projects"} className={'header-content'}>
        Projects
      </Link>
    </Header>
    <About/>
    <Experience/>
    <Skills theme={theme}/>
  </>;
};

export default Home;