import About from "../about/About";
import Experience from "../experience/Experience";
import Skills from "../skills/Skills";
import React, {useEffect, useState} from "react";
import Header from "../header/Header";
import {Link} from "react-router-dom";
import ThemeProps from "../common/ThemeProps";
import SplashScreen from "../common/splashscreen/SplashScreen";
import Fader from "../common/fader/Fader";

const Home = ({theme, toggleTheme}: ThemeProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2100);
  }, []);

  return loading ?
      <SplashScreen/> :
      <Fader timeout={200} transitionTime={1}>
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
      </Fader>
};

export default Home;