import { Variants } from "framer-motion";
import portfolioThreeJsSnap from "@/src/assets/images/portfolio-three-js-snap.png";
import threeDPortfolioSnap from "@/src/assets/images/3d-portfolio-snap.png";
import pokedexSnap from "@/src/assets/images/pokedex-snap.png";

export interface ProjectTag {
  name: string;
  color: string;
}

export interface Project {
  codeLink?: string;
  description: string;
  image: string;
  link: string;
  name: string;
  tags: ProjectTag[];
}

export const projects: Project[] = [
  {
    description: "Project to understand Next.js",
    image: pokedexSnap.src,
    link: "https://pokedex-six-neon.vercel.app",
    name: "Pokédex",
    tags: [
      { name: "next.js", color: "blue-text-gradient" },
      { name: "react", color: "orange-text-gradient" },
      { name: "shadcn", color: "green-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
  },
  {
    codeLink: "https://github.com/niravchavda99/3d-portfolio-demo",
    description: "Learning project to work with 3D elements in Javascript",
    image: threeDPortfolioSnap.src,
    link: "https://3d-portfolio-demo-chi.vercel.app",
    name: "3D Portfolio",
    tags: [
      { name: "react", color: "orange-text-gradient" },
      { name: "vite", color: "green-text-gradient" },
      { name: "threejs", color: "blue-text-gradient" },
      { name: "animation", color: "pink-text-gradient" },
      { name: "3d", color: "orange-text-gradient" },
    ],
  },
  {
    codeLink: "https://github.com/niravchavda99/portfolio-threejs-demo",
    description: "Learning project to work with 3D elements in Javascript",
    image: portfolioThreeJsSnap.src,
    link: "https://portfolio-threejs-demo.vercel.app/",
    name: "Portfolio ThreeJS",
    tags: [
      { name: "react", color: "orange-text-gradient" },
      { name: "vite", color: "green-text-gradient" },
      { name: "threejs", color: "blue-text-gradient" },
      { name: "animation", color: "pink-text-gradient" },
      { name: "3d", color: "orange-text-gradient" },
    ],
  },
];

export const fadeIn = (
  direction: string,
  type: string,
  delay: number,
  duration: number,
) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  } as Variants;
};
