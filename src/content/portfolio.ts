import type { MonthDate } from "./dates";

export const profile = {
  name: "Nirav Chavda",
  role: "Tech Lead",
  email: "niravchavda.dev@gmail.com",
  company: "Incubyte",
  socials: [
    { label: "GitHub", href: "https://github.com/niravchavda99" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/niravchavda99" },
    { label: "Instagram", href: "https://www.instagram.com/niravchavda99" },
    { label: "X", href: "https://www.x.com/niravchavda99" },
  ],
};

export interface Experience {
  start: MonthDate;
  end?: MonthDate;
  role: string;
  company: string;
  href: string;
  location?: string;
  description?: string;
}

export const experience: Experience[] = [
  {
    start: "2026-08",
    role: "Tech Lead",
    company: "Incubyte",
    href: "https://www.incubyte.co/",
  },
  {
    start: "2022-07",
    end: "2026-08",
    role: "Software Craftsperson",
    company: "Incubyte",
    href: "https://www.incubyte.co/",
    description:
      "Building well-crafted software, from expressive interfaces to dependable backend services. Working across React, Next.js, Angular, Spring Boot, Micronaut, Flutter, Chrome extensions, Azure, and GCP.",
  },
  {
    start: "2022-01",
    end: "2022-07",
    role: "Software Craftsperson in Training",
    company: "Incubyte",
    href: "https://www.incubyte.co/",
    description:
      "A foundation in clean code, reactive programming, and thoughtful problem-solving. Explored data visualization with D3.js and turned complex information into useful graphs.",
  },
];

export const skillGroups = [
  {
    number: "01",
    title: "Interfaces",
    description: "Where people meet the product.",
    skills: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Angular",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "Chrome Extensions",
    ],
  },
  {
    number: "02",
    title: "Systems",
    description: "The things that make it all work.",
    skills: [
      "Java",
      "Spring Boot",
      "Micronaut",
      "NestJS",
      "Node.js",
      "PostgreSQL",
      "MS SQL Server",
      "MySQL",
    ],
  },
  {
    number: "03",
    title: "Beyond the browser",
    description: "More surfaces. Same care.",
    skills: [
      "Flutter",
      "Dart",
      "Azure",
      "GCP",
      "Git",
      "IntelliJ IDEA",
      "VS Code",
    ],
  },
];

export interface Education {
  start: MonthDate;
  end: MonthDate;
  degree: string;
  school: string;
  location: string;
  distinction: string;
  href: string;
}

export const education: Education[] = [
  {
    start: "2019-08",
    end: "2022-08",
    degree: "Master of Computer Applications",
    school: "Gujarat University",
    location: "Ahmedabad, Gujarat",
    distinction: "Gold medallist",
    href: "https://www.gujaratuniversity.ac.in/",
  },
  {
    start: "2016-07",
    end: "2019-07",
    degree: "Bachelor of Computer Applications",
    school: "KSKV Kachchh University",
    location: "Kachchh, Gujarat",
    distinction: "University second rank",
    href: "https://www.kskvku.ac.in/",
  },
];

export const activities = [
  {
    title: "Making science interactive.",
    label: "VIRTUAL LABS · IIT BOMBAY · 2020",
    description:
      "Completed Bootathon KTL-1 and collaborated on two Heat Transfer Lab experiments, bringing engineering concepts into the browser.",
  },
  {
    title: "Learning, then passing it on.",
    label: "JUNIOR TRAINER · IIT BOMBAY · 2020",
    description:
      "Helped engineering students across disciplines as a junior trainer at the online Bootathon KTL-2.",
  },
];
