import About from "../about/About";
import Experience from "../experience/Experience";
import Skills from "../skills/Skills";
import React, {useEffect, useState} from "react";
import Header from "../header/Header";
import Activities from "../activities/Activities";
import '../common/Common.scss';

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 2100);
    }, []);

    return <>
        <Header/>
        <About/>
        <Experience/>
        <Skills/>
        <Activities/>
    </>
};

export default Home;
