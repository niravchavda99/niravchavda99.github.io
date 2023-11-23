import micronautLight from "../assets/icons/tech/micronaut-light.svg";
import micronautDark from "../assets/icons/tech/micronaut-dark.svg";
import css from "../assets/icons/tech/css.png";
import git from "../assets/icons/tech/git.png";
import html from "../assets/icons/tech/html.png";
import javascript from "../assets/icons/tech/javascript.png";
import nodejs from "../assets/icons/tech/nodejs.png";
import react from "../assets/icons/tech/react.svg";
import tailwind from "../assets/icons/tech/tailwind.png";
import threeJs from "../assets/icons/tech/threejs.svg";
import typescript from "../assets/icons/tech/typescript.png";
import java from "../assets/icons/tech/java.svg";
import angular from "../assets/icons/tech/angular.png";
import bootstrap from "../assets/icons/tech/bootstrap.svg";
import microsoftSqlServerLight from "../assets/icons/tech/microsoft-sql-server-light.svg";
import microsoftSqlServerDark from "../assets/icons/tech/microsoft-sql-server-dark.svg";
import mysql from "../assets/icons/tech/mysql.png";
import dart from "../assets/icons/tech/dart.svg";
import flutter from "../assets/icons/tech/flutter.svg";
import intellijIdea from "../assets/icons/tech/intellij-idea.svg";
import vsCode from "../assets/icons/tech/vs-code.svg";

type Technology = {
    name: string;
    icon: string;
    darkIcon?: string;
};

export const technologies: Technology[] = [
    {name: 'Java', icon: java},
    {name: 'Micronaut', icon: micronautLight, darkIcon: micronautDark},
    {name: "Javascript", icon: javascript},
    {name: "Typescript", icon: typescript},
    {name: "Angular", icon: angular},
    {name: "React", icon: react},
    {name: "HTML", icon: html},
    {name: "CSS", icon: css},
    {name: "Bootstrap", icon: bootstrap},
    {name: "Tailwind", icon: tailwind},
    {name: "MS SQL Server", icon: microsoftSqlServerLight, darkIcon: microsoftSqlServerDark},
    {name: "NodeJS", icon: nodejs},
    {name: "MySQL", icon: mysql},
    {name: "Dart", icon: dart},
    {name: "Flutter", icon: flutter},
    {name: "ThreeJS", icon: threeJs},
    {name: "Git", icon: git},
    {name: "IntelliJ", icon: intellijIdea},
    {name: "VSCode", icon: vsCode},
];

