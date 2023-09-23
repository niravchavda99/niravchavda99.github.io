import './Skills.scss';
import {getAllSkills} from "./AllSkills";
import Skill from "./skill/Skill";

const Skills = () => {
  return (
      <div id={'skills'}>
        <div className="skills-header">Skills</div>
        <br/>
        <div className="skills-container">
          {getAllSkills().map(skill =>
              <Skill key={skill.name} skillName={skill.name} iconClassName={skill.className} svg={skill.svg}/>)}
        </div>
      </div>
  );
};

export default Skills;