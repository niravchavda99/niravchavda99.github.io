import incubyte from "@/src/assets/images/incubyte_logo.jpg";
import gujarat from "@/src/assets/images/gujarat_university_logo.png";
import kachchh from "@/src/assets/images/kskvku_logo.png";
import typescript from "@/src/assets/icons/tech/typescript.png";
import javascript from "@/src/assets/icons/tech/javascript.png";
import react from "@/src/assets/icons/tech/react.svg";
import next from "@/src/assets/icons/tech/nextjs-dark.svg";
import angular from "@/src/assets/icons/tech/angular.png";
import tailwind from "@/src/assets/icons/tech/tailwind.png";
import html from "@/src/assets/icons/tech/html.png";
import css from "@/src/assets/icons/tech/css.png";
import extensions from "@/src/assets/icons/tech/extensions.png";
import java from "@/src/assets/icons/tech/java.svg";
import spring from "@/src/assets/icons/tech/spring.svg";
import micronaut from "@/src/assets/icons/tech/micronaut-dark.svg";
import nest from "@/src/assets/icons/tech/nestjs.png";
import node from "@/src/assets/icons/tech/nodejs.png";
import postgres from "@/src/assets/icons/tech/postgresql.svg";
import sql from "@/src/assets/icons/tech/microsoft-sql-server-light.svg";
import mysql from "@/src/assets/icons/tech/mysql.png";
import flutter from "@/src/assets/icons/tech/flutter.svg";
import dart from "@/src/assets/icons/tech/dart.svg";
import git from "@/src/assets/icons/tech/git.png";
import idea from "@/src/assets/icons/tech/intellij-idea.svg";
import vscode from "@/src/assets/icons/tech/vs-code.svg";
import type { StaticImageData } from "next/image";

// Optional visual lookup: new content works without adding an icon here.
export const organizationLogos: Record<string, StaticImageData> = {
  Incubyte: incubyte,
  "Gujarat University": gujarat,
  "KSKV Kachchh University": kachchh,
};

export const technologyIcons: Record<string, StaticImageData> = {
  TypeScript: typescript,
  JavaScript: javascript,
  React: react,
  "Next.js": next,
  Angular: angular,
  "Tailwind CSS": tailwind,
  HTML: html,
  CSS: css,
  "Chrome Extensions": extensions,
  Java: java,
  "Spring Boot": spring,
  Micronaut: micronaut,
  NestJS: nest,
  "Node.js": node,
  PostgreSQL: postgres,
  "MS SQL Server": sql,
  MySQL: mysql,
  Flutter: flutter,
  Dart: dart,
  Git: git,
  "IntelliJ IDEA": idea,
  "VS Code": vscode,
};
