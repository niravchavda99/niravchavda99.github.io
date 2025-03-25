import portfolioThreeJsSnap from "@/src/assets/images/portfolio-three-js-snap.png";
import _3DPortfolioSnap from "@/src/assets/images/3d-portfolio-snap.png";
import pokedexSnap from "@/src/assets/images/pokedex-snap.png";
import genForgeSnap from "@/src/assets/images/gen-forge-snap.png";
import xpathifySnap from "@/src/assets/images/xpathify-snap.png";

export interface ProjectTag {
    name: string;
    color: string;
}

export interface Project {
    codeLink?: string;
    description: string;
    image: string;
    link?: string;
    name: string;
    tags: ProjectTag[];
}

const xpathifyProject: Project = {
    name: "Xpathify",
    description: "Instantly test and evaluate XPath expressions directly on web pages.",
    image: xpathifySnap.src,
    codeLink: undefined,
    tags: [
        {"name": "chrome-extension", "color": "orange-text-gradient"},
        {"name": "react", "color": "green-text-gradient"},
        {"name": "typescript", "color": "pink-text-gradient"},
        {"name": "xpath", "color": "blue-text-gradient"}
    ]
};

const genForgeProject: Project = {
    codeLink: "https://github.com/niravchavda99/gen-forge",
    description: "Utility app to generate useful values on the fly!",
    image: genForgeSnap.src,
    link: "https://niravchavda99.github.io/gen-forge",
    name: "GenForge",
    tags: [
        {name: "nextjs", color: "orange-text-gradient"},
        {name: "react", color: "green-text-gradient"},
        {name: "shadcn", color: "pink-text-gradient"},
        {name: "tailwind", color: "blue-text-gradient"},
    ],
};

const pokedexProject: Project = {
    description: "Project to understand Next.js",
    image: pokedexSnap.src,
    link: "https://pokedex-six-neon.vercel.app",
    name: "Pokédex",
    tags: [
        {name: "next.js", color: "blue-text-gradient"},
        {name: "react", color: "orange-text-gradient"},
        {name: "shadcn", color: "green-text-gradient"},
        {name: "tailwind", color: "pink-text-gradient"},
    ],
};

const _3DPortfolioProject: Project = {
    codeLink: "https://github.com/niravchavda99/3d-portfolio-demo",
    description: "Learning project to work with 3D elements in Javascript",
    image: _3DPortfolioSnap.src,
    link: "https://3d-portfolio-demo-chi.vercel.app",
    name: "3D Portfolio",
    tags: [
        {name: "react", color: "orange-text-gradient"},
        {name: "vite", color: "green-text-gradient"},
        {name: "threejs", color: "blue-text-gradient"},
        {name: "animation", color: "pink-text-gradient"},
        {name: "3d", color: "orange-text-gradient"},
    ],
};

const portfolioThreeJsProject: Project = {
    codeLink: "https://github.com/niravchavda99/portfolio-threejs-demo",
    description: "Learning project to work with 3D elements in Javascript",
    image: portfolioThreeJsSnap.src,
    link: "https://portfolio-threejs-demo.vercel.app/",
    name: "Portfolio ThreeJS",
    tags: [
        {name: "react", color: "orange-text-gradient"},
        {name: "vite", color: "green-text-gradient"},
        {name: "threejs", color: "blue-text-gradient"},
        {name: "animation", color: "pink-text-gradient"},
        {name: "3d", color: "orange-text-gradient"},
    ],
};

export const projects: Project[] = [
    xpathifyProject,
    genForgeProject,
    pokedexProject,
    _3DPortfolioProject,
    portfolioThreeJsProject,
];
