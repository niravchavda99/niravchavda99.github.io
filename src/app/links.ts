import { SocialMediaPlatform } from "@/src/components/common/social-media-platform";

const socialMediaLinks: Record<SocialMediaPlatform, string> = {
  [SocialMediaPlatform.Mail]: "mailto:nmchavda99@gmail.com",
  [SocialMediaPlatform.Github]: "https://www.github.com/niravchavda99",
  [SocialMediaPlatform.Linkedin]: "https://www.linkedin.com/in/niravchavda99",
  [SocialMediaPlatform.X]: "https://www.x.com/niravchavda99",
  [SocialMediaPlatform.Instagram]: "https://www.instagram.com/niravchavda99",
};

export const getSocialMediaLink = (subject: SocialMediaPlatform): string => {
  return socialMediaLinks[subject] || "/";
};
