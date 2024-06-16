import "./Activities.scss";
import { activities } from "./AllActivities";
import React from "react";
import { BorderedTiltCard } from "@/src/components/common/tilt-card/bordered/BorderedTiltCard";

const Activities = () => {
  return (
    <div id="activities" className="max-container min-h-[calc(100vh-80px)]">
      <h1 className="head-text">
        My{" "}
        <span className=" blue-gradient_text font-semibold drop-shadow">
          Activities
        </span>
      </h1>

      <div className="activities-container mt-12">
        {activities.map((activity, index) => (
          <BorderedTiltCard
            key={activity.title}
            delayOffset={index}
            className="px-6 py-12 min-h-[400px]"
          >
            <h3 className="activity-title text-[24px]">{activity.title}</h3>
            <p className="activity-subtitle text-[20px]">{activity.subtitle}</p>
            <p className="activity-description text-[16px]">
              {activity.description}
            </p>
          </BorderedTiltCard>
        ))}
      </div>
    </div>
  );
};

export default Activities;
