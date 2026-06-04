import profileImage from "@/src/assets/images/profile.jpg";
import { BsGithub, BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import SocialMediaLink from "@/src/components/common/social-media-link";
import Image from "next/image";
import { SocialMediaPlatform } from "../common/social-media-platform";
import { ScrollHint } from "../common/scroll-hint";

const SOCIAL_ICONS = [
  {
    platform: SocialMediaPlatform.Mail,
    icon: <IoMail size={18} />,
    label: "Email",
  },
  {
    platform: SocialMediaPlatform.Github,
    icon: <BsGithub size={17} />,
    label: "GitHub",
  },
  {
    platform: SocialMediaPlatform.Linkedin,
    icon: <BsLinkedin size={16} />,
    label: "LinkedIn",
  },
  {
    platform: SocialMediaPlatform.Instagram,
    icon: <BsInstagram size={16} />,
    label: "Instagram",
  },
  {
    platform: SocialMediaPlatform.X,
    icon: <BsTwitterX size={16} />,
    label: "X",
  },
];

// Internship completed July 2022, YOE counted from there
const CAREER_START = new Date(2022, 6, 1);

function calculateYOE(): string {
  const now = new Date();
  const months =
    (now.getFullYear() - CAREER_START.getFullYear()) * 12 +
    (now.getMonth() - CAREER_START.getMonth());
  return (months / 12).toFixed(1);
}

const About = () => {
  const yoe = calculateYOE();

  return (
    <section
      id="about"
      className="max-w-6xl mx-auto w-full px-6 sm:px-12 pt-24 pb-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr] gap-x-16 gap-y-8 items-start">
        {/* Name + subtitle: order 1 on mobile, col 1 row 1 on desktop */}
        <div className="order-1 lg:col-start-1 lg:row-start-1">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
            Nirav{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Chavda
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
            I build quality software with care and{" "}
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              craftsmanship
            </span>
            . Learner and enthusiast at heart.
          </p>
        </div>

        {/* Profile image: order 2 on mobile (above stats+code), spans 3 rows on desktop right column */}
        <div className="flex items-center justify-center order-2 lg:row-span-3 lg:col-start-2 lg:row-start-1 self-center">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-cyan-400/20 via-violet-400/10 to-cyan-400/20 blur-2xl animate-glow-pulse" />
            <div className="relative rounded-full p-[3px] bg-gradient-to-br from-cyan-400 via-violet-400 to-emerald-400">
              <div className="rounded-full overflow-hidden w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-white dark:bg-slate-900">
                <Image
                  src={profileImage.src}
                  alt="Nirav Chavda"
                  width={288}
                  height={288}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats: order 3 on mobile (below image), col 1 row 2 on desktop */}
        <div className="flex items-center justify-center lg:justify-start gap-3 order-3 lg:col-start-1 lg:row-start-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60">
            <span className="text-base">☕</span>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono leading-none">
                {yoe} yrs
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono leading-none mt-0.5">
                experience
              </p>
            </div>
          </div>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60">
            <span className="text-base">🏆</span>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">
                Gold Medallist
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono leading-none mt-0.5">
                MCA · Gujarat Univ.
              </p>
            </div>
          </div>
        </div>

        {/* Code block + social: order 4 on mobile, col 1 row 3 on desktop */}
        <div className="flex flex-col gap-8 order-4 lg:col-start-1 lg:row-start-3">
          {/* Code block */}
          <div className="font-mono text-sm bg-slate-900/90 dark:bg-slate-900/60 rounded-xl border border-slate-700/40 shadow-2xl shadow-slate-900/20 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/50 bg-slate-800/50">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
              <span className="ml-3 text-slate-500 text-xs">developer.ts</span>
            </div>
            <div className="p-5 space-y-1 leading-relaxed">
              <div>
                <span className="text-violet-400">const</span>
                <span className="text-slate-200"> developer </span>
                <span className="text-slate-400">= {"{"}</span>
              </div>
              <div className="ml-5">
                <span className="text-cyan-400">name</span>
                <span className="text-slate-400">: </span>
                <span className="text-amber-300">&quot;Nirav Chavda&quot;</span>
                <span className="text-slate-500">,</span>
              </div>
              <div className="ml-5">
                <span className="text-cyan-400">role</span>
                <span className="text-slate-400">: </span>
                <span className="text-amber-300">
                  &quot;Software Craftsperson&quot;
                </span>
                <span className="text-slate-500">,</span>
              </div>
              <div className="ml-5">
                <span className="text-cyan-400">focus</span>
                <span className="text-slate-400">: </span>
                <span className="text-emerald-400">
                  &quot;clean code &amp; craftsmanship&quot;
                </span>
                <span className="text-slate-500">,</span>
              </div>
              <div className="ml-5">
                <span className="text-cyan-400">location</span>
                <span className="text-slate-400">: </span>
                <span className="text-amber-300">&quot;Remote 🌍&quot;</span>
                <span className="text-slate-500">,</span>
              </div>
              <div className="ml-5">
                <span className="text-cyan-400">openTo</span>
                <span className="text-slate-400">: [</span>
                <span className="text-emerald-400">
                  &quot;open-source&quot;
                </span>
                <span className="text-slate-400">, </span>
                <span className="text-emerald-400">
                  &quot;collaboration&quot;
                </span>
                <span className="text-slate-400">],</span>
              </div>
              <div>
                <span className="text-slate-400">{"}"}</span>
                <span className="text-slate-500">;</span>
              </div>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center justify-center sm:justify-start gap-2">
            {SOCIAL_ICONS.map(({ platform, icon, label }) => (
              <SocialMediaLink key={platform} platform={platform}>
                <span
                  className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:border-cyan-400/50 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-400/5 transition-all duration-200"
                  title={label}
                >
                  {icon}
                </span>
              </SocialMediaLink>
            ))}
          </div>
        </div>
      </div>

      <ScrollHint />
    </section>
  );
};

export default About;
