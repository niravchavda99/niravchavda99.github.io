import profileImage from "../../assets/images/profile.jpg";
import "./About.scss";
import { TbMail } from "react-icons/tb";
import { BsGithub, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import SocialMediaLink from "../common/SocialMediaLink";
import Image from "next/image";

const About = () => {
  const iconSize = 28;
  return (
    <section id="about" className="max-container min-h-[calc(100vh-80px)]">
      <div className="profile-image-wrapper">
        <div className="profile-image-container">
          <Image
            src={profileImage.src}
            alt="Profile"
            className="profile-image"
            width={1000}
            height={1000}
          />
        </div>
      </div>

      <div className="about-name">Nirav Chavda</div>
      <div className="about-short">
        I'm a Software Craftsperson, Learner and an Enthusiast
      </div>
      <div className="links">
        <SocialMediaLink platform="mail">
          <TbMail size={iconSize + 4} />
        </SocialMediaLink>
        <SocialMediaLink platform="github">
          <BsGithub size={iconSize} />
        </SocialMediaLink>
        <SocialMediaLink platform="linkedin">
          <BsLinkedin size={iconSize - 2} />
        </SocialMediaLink>
        <SocialMediaLink platform="twitter">
          <BsTwitter size={iconSize} />
        </SocialMediaLink>
        <SocialMediaLink platform="instagram">
          <BsInstagram size={iconSize - 2} />
        </SocialMediaLink>
      </div>
    </section>
  );
};

export default About;
