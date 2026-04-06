import _3DPortfolioSnap from "@/src/assets/images/3d-portfolio-snap.png";
import genForgeSnap from "@/src/assets/images/gen-forge-snap.png";
import pokedexSnap from "@/src/assets/images/pokedex-snap.png";
import portfolioThreeJsSnap from "@/src/assets/images/portfolio-three-js-snap.png";
import taskbedSnap from "@/src/assets/images/taskbed-snap.png";
import xpathifySnap from "@/src/assets/images/xpathify-snap.png";

export interface Project {
  codeLink?: string;
  description: string;
  featured?: boolean;
  featuredBadge?: string;
  image: string;
  link?: string;
  name: string;
  tags: string[];
}

const xpathifyProject: Project = {
  name: "Xpathify",
  description:
    "Instantly test and evaluate XPath expressions directly on web pages. A Chrome Extension for XPath power users.",
  image: xpathifySnap.src,
  link: "https://chromewebstore.google.com/detail/ffhbcenfioobgmnhokaabdaecfoocmli?utm_source=item-share-cb",
  tags: ["chrome-extension", "react", "typescript", "xpath"],
  featured: false,
  featuredBadge: "Published on Chrome Web Store",
};

const genForgeProject: Project = {
  name: "GenForge",
  codeLink: "https://github.com/niravchavda99/gen-forge",
  description:
    "Utility app to generate useful values on the fly — UUIDs, hashes, colors, and more.",
  image: genForgeSnap.src,
  link: "https://niravchavda99.github.io/gen-forge",
  tags: ["nextjs", "react", "shadcn", "tailwind"],
};

const pokedexProject: Project = {
  name: "Pokédex",
  description:
    "Browse, search, and explore every Pokémon — types, stats, generations, and a personal favorites list.",
  image: pokedexSnap.src,
  link: "https://pokedex.niravchavda.in",
  tags: ["next.js", "react", "tailwind", "pokeapi"],
};

const taskbedProject: Project = {
  name: "TaskBed",
  description:
    "Personal task manager powered by Google Drive — your tasks, stored where you already are.",
  image: taskbedSnap.src,
  link: "https://taskbed.niravchavda.in",
  tags: ["next.js", "react", "tailwind", "google-drive", "pwa"],
};

const _3DPortfolioProject: Project = {
  name: "3D Portfolio",
  codeLink: "https://github.com/niravchavda99/3d-portfolio-demo",
  description:
    "Learning project exploring 3D elements in the browser using Three.js and React.",
  image: _3DPortfolioSnap.src,
  link: "https://3d-portfolio-demo-chi.vercel.app",
  tags: ["react", "vite", "threejs", "3d", "animation"],
};

const portfolioThreeJsProject: Project = {
  name: "Portfolio ThreeJS",
  codeLink: "https://github.com/niravchavda99/portfolio-threejs-demo",
  description:
    "Immersive 3D portfolio demo with WebGL animations and interactive Three.js scenes.",
  image: portfolioThreeJsSnap.src,
  link: "https://portfolio-threejs-demo.vercel.app/",
  tags: ["react", "vite", "threejs", "3d", "animation"],
};

export const projects: Project[] = [
  xpathifyProject,
  pokedexProject,
  taskbedProject,
  genForgeProject,
  _3DPortfolioProject,
  portfolioThreeJsProject,
];
