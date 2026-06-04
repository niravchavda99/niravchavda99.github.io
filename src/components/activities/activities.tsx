import { activities } from "./all-activities";
import React from "react";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";

const Activities = () => {
  return (
    <SectionContainer id="activities">
      <HeadingText coloredText="Activities" />
      <p className="mt-4 mb-14 text-slate-500 dark:text-slate-400 text-base max-w-xl">
        Contributions and experiences beyond day-to-day engineering work.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map((activity, index) => (
          <div
            key={activity.title}
            className="relative group rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm p-7 hover:border-cyan-400/30 dark:hover:border-cyan-400/20 hover:shadow-xl hover:shadow-cyan-400/5 transition-all duration-300 overflow-hidden"
          >
            {/* Top gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Background number watermark: text-slate-200 is visible in light mode without being distracting */}
            <div className="absolute bottom-4 right-5 font-mono text-8xl font-bold text-slate-200 dark:text-slate-800 select-none group-hover:text-slate-300 dark:group-hover:text-slate-700 transition-colors duration-300">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Badge */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-400/20 border border-cyan-400/30 dark:border-cyan-400/20 flex items-center justify-center mb-5">
              <span className="font-mono text-cyan-500 dark:text-cyan-400 font-bold text-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-1.5 relative z-10">
              {activity.title}
            </h3>
            <p className="text-cyan-600 dark:text-cyan-400 text-sm font-medium font-mono mb-4 relative z-10">
              {activity.subtitle}
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed relative z-10">
              {activity.description}
            </p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Activities;
