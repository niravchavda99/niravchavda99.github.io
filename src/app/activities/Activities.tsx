import "./Activities.scss";
import {activities} from './AllActivities';
import React from "react";
import {BorderedTiltCard} from "../common/BorderedTiltCard";

const Activities = () => {
    return <div id={'activities'} className='max-container'>
        <h1 className='head-text'>
            My <span className=' blue-gradient_text font-semibold drop-shadow'>Activities</span>
        </h1>

        <div className="activities-container mt-12">
            {activities.map((activity, index) => (
                <BorderedTiltCard key={activity.title} delayOffset={index} className='px-6 py-12 min-h-[400px]'>
                    <h3 className={'text-white font-bold text-[24px]'}>{activity.title}</h3>
                    <p className={'text-white font-bold text-[20px]'}>{activity.subtitle}</p>
                    <p className={'mt-2 text-secondary text-[16px]'}>{activity.description}</p>
                </BorderedTiltCard>
            ))}
        </div>
    </div>;
}

export default Activities;
