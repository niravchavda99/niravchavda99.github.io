"use client";

import { activities } from "@/src/data/activities";
import React from "react";
import { motion } from "framer-motion";
import { SectionContainer } from "@/src/components/common/section-container";
import { HeadingText } from "@/src/components/common/heading-text";
import { Tilt3DCard } from "@/src/components/motion/tilt-3d-card";

const Activities = () => {
  return (
    <SectionContainer id="activities">
      <HeadingText
        index="04"
        eyebrow="Beyond Engineering"
        coloredText="Labs, writing &"
        italicAccent="mentorship"
        subtitle="Engineering publications, open education labs, and student mentorship experiences beyond day-to-day product delivery."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="h-full"
          >
            <Tilt3DCard
              maxTilt={9}
              glareOpacity={0.18}
              className="relative h-full rounded-2xl border border-border/90 bg-card/80 backdrop-blur-xl p-6 sm:p-8 overflow-hidden shadow-xl shadow-black/5 dark:shadow-black/35 flex flex-col justify-between gap-6"
            >
              {/* Subtle orbital ring decoration */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -bottom-12 w-44 h-44 rounded-full border border-primary/15"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -bottom-6 w-28 h-28 rounded-full border border-accent/20"
              />

              <div className="relative z-10 translate-z-10">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-primary/30 bg-primary/10 font-mono text-[11px] text-primary font-medium truncate">
                    {activity.subtitle}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-foreground mb-3">
                  {activity.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </Tilt3DCard>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Activities;
