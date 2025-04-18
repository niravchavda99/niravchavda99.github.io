import { getSocialMediaLink } from "@/src/app/links";
import React from "react";
import { SocialMediaPlatform } from "@/src/components/common/social-media-platform";

type SocialMediaLinkProps = {
  platform: SocialMediaPlatform;
  children: React.ReactNode;
};

const SocialMediaLink = ({ platform, children }: SocialMediaLinkProps) => {
  return (
    <a
      href={getSocialMediaLink(platform)}
      target="_blank"
      rel="noreferrer"
      className="px-2 hover:scale-150 transition ease-in-out dark:text-slate-200 text-slate-700"
    >
      {children}
    </a>
  );
};

export default SocialMediaLink;
