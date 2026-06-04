import { projects } from "./constants";
import { ProjectItem } from "./project-item/project-item";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Nirav Chavda",
  description:
    "A selection of things Nirav Chavda has built: open-source projects, tools, and experiments.",
};

export default function ProjectsPage() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <SectionContainer id="projects">
      <HeadingText coloredText="Projects" />

      <p className="mt-4 mb-14 text-slate-500 dark:text-slate-400 text-base max-w-2xl">
        A selection of things I&apos;ve built, each one a step in my journey.
        Many are open-source, so feel free to explore the code.
      </p>

      <div className="flex flex-col gap-6">
        {featured && <ProjectItem project={featured} />}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {rest.map((project) => (
            <ProjectItem key={project.name} project={project} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
