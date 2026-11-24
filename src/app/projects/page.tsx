import type { Metadata } from "next";
import { ProjectsExplorer } from "./projects-explorer";

export const metadata: Metadata = {
  title: "Projects | Nirav Chavda",
  description:
    "A selection of things Nirav Chavda has built: open-source projects, tools, and experiments.",
};

export default function ProjectsPage() {
  return <ProjectsExplorer />;
}
