import {fadeIn} from "../projects/constants";
import {Tilt} from "react-tilt";
import {motion} from "framer-motion";
import {TiltCardProps} from "./TiltCard";

export const BorderedTiltCard = ({delayOffset, children, className}: TiltCardProps) => {
    return (
        <Tilt className={'sm:w-[360px] w-full'} options={{max: 45, scale: 1, speed: 450}}>
            <motion.div
                variants={fadeIn("right", "spring", 0.5 * delayOffset, 0.75)}
                className={'w-full green-pink-gradient p-[1px] rounded-[20px]'}
            >
                <div
                    className={`bg-tertiary rounded-[20px] min-h-[280px] flex justify-evenly items-center flex-col ${className}`}>
                    {children}
                </div>
            </motion.div>
        </Tilt>
    );
}