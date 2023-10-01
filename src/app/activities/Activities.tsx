import "./Activities.scss";
import {jobs} from './AllActivities';
import Activity from "./activity/Activity";
import React from "react";

const Activities = () => {
  return <div id={'activities'}>
    <div className="activities-header">Activities</div>

    <div className="flex justify-center">
      <a href="https://app.daily.dev/niravchavda99"><img
          src="https://api.daily.dev/devcards/1e425277bd434101a24d2e9fcb45e7fe.png?r=xof"
          width="400"
          alt="Nirav Chavda's Dev Card"/></a>
    </div>

    <div className="activities-container">
      {jobs.map((activity, index) => <Activity activity={activity}
                                               key={`activity-${activity.title}`}/>
      )}
    </div>
  </div>;
}

export default Activities;
