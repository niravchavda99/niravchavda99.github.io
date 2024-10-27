"use client";

import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import "./tilt-card.scss";
import {fadeIn} from "@/src/components/common/tilt-card/fadeIn";

export interface TiltCardProps {
  children: ReactNode;
  delayOffset: number;
  className?: string;
}

export const TiltCard = ({ delayOffset, children }: TiltCardProps) => {
  return (
    <motion.div variants={fadeIn("up", "spring", delayOffset * 0.5, 0.75)}>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className="tilt-card-bg p-5 rounded-2xl sm:w-[360px] w-full h-[460px]"
      >
        {children}
      </Tilt>
    </motion.div>
  );
};
