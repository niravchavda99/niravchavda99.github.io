import { projects } from "./constants";
import "./Projects.scss";
import { ProjectCard } from "./projectcard/ProjectCard";

export default function ProjectsPage() {
  return (
    <section className="max-container min-h-[calc(100vh-80px)] text-left ">
      <title>Projects | Nirav Chavda</title>
      <h1 className="head-text">
        My{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Projects
        </span>
      </h1>
      <div className="description">
        <p>
          I've embarked on numerous projects throughout the years, but these are
          the ones I hold closest to my heart. Many of them are open-source, so
          if you come across something that piques your interest, feel free to
          explore the codebase and contribute your ideas for further
          enhancements. Your collaboration is highly valued!
        </p>
      </div>
      <div className="flex flex-wrap justify-center my-20 gap-16">
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
