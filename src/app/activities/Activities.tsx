import "./Activities.scss";
import {jobs} from './AllActivities';
import Activity from "./activity/Activity";
import React from "react";
import ThemeValueProps from "../common/ThemeValueProps";

const Activities = ({theme}: ThemeValueProps) => {
  return <div id={'activities'}>
    <div className="activities-header">Activities</div>
    <div className="activities-container">
      {jobs.map((activity, index) => <Activity theme={theme} activity={activity} key={`activity${index}`}/>
      )}
    </div>
  </div>;
}

export default Activities;
