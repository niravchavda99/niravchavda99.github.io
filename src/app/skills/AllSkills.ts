import micronautLight from '../assets/icons/micronaut_icon_black.svg';
import micronautDark from '../assets/icons/micronaut_icon_white.svg';

type Skill = {
  name: string,
  className: string,
  svg?: string
}

const getClassName = (subject: string, darkMode: boolean = false) => {
  return `devicon-${subject} ${darkMode ? '' : 'colored'}`;
}

export const getAllSkills = (darkMode: boolean): Skill[] => {
  return [
    {name: 'C', className: getClassName('c-plain')},
    {name: 'C++', className: getClassName('cplusplus-plain')},
    {name: 'Java', className: getClassName('java-plain')},
    {name: 'HTML', className: getClassName('html5-plain')},
    {name: 'CSS', className: getClassName('css3-plain')},
    {name: 'Javascript', className: getClassName('javascript-plain')},
    {name: 'Typescript', className: getClassName('typescript-plain')},
    {name: 'Markdown', className: getClassName('markdown-original', darkMode)},
    {name: 'NodeJS', className: getClassName('nodejs-plain')},
    {name: 'Express', className: getClassName('express-original', darkMode)},
    {name: 'React', className: getClassName('react-original')},
    {name: 'Angular', className: getClassName('angularjs-plain')},
    {name: 'Bootstrap', className: getClassName('bootstrap-plain', darkMode)},
    {name: 'Tailwind', className: getClassName('tailwindcss-plain')},
    {name: 'PHP', className: getClassName('php-plain')},
    {name: 'Go', className: getClassName('go-plain')},
    {name: 'MySQL', className: getClassName('mysql-plain')},
    {name: 'PostgreSQL', className: getClassName('postgresql-plain')},
    {name: 'MongoDB', className: getClassName('mongodb-plain')},
    {name: 'Docker', className: getClassName('docker-plain')},
    {name: 'Spring', className: getClassName('spring-plain')},
    {name: 'Micronaut', className: getClassName(''), svg: darkMode ? micronautDark : micronautLight},
    {name: 'Dart', className: getClassName('dart-plain')},
    {name: 'Flutter', className: getClassName('flutter-plain')},
    {name: 'D3 JS', className: getClassName('d3js-plain')},
    {name: 'Git', className: getClassName('git-plain')},
    {name: 'Firebase', className: getClassName('firebase-plain')},
    {name: 'Heroku', className: getClassName('heroku-plain')},
    {name: 'VSCode', className: getClassName('vscode-plain')},
    {name: 'IntelliJ', className: getClassName('intellij-plain')},
    {name: 'Android Studio', className: getClassName('androidstudio-plain')},
    {name: 'Photoshop', className: getClassName('photoshop-plain')}
  ];
}
