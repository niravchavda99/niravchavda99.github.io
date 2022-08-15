import "./Skill.scss";
import DevIcon from "../../common/DevIcon";
import SvgIcon from "../../common/SvgIcon";

type SkillProps = {
  skillName: string,
  iconClassName: string,
  svg?: string
}

const Skill = (props: SkillProps) => {
  return (
      <div className={"skill-container"}>
        {getIconComponent(props)}
        <span className={'text-xl'}>{props.skillName}</span>
      </div>
  );
};

const getIconComponent = ({iconClassName, svg}: SkillProps) => {
  if (svg) {
    return <SvgIcon svg={svg}/>
  }

  return <DevIcon className={`${iconClassName} icon`}/>;
}

export default Skill;