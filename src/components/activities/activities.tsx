import "./activities.scss";
import { activities } from "./all-activities";
import React from "react";
import { TiltCard } from "@/src/components/common/tilt-card/tilt-card";

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
          <TiltCard
            key={activity.title}
            delayOffset={index}
            variant="bordered"
            className="px-6 py-12 min-h-[400px]"
          >
            <h3 className="activity-title text-[24px]">{activity.title}</h3>
            <p className="activity-subtitle text-[20px]">{activity.subtitle}</p>
            <p className="activity-description text-[16px]">
              {activity.description}
            </p>
          </TiltCard>
        ))}
      </div>
    </div>
  );
};

export default Activities;
