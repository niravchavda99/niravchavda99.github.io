import './Skills.scss';
import {getAllSkills} from "./AllSkills";
import Skill from "./skill/Skill";
import ThemeValueProps from "../common/ThemeValueProps";

const Skills = ({theme}: ThemeValueProps) => {
  return (
      <div id={'skills'}>
        <div className="skills-header">Skills</div>
        <br/>
        <div className="skills-container">
          {getAllSkills(theme).map(skill =>
              <Skill key={skill.name} skillName={skill.name} iconClassName={skill.className} svg={skill.svg}/>)}
        </div>
      </div>
  );
};

export default Skills;