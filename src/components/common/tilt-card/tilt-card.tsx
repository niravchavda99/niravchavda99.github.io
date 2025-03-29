"use client";

import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeIn } from "@/src/components/common/tilt-card/fadeIn";

type TiltCardVariant = "normal" | "bordered";

export interface TiltCardProps {
  children: ReactNode;
  delayOffset: number;
  className?: string;
  variant?: TiltCardVariant;
}

const tiltOptions = { max: 45, scale: 1, speed: 450 };

// TODO: Have normal and bordered variant here
export const TiltCard = ({
  delayOffset,
  children,
  variant = "normal",
  className,
}: TiltCardProps) => {
  switch (variant) {
    case "normal":
      return (
        <motion.div variants={fadeIn("up", "spring", delayOffset * 0.5, 0.75)}>
          <Tilt
            options={tiltOptions}
            className="bg-blue-100 dark:bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full h-[460px]"
          >
            {children}
          </Tilt>
        </motion.div>
      );
    case "bordered":
      return (
        <Tilt className="sm:w-[360px] w-full" options={tiltOptions}>
          <motion.div
            variants={fadeIn("right", "spring", 0.5 * delayOffset, 0.75)}
            className="w-full green-pink-gradient p-[1px] rounded-[20px]"
          >
            <div
              className={`bg-blue-50 dark:bg-tertiary rounded-[20px] min-h-[280px] flex justify-evenly items-center flex-col ${className}`}
            >
              {children}
            </div>
          </motion.div>
        </Tilt>
      );
  }
};
