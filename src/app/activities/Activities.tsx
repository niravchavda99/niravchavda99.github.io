import "./Activities.scss";
import {activities} from './AllActivities';
import React from "react";
import {BorderedTiltCard} from "../common/BorderedTiltCard";

const Activities = () => {
    return <div id={'activities'} className='max-container'>
        <div className="activities-header">Activities</div>

        <div className="activities-container">
            {activities.map((activity, index) => (
                <BorderedTiltCard delayOffset={index} className='px-6 py-12'>
                    <h3 className={'text-white font-bold text-[24px]'}>{activity.title}</h3>
                    <p className={'text-white font-bold text-[20px]'}>{activity.subtitle}</p>
                    <p className={'mt-2 text-secondary text-[16px]'}>{activity.description}</p>
                </BorderedTiltCard>
            ))}
        </div>
    </div>;
}

export default Activities;
