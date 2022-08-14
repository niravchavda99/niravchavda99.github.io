import {getLink} from "../links";
import React from "react";

type SocialMediaLinkProps = { platform: string, children: React.ReactNode }

const SocialMediaLink = ({platform, children}: SocialMediaLinkProps) => {
  return <a href={getLink(platform)} target={"_blank"} className={'link-item'}>
    {children}
  </a>;
}

export default SocialMediaLink;