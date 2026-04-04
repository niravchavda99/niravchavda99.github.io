import micronautLight from "@/src/assets/icons/tech/micronaut-light.svg";
import micronautDark from "@/src/assets/icons/tech/micronaut-dark.svg";
import springBoot from "@/src/assets/icons/tech/spring.svg";
import css from "@/src/assets/icons/tech/css.png";
import git from "@/src/assets/icons/tech/git.png";
import html from "@/src/assets/icons/tech/html.png";
import javascript from "@/src/assets/icons/tech/javascript.png";
import nodejs from "@/src/assets/icons/tech/nodejs.png";
import react from "@/src/assets/icons/tech/react.svg";
import tailwind from "@/src/assets/icons/tech/tailwind.png";
import typescript from "@/src/assets/icons/tech/typescript.png";
import java from "@/src/assets/icons/tech/java.svg";
import angular from "@/src/assets/icons/tech/angular.png";
import microsoftSqlServerLight from "@/src/assets/icons/tech/microsoft-sql-server-light.svg";
import microsoftSqlServerDark from "@/src/assets/icons/tech/microsoft-sql-server-dark.svg";
import postgreSQL from "@/src/assets/icons/tech/postgresql.svg";
import dart from "@/src/assets/icons/tech/dart.svg";
import flutter from "@/src/assets/icons/tech/flutter.svg";
import intellijIdea from "@/src/assets/icons/tech/intellij-idea.svg";
import vsCode from "@/src/assets/icons/tech/vs-code.svg";
import nextjsLight from "@/src/assets/icons/tech/nextjs-light.svg";
import nextjsDark from "@/src/assets/icons/tech/nextjs-dark.svg";
import nestjs from "@/src/assets/icons/tech/nestjs.png";
import extensions from "@/src/assets/icons/tech/extensions.png";

export type SkillCategory =
  | "Backend"
  | "Frontend"
  | "Database"
  | "Mobile"
  | "Tools";

export type Technology = {
  name: string;
  icon: string;
  darkIcon?: string;
  category: SkillCategory;
};

export const technologies: Technology[] = [
  { name: "Java", icon: java.src, category: "Backend" },
  { name: "Spring Boot", icon: springBoot.src, category: "Backend" },
  {
    name: "Micronaut",
    icon: micronautLight.src,
    darkIcon: micronautDark.src,
    category: "Backend",
  },
  { name: "NestJS", icon: nestjs.src, category: "Backend" },

  { name: "JavaScript", icon: javascript.src, category: "Frontend" },
  { name: "TypeScript", icon: typescript.src, category: "Frontend" },
  { name: "React", icon: react.src, category: "Frontend" },
  {
    name: "Next.js",
    icon: nextjsLight.src,
    darkIcon: nextjsDark.src,
    category: "Frontend",
  },
  { name: "Angular", icon: angular.src, category: "Frontend" },
  { name: "Tailwind", icon: tailwind.src, category: "Frontend" },
  { name: "HTML", icon: html.src, category: "Frontend" },
  { name: "CSS", icon: css.src, category: "Frontend" },
  { name: "Chrome Extensions", icon: extensions.src, category: "Frontend" },

  {
    name: "MS SQL Server",
    icon: microsoftSqlServerLight.src,
    darkIcon: microsoftSqlServerDark.src,
    category: "Database",
  },
  { name: "PostgreSQL", icon: postgreSQL.src, category: "Database" },

  { name: "Dart", icon: dart.src, category: "Mobile" },
  { name: "Flutter", icon: flutter.src, category: "Mobile" },

  { name: "Git", icon: git.src, category: "Tools" },
  { name: "NodeJS", icon: nodejs.src, category: "Tools" },
  { name: "IntelliJ", icon: intellijIdea.src, category: "Tools" },
  { name: "VSCode", icon: vsCode.src, category: "Tools" },
];

export const CATEGORY_ACCENT: Record<SkillCategory, string> = {
  Backend:
    "text-cyan-500 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-400/10 border-cyan-200/60 dark:border-cyan-400/20",
  Frontend:
    "text-violet-500 dark:text-violet-400 bg-violet-50 dark:bg-violet-400/10 border-violet-200/60 dark:border-violet-400/20",
  Database:
    "text-emerald-500 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10 border-emerald-200/60 dark:border-emerald-400/20",
  Mobile:
    "text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10 border-amber-200/60 dark:border-amber-400/20",
  Tools:
    "text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700",
};
