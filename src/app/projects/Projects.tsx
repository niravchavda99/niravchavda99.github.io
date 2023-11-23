import Header from "../header/Header";
import {projects, ProjectTag} from "./constants";
import {Link} from "react-router-dom";
import {FaArrowRight, FaGithub} from "react-icons/fa6";
import {TiltCard} from "../common/TiltCard";

export const Projects = () => {
    return (
        <>
            <Header/>
            <section className='max-container text-left '>
                <h1 className='head-text'>My <span
                    className=' blue-gradient_text font-semibold drop-shadow'>Projects</span></h1>
                <div className='mt-5 flex flex-col gap-3 text-slate-200'>
                    <p>I've embarked on numerous projects throughout the years, but these are the ones I hold closest to
                        my
                        heart. Many of them are open-source, so if you come across something that piques your interest,
                        feel
                        free to explore the codebase and contribute your ideas for further enhancements. Your
                        collaboration
                        is highly valued!
                    </p>
                </div>
                <div className='flex flex-wrap my-20 gap-16'>
                    {projects.map((project, index) => (
                        <TiltCard key={project.name} delayOffset={index}>
                            <div className={'relative w-full h-[230px]'}>
                                <img src={project.image} alt={project.name}
                                     className={'w-full h-full object-cover rounded-2xl'}/>

                                <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
                                    <div
                                        className={"black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"}
                                        onClick={() => window.open(project.codeLink, "_blank")}>
                                        <FaGithub className='w-2/3 h-2/3 object-contain text-white'/>
                                    </div>
                                </div>
                            </div>

                            <div className={'mt-5 text-left'}>
                                <h3 className={'text-white font-bold text-[24px]'}>{project.name}</h3>
                                <p className={'mt-2 text-secondary text-[14px]'}>{project.description}</p>
                            </div>

                            <div className={'mt-4 flex flex-wrap gap-2'}>
                                {project.tags.map((tag: ProjectTag) =>
                                    <p key={tag.name}
                                       className={`text-[14px] ${tag.color}`}>#{tag.name}</p>
                                )}
                            </div>

                            <div className='mt-5 text-blue-600'>
                                <Link
                                    to={project.link}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='flex items-center gap-2 font-semibold'>
                                    Live Link
                                    <FaArrowRight className='w-4 h-4 object-contain'/>
                                </Link>
                            </div>
                        </TiltCard>
                    ))}
                </div>
            </section>
        </>
    );
}