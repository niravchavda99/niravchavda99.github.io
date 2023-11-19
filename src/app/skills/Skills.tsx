import './Skills.scss';
import {getAllSkills} from "./AllSkills";
import Skill from "./skill/Skill";
import {GlassMorphic} from "../common/glassmorphic/GlassMorphic";

const Skills = () => {
  return (
      <div id={'skills'} className='max-container'>
        <div className="skills-header">Skills</div>
        <br/>
        <GlassMorphic fadeOpacity={10} classNames={'skills-container px-8 py-16'}>
          {getAllSkills().map(skill =>
              <Skill key={skill.name} skillName={skill.name} iconClassName={skill.className}
                     svg={skill.svg}/>)}
        </GlassMorphic>
      </div>
  );
};

export default Skills;