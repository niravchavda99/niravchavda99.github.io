import About from "../about/About";
import Experience from "../experience/Experience";
import Skills from "../skills/Skills";
import React from "react";
import Activities from "../activities/Activities";
import '../common/Common.scss';

const Home = () => {
    return <>
        <About/>
        <Experience/>
        <Skills/>
        <Activities/>
    </>
};

export default Home;
