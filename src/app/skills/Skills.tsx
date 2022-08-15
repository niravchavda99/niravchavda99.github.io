import './Skills.scss';
import {allSkills} from "./AllSkills";
import Skill from "./skill/Skill";
import DarkModeProps from "../common/DarkModeProps";

const Skills = ({darkMode}: DarkModeProps) => {
  return (
      <div id={'skills'}>
        <div className="text-5xl">Skills</div>
        <br/>
        <div className="w-2/3">
          {allSkills.map(skill =>
              <Skill skillName={skill.name} iconClassName={skill.className} svg={skill.svg}/>)}
        </div>
      </div>
  );
};

export default Skills;