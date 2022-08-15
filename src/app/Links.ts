const socialMediaLinks: any = {
  'mail': 'mailto:nmchavda99@gmail.com',
  'github': 'https://www.github.com/niravchavda99',
  'linkedin': 'https://www.linkedin.com/in/niravchavda99',
  'twitter': 'https://www.twitter.com/niravchavda99',
  'instagram': 'https://www.instagram.com/niravchavda99'
}

export const getSocialMediaLink = (subject: string): string => {
  return socialMediaLinks[subject] || "/";
};