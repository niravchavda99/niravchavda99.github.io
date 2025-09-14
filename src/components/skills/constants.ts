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

export type Technology = {
  name: string;
  icon: string;
  darkIcon?: string;
};

export const technologies: Technology[] = [
  { name: "Java", icon: java.src },
  { name: "Spring Boot", icon: springBoot.src },
  { name: "Micronaut", icon: micronautLight.src, darkIcon: micronautDark.src },
  { name: "Javascript", icon: javascript.src },
  { name: "Typescript", icon: typescript.src },
  { name: "Next.js", icon: nextjsLight.src, darkIcon: nextjsDark.src },
  { name: "React", icon: react.src },
  { name: "Angular", icon: angular.src },
  { name: "Chrome Extensions", icon: extensions.src },
  { name: "Tailwind", icon: tailwind.src },
  { name: "CSS", icon: css.src },
  { name: "HTML", icon: html.src },
  { name: "NestJS", icon: nestjs.src },
  {
    name: "MS SQL Server",
    icon: microsoftSqlServerLight.src,
    darkIcon: microsoftSqlServerDark.src,
  },
  { name: "NodeJS", icon: nodejs.src },
  { name: "PostgreSQL", icon: postgreSQL.src },
  { name: "Dart", icon: dart.src },
  { name: "Flutter", icon: flutter.src },
  { name: "Git", icon: git.src },
  { name: "IntelliJ", icon: intellijIdea.src },
  { name: "VSCode", icon: vsCode.src },
];
