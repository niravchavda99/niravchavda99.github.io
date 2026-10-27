import { SectionLabel } from "@/src/components/studio/section-label";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Award,
} from "lucide-react";
import { CraftEngine } from "@/src/components/studio/craft-engine";
import { ProjectGallery } from "@/src/components/studio/project-gallery";
import { Reveal } from "@/src/components/studio/reveal";
import { activities, profile } from "@/src/content/portfolio";
import { projects } from "@/src/content/projects";
import {
  AboutSection,
  ToolkitSection,
  JourneySection,
} from "@/src/components/studio/portfolio-sections";

export default function HomePage() {
  return (
    <main id="main" tabIndex={-1}>
      <section className="hero world-hero" aria-labelledby="hero-title">
        <CraftEngine />
        <div className="hero-copy">
          <div className="hero-identity">
            <div>
              <strong>{profile.name}</strong>
              <span>
                <i className="status-dot" /> {profile.role} at {profile.company}
              </span>
            </div>
          </div>
          <h1 id="hero-title">
            Software,
            <br />
            <span className="serif-word">thoughtfully</span>
            <br />
            crafted<span className="accent">.</span>
          </h1>
          <p>
            I’m Nirav. I turn complex problems into useful,
            <br className="desktop-break" /> considered software. A little
            curiosity. A lot of care.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">
              Explore my work <ArrowDown size={17} />
            </a>
            <a className="text-link" href={`mailto:${profile.email}`}>
              Say hello <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="hero-socials" aria-label="Social profiles">
            {profile.socials.slice(0, 2).map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
                <ArrowUpRight size={15} />
              </a>
            ))}
            <a href="#education">
              <Award size={16} /> MCA gold medallist
            </a>
          </div>
        </div>
        <div className="hero-bottom">
          <span>INDEPENDENT MIND. COLLABORATIVE SPIRIT.</span>
          <a href="#work">
            SCROLL TO EXPLORE <ArrowDown size={13} />
          </a>
        </div>
      </section>
      <nav className="quick-navigation" aria-label="Section shortcuts">
        <div className="container">
          <span>EXPLORE THE WORLD</span>
          <a href="#about">About me</a>
          <a href="#toolkit">Skills</a>
          <a href="#journey">Experience</a>
          <a href="#education">Education</a>
          <a href="#work">
            Projects <span>{projects.length}</span>
          </a>
          <a href="#contact">
            Contact <ArrowUpRight size={14} />
          </a>
        </div>
      </nav>
      <div
        className="craft-ribbon"
        aria-label="Thoughtful interfaces, dependable systems, useful little things"
      >
        <div>
          {[0, 1].map((copy) => (
            <span className="ribbon-set" key={copy} aria-hidden={copy === 1}>
              THOUGHTFUL INTERFACES <Asterisk /> DEPENDABLE SYSTEMS <Asterisk />{" "}
              USEFUL LITTLE THINGS <Asterisk />
            </span>
          ))}
        </div>
      </div>
      <section
        className="section container"
        id="work"
        aria-labelledby="work-title"
      >
        <Reveal>
          <SectionLabel number="01">SELECTED WORK</SectionLabel>
          <div className="section-heading">
            <h2 id="work-title">
              Small details.
              <br />
              Real-world <span className="serif-word">difference.</span>
            </h2>
            <div>
              <p>
                Tools I wished existed.
                <br />
                Ideas I couldn’t leave alone.
              </p>
              <Link className="text-link" href="/projects/">
                The whole collection <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </Reveal>
        <ProjectGallery featured />
        <div className="work-bottom">
          <span>A FEW IDEAS THAT MADE IT OUT OF THE NOTEBOOK.</span>
          <Link href="/projects/" className="button button-outline">
            All {projects.length} projects <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <AboutSection />
      <ToolkitSection />
      <JourneySection />
      <section className="section container" aria-labelledby="activities-title">
        <Reveal>
          <SectionLabel number="05">BEYOND THE DAY JOB</SectionLabel>
          <div className="section-heading">
            <h2 id="activities-title">
              Knowledge grows
              <br />
              when it’s <span className="serif-word">shared.</span>
            </h2>
          </div>
          <div className="activities-grid">
            {activities.map((activity, i) => (
              <article key={activity.title} className="activity-card">
                <span className="activity-index">
                  0{i + 1} <ArrowUpRight size={20} />
                </span>
                <span className="eyebrow">{activity.label}</span>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>
      <section
        className="contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="container">
          <div className="contact-top">
            <span className="eyebrow">
              GOOD THINGS START WITH A CONVERSATION
            </span>
            <Asterisk size={42} />
          </div>
          <h2 id="contact-title">
            Have something
            <br />
            in <span className="serif-word">mind?</span>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Start a conversation by email"
            >
              <ArrowUpRight />
            </a>
          </h2>
          <div className="contact-bottom">
            <a href={`mailto:${profile.email}`}>
              {profile.email}
              <ArrowUpRight size={19} />
            </a>
            <span>A PROJECT. AN IDEA. OR JUST HELLO.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
