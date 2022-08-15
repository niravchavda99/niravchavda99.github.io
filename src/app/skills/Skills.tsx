import './Skills.scss';
import {allSkills} from "./AllSkills";
import Skill from "./skill/Skill";

const Skills = () => {
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