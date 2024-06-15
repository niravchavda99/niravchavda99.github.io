import { FaArrowRight, FaGithub } from "react-icons/fa6";
import { Project, ProjectTag } from "../constants";
import { TiltCard } from "../../common/tilt-card/TiltCard";
import "./ProjectCard.scss";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <TiltCard key={project.name} delayOffset={index}>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <div className="relative w-full h-[230px]">
            <img
              src={project.image}
              alt={project.name}
              className="project-snap"
            />

            {project.codeLink && (
              <div className="project-code-link-container">
                <div
                  className="black-gradient project-code-link"
                  onClick={() => window.open(project.codeLink, "_blank")}
                >
                  <FaGithub className="project-code-link-icon" />
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 text-left">
            <h3 className="project-name text-[24px]">{project.name}</h3>
            <p className="project-description text-[14px]">
              {project.description}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag: ProjectTag) => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-5 text-blue-600">
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-semibold"
          >
            Live Link
            <FaArrowRight className="w-4 h-4 object-contain" />
          </Link>
        </div>
      </div>
    </TiltCard>
  );
};
