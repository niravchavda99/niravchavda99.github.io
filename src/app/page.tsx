import React from "react";
import About from "@/src/components/about/About";
import Experience from "@/src/components/experience/Experience";
import Skills from "@/src/components/skills/Skills";
import Activities from "@/src/components/activities/Activities";

export default function HomePage() {
  return (
    <>
      <title>Nirav Chavda</title>
      <About />
      <Experience />
      <Skills />
      <Activities />
    </>
  );
}
