import React from "react";
import About from "@/src/components/about/about";
import SelectedWork from "@/src/components/projects-preview/selected-work";
import Experience from "@/src/components/experience/experience";
import Skills from "@/src/components/skills/skills";
import Activities from "@/src/components/activities/activities";

export default function HomePage() {
  return (
    <>
      <About />
      <SelectedWork />
      <Experience />
      <Skills />
      <Activities />
    </>
  );
}
