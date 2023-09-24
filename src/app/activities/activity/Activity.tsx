import './Activity.scss';
import ActivityDto from "./ActivityDto";
import Shiny from "../../common/shiny/Shiny";
import {GlassMorphic} from "../../common/glassmorphic/GlassMorphic";

type ActivityProps = {
  activity: ActivityDto
};

const Activity = ({activity}: ActivityProps) => {

  return (
      <div className={'activity-wrapper'}>
        <GlassMorphic fadeOpacity={50}>
          <Shiny size={200} color={"#7C3AED"} classNames="activity-container">
            <h5 className="activity-title">{activity.title}</h5>
            <p className="activity-subtitle">{activity.subtitle}</p>
            <br/>
            <p className="activity-description">{activity.description}</p>
          </Shiny>
        </GlassMorphic>
      </div>
  );
};

export default Activity;
