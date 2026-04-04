import { getSocialMediaLink } from "@/src/app/links";
import React from "react";
import { SocialMediaPlatform } from "@/src/components/common/social-media-platform";

type SocialMediaLinkProps = {
  platform: SocialMediaPlatform;
  children: React.ReactNode;
};

const SocialMediaLink = ({ platform, children }: SocialMediaLinkProps) => {
  return (
    <a href={getSocialMediaLink(platform)} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

export default SocialMediaLink;
