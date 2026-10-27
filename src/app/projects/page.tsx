import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectGallery } from "@/src/components/studio/project-gallery";
import type { Metadata } from "next";
import { projects } from "@/src/content/projects";
export const metadata: Metadata = {
  title: "Projects",
  description: `${projects.length} tools, web apps, and creative experiments by Nirav Chavda.`,
  alternates: { canonical: "/projects/" },
};
export default function ProjectsPage() {
  return (
    <main id="main" tabIndex={-1} className="container projects-page">
      <Link href="/" className="text-link">
        <ArrowLeft size={16} /> Back to the studio
      </Link>
      <div className="eyebrow archive-label">
        THE COLLECTION / {String(projects.length).padStart(2, "0")} PROJECTS
      </div>
      <h1>
        Curiosity,
        <br />
        put to <span className="serif-word">work.</span>
      </h1>
      <div className="archive-description">
        <p>
          Useful tools, personal projects, and a few experiments.
          <br />
          Each one started with “what if?”
        </p>
        <a
          className="text-link"
          href="https://github.com/niravchavda99"
          target="_blank"
          rel="noreferrer"
        >
          More on GitHub <ArrowUpRight size={17} />
        </a>
      </div>
      <ProjectGallery />
    </main>
  );
}
