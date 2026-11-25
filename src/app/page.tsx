import React from "react";
import About from "@/src/components/about/about";
import Experience from "@/src/components/experience/experience";
import SelectedWork from "@/src/components/projects-preview/selected-work";
import Skills from "@/src/components/skills/skills";
import Activities from "@/src/components/activities/activities";

export default function HomePage() {
  return (
    <>
      <About />
      <Experience />
      <SelectedWork />
      <Skills />
      <Activities />
    </>
  );
}
