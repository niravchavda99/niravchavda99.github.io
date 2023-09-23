import {BsCodeSlash} from "react-icons/bs";
import DevIcon from "./common/DevIcon";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getMonthName = (month: number): string => {
  return months[month - 1];
};

const devIconClasses: any = {
  C: {light: "c-plain colored", dark: "c-plain colored"},
  "C++": {light: "cplusplus-plain colored", dark: "cplusplus-plain colored"},
  Java: {light: "java-plain colored", dark: "java-plain colored"},
  HTML: {light: "html5-plain colored", dark: "html5-plain colored"},
  CSS: {light: "css3-plain colored", dark: "css3-plain colored"},
  JavaScript: {
    light: "javascript-plain colored",
    dark: "javascript-plain colored",
  },
  TypeScript: {
    light: "typescript-plain colored",
    dark: "typescript-plain colored",
  },
  Dart: {light: "dart-plain colored", dark: "dart-plain colored"},
  Flutter: {light: "flutter-plain colored", dark: "flutter-plain colored"},
  Shell: {light: "bash-plain colored", dark: "bash-plain"},
  Svelte: {light: "svelte-plain colored", dark: "svelte-plain colored"},
};

export const getLanguageIcon = (
    language: string
): JSX.Element => {
  const languageClass = devIconClasses[language];

  if (!languageClass) {
    return <BsCodeSlash className={"inline-block"} size={18}/>;
  }

  const themeClass = languageClass["dark"];

  const className = `devicon-${themeClass}`;

  return <DevIcon size={1} className={className}/>;
};
