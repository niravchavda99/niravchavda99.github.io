import About from "../about/About";
import Experience from "../experience/Experience";
import Skills from "../skills/Skills";
import React, {useEffect, useState} from "react";
import Header from "../header/Header";
import ThemeProps from "../common/ThemeProps";
import SplashScreen from "../common/splashscreen/SplashScreen";
import Fader from "../common/fader/Fader";
import Activities from "../activities/Activities";
import '../common/Common.scss';
import {Link} from "react-router-dom";
import StickyHeader from "../sticky-header/StickyHeader";

const Home = ({theme, toggleTheme}: ThemeProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 2100);
    }, []);

    return loading ?
        <SplashScreen/> :
        <Fader timeout={200} transitionTime={1}>
            <Header theme={theme} toggleTheme={toggleTheme}>
                <Link to={"/projects"} className={'header-content'}>Projects</Link>
            </Header>
            <StickyHeader/>
            <About/>
            <Experience/>
            <Skills theme={theme}/>
            <Activities theme={theme}/>
        </Fader>
};

export default Home;
