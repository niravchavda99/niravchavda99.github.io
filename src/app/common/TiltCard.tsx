import {fadeIn} from "../projects/constants";
import {Tilt} from "react-tilt";
import {motion} from "framer-motion";
import {ReactNode} from "react";

export interface TiltCardProps {
    children: ReactNode;
    delayOffset: number;
}

export const TiltCard = ({delayOffset, children}: TiltCardProps) => {
    return (
        <motion.div variants={fadeIn("up", "spring", delayOffset * 0.5, 0.75)}>
            <Tilt
                options={{max: 45, scale: 1, speed: 450}}
                className={'bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'}>
                {children}
            </Tilt>
        </motion.div>
    );
}