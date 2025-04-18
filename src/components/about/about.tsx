import profileImage from "@/src/assets/images/profile.jpg";
import { BsGithub, BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";
import SocialMediaLink from "@/src/components/common/social-media-link";
import Image from "next/image";
import { SectionContainer } from "@/src/components/common/section-container";
import { SocialMediaPlatform } from "../common/social-media-platform";
import { IoMail } from "react-icons/io5";

const About = () => {
  const iconSize = 28;
  return (
    <SectionContainer
      id="about"
      className="h-max p-8 flex flex-col justify-center min-h-screen"
    >
      <div className="flex flex-wrap justify-center -mt-16">
        <div className="w-full md:w-3/5 px-4">
          <Image
            src={profileImage.src}
            alt="Profile"
            className="shadow-xl rounded-2xl max-w-full h-auto align-middle border-none shadow-slate-700/50"
            width={1000}
            height={1000}
          />
        </div>
      </div>
      <div className="text-4xl p-2 mt-12 text-slate-200 blue-gradient-text font-semibold">
        Nirav Chavda
      </div>
      <div className="p-1 text-xl text-slate-700 dark:text-slate-300">
        I'm a Software Craftsperson, Learner and an Enthusiast
      </div>
      <div className="mt-2 p-1 flex flex-row justify-center">
        <SocialMediaLink platform={SocialMediaPlatform.Mail}>
          <IoMail size={iconSize + 4} />
        </SocialMediaLink>
        <SocialMediaLink platform={SocialMediaPlatform.Github}>
          <BsGithub size={iconSize} />
        </SocialMediaLink>
        <SocialMediaLink platform={SocialMediaPlatform.Linkedin}>
          <BsLinkedin size={iconSize - 2} />
        </SocialMediaLink>
        <SocialMediaLink platform={SocialMediaPlatform.X}>
          <BsTwitterX size={iconSize - 2} />
        </SocialMediaLink>
        <SocialMediaLink platform={SocialMediaPlatform.Instagram}>
          <BsInstagram size={iconSize - 2} />
        </SocialMediaLink>
      </div>
    </SectionContainer>
  );
};

export default About;
