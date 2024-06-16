import micronautLight from "../../assets/icons/tech/micronaut-light.svg";
import micronautDark from "../../assets/icons/tech/micronaut-dark.svg";
import css from "../../assets/icons/tech/css.png";
import git from "../../assets/icons/tech/git.png";
import html from "../../assets/icons/tech/html.png";
import javascript from "../../assets/icons/tech/javascript.png";
import nodejs from "../../assets/icons/tech/nodejs.png";
import react from "../../assets/icons/tech/react.svg";
import tailwind from "../../assets/icons/tech/tailwind.png";
import threeJs from "../../assets/icons/tech/threejs.svg";
import typescript from "../../assets/icons/tech/typescript.png";
import java from "../../assets/icons/tech/java.svg";
import angular from "../../assets/icons/tech/angular.png";
import bootstrap from "../../assets/icons/tech/bootstrap.svg";
import microsoftSqlServerLight from "../../assets/icons/tech/microsoft-sql-server-light.svg";
import microsoftSqlServerDark from "../../assets/icons/tech/microsoft-sql-server-dark.svg";
import mysql from "../../assets/icons/tech/mysql.png";
import dart from "../../assets/icons/tech/dart.svg";
import flutter from "../../assets/icons/tech/flutter.svg";
import intellijIdea from "../../assets/icons/tech/intellij-idea.svg";
import vsCode from "../../assets/icons/tech/vs-code.svg";

type Technology = {
  name: string;
  icon: string;
  darkIcon?: string;
};

export const technologies: Technology[] = [
  { name: "Java", icon: java.src },
  { name: "Micronaut", icon: micronautLight.src, darkIcon: micronautDark.src },
  { name: "Javascript", icon: javascript.src },
  { name: "Typescript", icon: typescript.src },
  { name: "Angular", icon: angular.src },
  { name: "React", icon: react.src },
  { name: "HTML", icon: html.src },
  { name: "CSS", icon: css.src },
  { name: "Bootstrap", icon: bootstrap.src },
  { name: "Tailwind", icon: tailwind.src },
  {
    name: "MS SQL Server",
    icon: microsoftSqlServerLight.src,
    darkIcon: microsoftSqlServerDark.src,
  },
  { name: "NodeJS", icon: nodejs.src },
  { name: "MySQL", icon: mysql.src },
  { name: "Dart", icon: dart.src },
  { name: "Flutter", icon: flutter.src },
  { name: "ThreeJS", icon: threeJs.src },
  { name: "Git", icon: git.src },
  { name: "IntelliJ", icon: intellijIdea.src },
  { name: "VSCode", icon: vsCode.src },
];
