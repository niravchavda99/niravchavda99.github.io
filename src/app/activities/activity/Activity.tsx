import './Activity.scss';
import ActivityDto from "./ActivityDto";
import Shiny from "../../common/shiny/Shiny";
import ThemeValueProps from "../../common/ThemeValueProps";

type ActivityProps = {
  activity: ActivityDto
} & ThemeValueProps;

const Activity = ({activity, theme}: ActivityProps) => {

  return (
      <div className={'activity-wrapper'}>
        <Shiny size={150} color={"#7C3AED"} theme={theme} classNames="activity-container">
          <h5 className="activity-title">{activity.title}</h5>
          <p className="activity-subtitle">{activity.subtitle}</p>
          <br/>
          <p className="activity-description">{activity.description}</p>
        </Shiny>
      </div>
  );
};

export default Activity;
