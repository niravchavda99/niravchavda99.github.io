import micronautLight from '../assets/icons/micronaut_icon_black.svg';
import micronautDark from '../assets/icons/micronaut_icon_white.svg';

type Skill = {
  name: string,
  className: string,
  svg?: string
}

const getDeviconClassName = (subject: string, darkMode: boolean = false) => {
  return `devicon-${subject} ${darkMode ? '' : 'colored'}`;
}

export const getAllSkills = (theme: string): Skill[] => {
  const isDarkTheme = theme === 'dark';

  return [
    {name: 'C', className: getDeviconClassName('c-plain')},
    {name: 'C++', className: getDeviconClassName('cplusplus-plain')},
    {name: 'Java', className: getDeviconClassName('java-plain')},
    {name: 'HTML', className: getDeviconClassName('html5-plain')},
    {name: 'CSS', className: getDeviconClassName('css3-plain')},
    {name: 'Javascript', className: getDeviconClassName('javascript-plain')},
    {name: 'Typescript', className: getDeviconClassName('typescript-plain')},
    {name: 'Markdown', className: getDeviconClassName('markdown-original', isDarkTheme)},
    {name: 'NodeJS', className: getDeviconClassName('nodejs-plain')},
    {name: 'Express', className: getDeviconClassName('express-original', isDarkTheme)},
    {name: 'React', className: getDeviconClassName('react-original')},
    {name: 'Angular', className: getDeviconClassName('angularjs-plain')},
    {name: 'Bootstrap', className: getDeviconClassName('bootstrap-plain', isDarkTheme)},
    {name: 'Tailwind', className: getDeviconClassName('tailwindcss-plain')},
    {name: 'PHP', className: getDeviconClassName('php-plain')},
    {name: 'Go', className: getDeviconClassName('go-plain')},
    {name: 'MySQL', className: getDeviconClassName('mysql-plain', isDarkTheme)},
    {name: 'PostgreSQL', className: getDeviconClassName('postgresql-plain', isDarkTheme)},
    {name: 'MongoDB', className: getDeviconClassName('mongodb-plain')},
    {name: 'Docker', className: getDeviconClassName('docker-plain')},
    {name: 'Spring', className: getDeviconClassName('spring-plain')},
    {
      name: 'Micronaut',
      className: getDeviconClassName(''),
      svg: isDarkTheme ? micronautDark : micronautLight
    },
    {name: 'Dart', className: getDeviconClassName('dart-plain')},
    {name: 'Flutter', className: getDeviconClassName('flutter-plain')},
    {name: 'D3 JS', className: getDeviconClassName('d3js-plain')},
    {name: 'Git', className: getDeviconClassName('git-plain')},
    {name: 'Firebase', className: getDeviconClassName('firebase-plain')},
    {name: 'Heroku', className: getDeviconClassName('heroku-plain')},
    {name: 'VSCode', className: getDeviconClassName('vscode-plain')},
    {name: 'IntelliJ', className: getDeviconClassName('intellij-plain')},
    {name: 'Android Studio', className: getDeviconClassName('androidstudio-plain')},
    {name: 'Photoshop', className: getDeviconClassName('photoshop-plain')}
  ];
}
