import {getSocialMediaLink} from "../Links";
import React from "react";

type SocialMediaLinkProps = { platform: string, children: React.ReactNode }

const SocialMediaLink = ({platform, children}: SocialMediaLinkProps) => {
    return <a href={getSocialMediaLink(platform)} target="_blank" rel="noreferrer" className='link-item'>
        {children}
    </a>;
}

export default SocialMediaLink;