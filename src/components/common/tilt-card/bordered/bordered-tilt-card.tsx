"use client";

import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { TiltCardProps } from "@/src/components/common/tilt-card/tilt-card";
import "./bordered-tilt-card.scss";
import {fadeIn} from "@/src/components/common/tilt-card/fadeIn";

export const BorderedTiltCard = ({
  delayOffset,
  children,
  className,
}: TiltCardProps) => {
  return (
    <Tilt
      className="sm:w-[360px] w-full"
      options={{ max: 45, scale: 1, speed: 450 }}
    >
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * delayOffset, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px]"
      >
        <div
          className={`bordered-tilt-card-bg rounded-[20px] min-h-[280px] flex justify-evenly items-center flex-col ${className}`}
        >
          {children}
        </div>
      </motion.div>
    </Tilt>
  );
};
