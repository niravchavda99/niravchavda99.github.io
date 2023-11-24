import './Skills.scss';
import {technologies} from "./constants";
import React from "react";

const Skills = () => {
    return (
        <div id={'skills'} className='max-container min-h-[calc(100vh-80px)]'>
            <h1 className='head-text'>
                My <span className=' blue-gradient_text font-semibold drop-shadow'>Skills</span>
            </h1>
            <br/>
            <div className='mt-10 flex flex-col'>
                <div className='mt-16 flex flex-wrap gap-20 justify-center items-center'>
                    {technologies.map(technology => (
                        <div key={technology.name} className='block-container w-20 h-20'>
                            <div className='btn-back rounded-xl'/>
                            <div className='btn-front rounded-xl flex justify-center items-center'>
                                <img src={technology.icon} alt={technology.name}
                                     className='w-2/3 h-2/3 object-contain skill-icon-light'/>
                                <img src={technology?.darkIcon ?? technology.icon} alt={technology.name}
                                     className='w-2/3 h-2/3 object-contain skill-icon-dark'/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Skills;