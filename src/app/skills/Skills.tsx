import './Skills.scss';
import {getAllSkills} from "./AllSkills";
import Skill from "./skill/Skill";
import DarkModeValueProps from "../common/DarkModeValueProps";

const Skills = ({darkMode}: DarkModeValueProps) => {
  return (
      <div id={'skills'}>
        <div className="skills-header">Skills</div>
        <br/>
        <div className="w-2/3">
          {getAllSkills(darkMode).map(skill =>
              <Skill skillName={skill.name} iconClassName={skill.className} svg={skill.svg}/>)}
        </div>
      </div>
  );
};

export default Skills;