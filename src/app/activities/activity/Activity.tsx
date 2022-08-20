import './Activity.scss';
import ActivityDto from "./ActivityDto";

type ActivityProps = {
  activity: ActivityDto
}

const Activity = ({activity}: ActivityProps) => {

  return (
      <div className={'activity-wrapper'}>
        <div className="activity-container">
          <h5 className="activity-title">{activity.title}</h5>
          <p className="activity-subtitle">{activity.subtitle}</p>
          <br/>
          <p className="activity-description">{activity.description}</p>
        </div>
      </div>
  );
};

export default Activity;