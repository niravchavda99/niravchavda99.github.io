import About from "../about/About";
import Experience from "../experience/Experience";
import Skills from "../skills/Skills";
import React, {useEffect, useState} from "react";
import Header from "../header/Header";
import SplashScreen from "../common/splashscreen/SplashScreen";
import Fader from "../common/fader/Fader";
import Activities from "../activities/Activities";
import '../common/Common.scss';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2100);
  }, []);

  return loading ?
      <SplashScreen/> :
      <Fader timeout={200} transitionTime={1}>
        <Header/>
        <About/>
        <Experience/>
        <Skills/>
        <Activities/>
      </Fader>
};

export default Home;
