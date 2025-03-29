import { activities } from "./all-activities";
import React from "react";
import { TiltCard } from "@/src/components/common/tilt-card/tilt-card";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";

const Activities = () => {
  return (
    <SectionContainer id="activities" className='h-max p-8 md:py-16 lg:py-24 select-none min-h-screen'>
      <HeadingText precedingText="My" coloredText="Activities" />
      <div className="flex flex-wrap gap-12 justify-center mt-12">
        {activities.map((activity, index) => (
          <TiltCard
            key={activity.title}
            delayOffset={index}
            variant="bordered"
            className="px-6 py-12 min-h-[400px]"
          >
            <h3 className="text-slate-700 dark:text-white font-bold text-[24px]">{activity.title}</h3>
            <p className="text-slate-700 dark:text-white font-bold text-[20px]">{activity.subtitle}</p>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-[16px]">
              {activity.description}
            </p>
          </TiltCard>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Activities;
