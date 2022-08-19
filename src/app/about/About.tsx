import profileImage from '../assets/images/profile.jpg';
import "./About.scss";
import {TbMail} from "react-icons/tb";
import {BsGithub, BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs";
import {FaBlogger} from "react-icons/fa";
import SocialMediaLink from "../common/SocialMediaLink";
import {Link} from "react-router-dom";

const About = () => {
  const iconSize = 28;

  return <div id={'about'}>
    <div className="flex flex-wrap justify-center">
      <div className="w-6/12 sm:w-1/4 px-4">
        <img src={profileImage} alt="Profile Image"
             className="shadow rounded-full max-w-full h-auto align-middle border-none"/>
      </div>
    </div>

    <div className={'about-name'}>Nirav Chavda</div>
    <div className={'career'}>I'm a Software Craftsperson, Learner and an Enthusiast</div>
    <div className={'links'}>
      <SocialMediaLink platform={'mail'}><TbMail size={iconSize}/></SocialMediaLink>
      <SocialMediaLink platform={'github'}><BsGithub size={iconSize}/></SocialMediaLink>
      <SocialMediaLink platform={'linkedin'}><BsLinkedin size={iconSize}/></SocialMediaLink>
      <SocialMediaLink platform={'twitter'}><BsTwitter size={iconSize}/></SocialMediaLink>
      <SocialMediaLink platform={'instagram'}><BsInstagram size={iconSize}/></SocialMediaLink>
      <Link className={'link-item'} to={"/blog"}>
        <FaBlogger size={iconSize}/>
      </Link>
    </div>
  </div>;
}

export default About;