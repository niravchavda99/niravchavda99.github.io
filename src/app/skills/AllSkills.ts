import micronautDark from "../assets/icons/micronaut_icon_white.svg";

type Skill = {
  name: string;
  className: string;
  svg?: string;
};

const getDeviconClassName = (subject: string, darkMode: boolean = false) => {
  return `devicon-${subject} ${darkMode ? "" : "colored"}`;
};

export const getAllSkills = (): Skill[] => {
  return [
    {name: "Java", className: getDeviconClassName("java-plain")},
    {
      name: "Micronaut",
      className: getDeviconClassName(""),
      svg: micronautDark,
    },
    {name: "Javascript", className: getDeviconClassName("javascript-plain")},
    {name: "Typescript", className: getDeviconClassName("typescript-plain")},
    {name: "Angular", className: getDeviconClassName("angularjs-plain")},
    {name: "React", className: getDeviconClassName("react-original")},
    {name: "HTML", className: getDeviconClassName("html5-plain")},
    {name: "CSS", className: getDeviconClassName("css3-plain")},
    {name: "Bootstrap", className: getDeviconClassName("bootstrap-plain")},
    {name: "Tailwind", className: getDeviconClassName("tailwindcss-plain")},
    {name: "MS SQL Server", className: getDeviconClassName("microsoftsqlserver-plain")},
    {
      name: "Markdown",
      className: getDeviconClassName("markdown-original", true),
    },
    {name: "Spring", className: getDeviconClassName("spring-plain")},
    {name: "NodeJS", className: getDeviconClassName("nodejs-plain")},
    {
      name: "Express",
      className: getDeviconClassName("express-original", true),
    },
    {name: "MySQL", className: getDeviconClassName("mysql-plain")},
    {name: "Dart", className: getDeviconClassName("dart-plain")},
    {name: "Flutter", className: getDeviconClassName("flutter-plain")},
    {name: "Git", className: getDeviconClassName("git-plain")},
    {name: "IntelliJ", className: getDeviconClassName("intellij-plain")},
    {name: "VSCode", className: getDeviconClassName("vscode-plain")},
  ];
};
