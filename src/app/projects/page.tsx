import { projects } from "./constants";
import "./projects.scss";
import { ProjectItem } from "./project-item/project-item";

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
          Over the years, I’ve embarked on a variety of projects, each one
          marking a meaningful step in my journey as a developer. These projects
          hold a special place in my portfolio, showcasing my dedication to
          building thoughtful, impactful solutions. Many are open-source,
          allowing you to explore the codebase and gain insights into my
          approach and expertise.
        </p>
      </div>
      <div className="flex flex-col justify-center my-20 gap-8 md:gap-20">
        {projects.map((project, index) => (
          <ProjectItem project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
