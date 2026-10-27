import devreflex from "@/src/assets/images/devreflex-snap.png";
import xpathify from "@/src/assets/images/xpathify-snap.png";
import loans from "@/src/assets/images/loan-studio-snap.png";
import pokedex from "@/src/assets/images/pokedex-snap.png";
import taskbed from "@/src/assets/images/taskbed-snap.png";
import wallpaper from "@/src/assets/images/wallpaper-matrix-snap.png";
import portfolio from "@/src/assets/images/3d-portfolio-snap.png";
import three from "@/src/assets/images/portfolio-three-js-snap.png";
import type { StaticImageData } from "next/image";

export type ProjectCategory = "Tools" | "Web apps" | "Experiments";
export interface Project {
  name: string;
  category: ProjectCategory;
  description: string;
  image?: StaticImageData;
  href: string;
  source?: string;
  tags: string[];
  color: "lavender" | "mint" | "peach" | "yellow";
}

export const projects: Project[] = [
  {
    name: "DevReflex",
    category: "Tools",
    description:
      "A developer’s everyday toolkit. Generators, converters, formatters, and testers, one keystroke away on any page.",
    image: devreflex,
    href: "https://devreflex.niravchavda.in",
    tags: ["Chrome extension", "React", "TypeScript"],
    color: "lavender",
  },
  {
    name: "Xpathify",
    category: "Tools",
    description:
      "Less guesswork. Better XPath. Test and evaluate expressions directly on the page you’re working with.",
    image: xpathify,
    href: "https://xpathify.niravchavda.in",
    tags: ["Chrome extension", "React", "XPath"],
    color: "mint",
  },
  {
    name: "Loan Studio",
    category: "Web apps",
    description:
      "Big financial decisions, clearer numbers. Explore EMIs, extra payments, and downloadable amortization schedules.",
    image: loans,
    href: "https://loan-calculator-beta-nine.vercel.app/",
    tags: ["React", "TypeScript", "Tailwind"],
    color: "peach",
  },
  {
    name: "Pokédex",
    category: "Web apps",
    description:
      "A little curiosity, a whole world of Pokémon. Explore types, stats, generations, and your own favorites.",
    image: pokedex,
    href: "https://pokedex.niravchavda.in",
    tags: ["Next.js", "React", "PokéAPI"],
    color: "yellow",
  },
  {
    name: "TaskBed",
    category: "Web apps",
    description:
      "A quieter place for your to-dos. A personal task manager with your data stored in your own Google Drive.",
    image: taskbed,
    href: "https://taskbed.niravchavda.in",
    tags: ["Next.js", "Google Drive", "PWA"],
    color: "mint",
  },
  {
    name: "Wallpaper Matrix",
    category: "Tools",
    description:
      "Make your screen your own. Mix geometric styles and palettes, preview live, and take home a PNG.",
    image: wallpaper,
    href: "https://wallpapermatrix.niravchavda.in",
    tags: ["Generative design", "Creative tool"],
    color: "lavender",
  },
  {
    name: "3D Portfolio",
    category: "Experiments",
    description:
      "An exploration of depth, interaction, and what a portfolio can feel like in three dimensions.",
    image: portfolio,
    href: "https://3d-portfolio-demo-chi.vercel.app",
    source: "https://github.com/niravchavda99/3d-portfolio-demo",
    tags: ["React", "Three.js", "Vite"],
    color: "peach",
  },
  {
    name: "Portfolio ThreeJS",
    category: "Experiments",
    description:
      "A browser-sized playground for WebGL animation and immersive, interactive scenes.",
    image: three,
    href: "https://portfolio-threejs-demo.vercel.app/",
    source: "https://github.com/niravchavda99/portfolio-threejs-demo",
    tags: ["WebGL", "Three.js", "React"],
    color: "yellow",
  },
];
