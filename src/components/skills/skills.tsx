import "./skills.scss";
import { technologies } from "./constants";
import React from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/ui/ui/tooltip";

const Skills = () => {
  return (
    <div id="skills" className="max-container min-h-[calc(100vh-80px)]">
      <h1 className="head-text">
        My{" "}
        <span className=" blue-gradient_text font-semibold drop-shadow">
          Skills
        </span>
      </h1>
      <br />
      <div className="mt-10 flex flex-col">
        <div className="mt-16 flex flex-wrap gap-20 justify-center items-center">
          <TooltipProvider>
            {technologies.map((technology) => (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    key={technology.name}
                    className="block-container w-20 h-20"
                  >
                    <div className="btn-back rounded-xl" />
                    <div className="btn-front rounded-xl flex flex-col justify-center items-center">
                      <Image
                        src={technology.icon}
                        alt={technology.name}
                        width={60}
                        height={60}
                        className="w-2/3 h-2/3 object-contain skill-icon-light"
                      />
                      <Image
                        src={technology?.darkIcon ?? technology.icon}
                        alt={technology.name}
                        width={60}
                        height={60}
                        className="w-2/3 h-2/3 object-contain skill-icon-dark"
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="mb-3">
                  <p>{technology.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Skills;
