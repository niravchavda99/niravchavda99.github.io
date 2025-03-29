import { projects } from "./constants";
import { ProjectItem } from "./project-item/project-item";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";

export default function ProjectsPage() {
  return (
    <SectionContainer id="projects" className="text-left">
      <title>Projects | Nirav Chavda</title>
      <HeadingText
        precedingText="My"
        coloredText="Projects"
        className="justify-start"
      />
      <div className="mt-5 flex flex-col gap-3 text-slate-700 dark:text-slate-200">
        <p>
          Over the years, I’ve embarked on a variety of projects, each one
          marking a meaningful step in my journey as a developer. These projects
          hold a special place in my portfolio, showcasing my dedication to
          building thoughtful, impactful solutions. Many are open-source,
          allowing you to explore the codebase and gain insights into my
          approach and expertise.
        </p>
      </div>
      <div className="flex flex-col justify-center my-20 gap-8 md:gap-20">
        {projects.map((project) => (
          <ProjectItem key={project.name} project={project} position="right" />
        ))}
      </div>
    </SectionContainer>
  );
}
