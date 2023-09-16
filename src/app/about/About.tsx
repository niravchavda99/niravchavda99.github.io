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
    <div className="profile-image-wrapper">
      <div className="profile-image-container">
        <img src={profileImage} alt="Profile"
             className="profile-image"/>
      </div>
    </div>

    <div className={'about-name'}>Nirav Chavda</div>
    <div className={'about-short'}>I'm a Software Craftsperson, Learner and an Enthusiast</div>
    <div className={'links'}>
      <SocialMediaLink platform={'mail'}><TbMail size={iconSize+4}/></SocialMediaLink>
      <SocialMediaLink platform={'github'}><BsGithub size={iconSize}/></SocialMediaLink>
      <SocialMediaLink platform={'linkedin'}><BsLinkedin size={iconSize-2}/></SocialMediaLink>
      <SocialMediaLink platform={'twitter'}><BsTwitter size={iconSize}/></SocialMediaLink>
      <SocialMediaLink platform={'instagram'}><BsInstagram size={iconSize-2}/></SocialMediaLink>
    </div>
  </div>;
}

export default About;