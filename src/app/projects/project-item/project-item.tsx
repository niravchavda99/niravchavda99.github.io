import { FaArrowRight, FaGithub } from "react-icons/fa6";
import { Project, ProjectTag } from "@/src/app/projects/constants";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/src/lib/utils";

interface ProjectCardProps {
  project: Project;
  position: "left" | "right";
}

export const ProjectItem = ({ project, position }: ProjectCardProps) => {
  return (
    <div
      className={cn(
        "flex gap-2 md:gap-16 w-full md:items-center",
        position === "left"
          ? "flex-col md:flex-row"
          : "flex-col md:flex-row-reverse",
      )}
    >
      <div className="relative h-[230px] w-full md:w-[320px]">
        <Image
          fill={true}
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover rounded-2xl shadow-xl dark:shadow-slate-50/15"
        />

        {project.codeLink && (
          <div className="absolute inset-0 flex justify-end m-3">
            <a
              href={project.codeLink}
              target="_blank"
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <FaGithub className="w-2/3 h-2/3 object-contain text-white" />
            </a>
          </div>
        )}
      </div>
      <div className="md:flex-1">
        <div className="text-left">
          <h3 className="text-slate-700 dark:text-white font-bold text-[24px]">{project.name}</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-[14px]">
            {project.description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag: ProjectTag) => (
            <span key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </span>
          ))}
        </div>

        {project.link && (
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
        )}
      </div>
    </div>
  );
};
