import About from "../about/About";
import Experience from "../experience/Experience";
import Skills from "../skills/Skills";
import React from "react";
import Navbar from "../navbar/Navbar";
import Activities from "../activities/Activities";
import '../common/Common.scss';

const Home = () => {
    return <>
        <Navbar/>
        <About/>
        <Experience/>
        <Skills/>
        <Activities/>
    </>
};

export default Home;
