import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { Project } from "@/src/data/projects";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
}

const ActionLinks = ({ project }: { project: Project }) => (
  <div className="absolute top-3 right-3 z-10 flex gap-2 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100 transition-all duration-300">
    {project.codeLink && (
      <a
        href={project.codeLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View source code"
        className="w-8 h-8 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 flex items-center justify-center hover:border-cyan-400/60 hover:bg-slate-800 transition-all duration-200"
      >
        <FaGithub className="text-slate-300 w-3.5 h-3.5" />
      </a>
    )}
    {project.link && (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open live link"
        className="w-8 h-8 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 flex items-center justify-center hover:border-cyan-400/60 hover:bg-slate-800 transition-all duration-200"
      >
        <FaArrowUpRightFromSquare className="text-slate-300 w-3 h-3" />
      </a>
    )}
  </div>
);

const TagList = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-1.5">
    {tags.map((tag) => (
      <span
        key={tag}
        className="px-2 py-0.5 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60"
      >
        #{tag}
      </span>
    ))}
  </div>
);

const FooterLinks = ({ project }: { project: Project }) => {
  if (!project.link && !project.codeLink) return null;
  return (
    <div className="flex items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors duration-200"
        >
          Live Link <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
        </a>
      )}
      {project.codeLink && (
        <a
          href={project.codeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors duration-200"
        >
          <FaGithub className="w-3 h-3" /> Source
        </a>
      )}
    </div>
  );
};

const ProjectMedia = ({
  project,
  heightClass,
  titleClass,
  bottomClass,
}: {
  project: Project;
  heightClass: string;
  titleClass: string;
  bottomClass: string;
}) => {
  const imageContent = (
    <>
      <Image
        fill
        src={project.image}
        alt={project.name}
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
      <div className={`absolute ${bottomClass}`}>
        <h3 className={`font-bold text-white drop-shadow-lg ${titleClass}`}>
          {project.name}
        </h3>
      </div>
    </>
  );

  return (
    <div className={`relative ${heightClass} overflow-hidden`}>
      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.name}`}
          className="block w-full h-full"
        >
          {imageContent}
        </a>
      ) : (
        imageContent
      )}
      <ActionLinks project={project} />
    </div>
  );
};

export const ProjectItem = ({ project }: ProjectCardProps) => {
  if (project.featured) {
    return (
      <div className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm overflow-hidden hover:border-cyan-400/40 dark:hover:border-cyan-400/30 hover:shadow-xl hover:shadow-cyan-400/5 transition-all duration-300">
        <ProjectMedia
          project={project}
          heightClass="h-72 sm:h-80"
          titleClass="text-2xl"
          bottomClass="bottom-4 left-5"
        />

        <div className="flex flex-col p-6 gap-4">
          {project.featuredBadge && (
            <div className="inline-flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/5 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {project.featuredBadge}
            </div>
          )}
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {project.description}
          </p>
          <TagList tags={project.tags} />
          <FooterLinks project={project} />
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm overflow-hidden hover:border-cyan-400/40 dark:hover:border-cyan-400/30 hover:shadow-xl hover:shadow-cyan-400/5 transition-all duration-300">
      <ProjectMedia
        project={project}
        heightClass="h-52"
        titleClass="text-lg"
        bottomClass="bottom-3 left-4"
      />

      <div className="flex flex-col flex-1 p-5 gap-4">
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
          {project.description}
        </p>
        <TagList tags={project.tags} />
        <FooterLinks project={project} />
      </div>
    </div>
  );
};
