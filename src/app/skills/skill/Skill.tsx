import DevIcon from "../../common/DevIcon";
import SvgIcon from "../../common/SvgIcon";
import "./Skill.scss";

type SkillProps = {
  skillName: string;
  iconClassName: string;
  svg?: string;
};

const Skill = (props: SkillProps) => {
  return (
    <div className={"skill-container"}>
      <div className="skill-icon">{getIconComponent(props)}</div>
      <span>{props.skillName}</span>
    </div>
  );
};

const getIconComponent = ({ iconClassName, svg }: SkillProps) => {
  if (svg) {
    return <SvgIcon svg={svg} />;
  }

  return <DevIcon className={`${iconClassName} icon`} />;
};

export default Skill;
