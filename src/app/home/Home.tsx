import About from "../about/About";
import Experience from "../experience/Experience";
import Skills from "../skills/Skills";
import React from "react";
import Header from "../header/Header";
import Activities from "../activities/Activities";
import '../common/Common.scss';

const Home = () => {
    return <>
        <Header/>
        <About/>
        <Experience/>
        <Skills/>
        <Activities/>
    </>
};

export default Home;
