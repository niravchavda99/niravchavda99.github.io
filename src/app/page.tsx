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
import {
  activities,
  education,
  experience,
  profile,
  skillGroups,
} from "@/src/content/portfolio";
import type { ReactNode } from "react";
import { projects } from "@/src/content/projects";
import { ContentIcon } from "@/src/components/studio/content-icon";
import { CareerDates } from "@/src/components/studio/career-dates";

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number}</span>
      {children}
    </div>
  );
}
export default function HomePage() {
  return (
    <main id="main">
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
      <section
        className="about-section"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="container">
          <Reveal>
            <SectionLabel number="02">
              THE PERSON BEHIND THE PIXELS
            </SectionLabel>
            <div className="about-grid">
              <div className="craft-principles">
                <span className="eyebrow">HOW I APPROACH THE WORK</span>
                <div>
                  <span>01</span>
                  <h3>Understand the person.</h3>
                  <p>Start with the problem and the people behind it.</p>
                </div>
                <div>
                  <span>02</span>
                  <h3>Untangle the complexity.</h3>
                  <p>Find a clear path through the moving parts.</p>
                </div>
                <div>
                  <span>03</span>
                  <h3>Build with care.</h3>
                  <p>Make it useful today and maintainable tomorrow.</p>
                </div>
                <Asterisk
                  className="principle-star"
                  size={74}
                  strokeWidth={1}
                />
              </div>
              <div className="about-copy">
                <h2 id="about-title">
                  Good software
                  <br />
                  starts with <span className="serif-word">care.</span>
                </h2>
                <p className="about-lead">
                  For the people using it.
                  <br />
                  For the people building it.
                  <br />
                  For whoever comes next.
                </p>
                <p>
                  I’m a Tech Lead at Incubyte and a software craftsperson at
                  heart, working remotely across interfaces, backend systems,
                  and mobile apps. I like asking why, untangling complexity, and
                  leaving code a little better than I found it.
                </p>
                <p>
                  Outside of work, that same curiosity becomes browser
                  extensions, creative experiments, and tools that make everyday
                  things easier.
                </p>
                <div className="about-signoff">
                  <span className="signature">Nirav.</span>
                  <span>ALWAYS A WORK IN PROGRESS ↗</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section
        className="section container"
        id="toolkit"
        aria-labelledby="toolkit-title"
      >
        <Reveal>
          <SectionLabel number="03">THE TOOLKIT</SectionLabel>
          <div className="section-heading">
            <h2 id="toolkit-title">
              Different tools.
              <br />
              Same <span className="serif-word">intention.</span>
            </h2>
            <p>
              The right technology for the problem.
              <br />
              The same attention to every layer.
            </p>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-group" key={group.number}>
                <span className="skill-number">/{group.number}</span>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul>
                  {group.skills.map((skill) => (
                    <li key={skill}>
                      <ContentIcon name={skill} />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>
      </section>
      <section
        className="journey-section"
        id="journey"
        aria-labelledby="journey-title"
      >
        <div className="container">
          <Reveal>
            <SectionLabel number="04">THE JOURNEY</SectionLabel>
            <div className="journey-grid">
              <div className="journey-intro">
                <h2 id="journey-title">
                  Keep learning.
                  <br />
                  Keep <span className="serif-word">making.</span>
                </h2>
                <p>
                  Every chapter adds a new way
                  <br />
                  to look at the next problem.
                </p>
                <Asterisk className="journey-star" size={110} strokeWidth={1} />
              </div>
              <div>
                <h3 className="list-heading">EXPERIENCE</h3>
                <div className="career-timeline">
                  {experience.map((job) => (
                    <article className="journey-item" key={job.role}>
                      <ContentIcon name={job.company} organization />
                      <div className="item-meta">
                        <CareerDates start={job.start} end={job.end} />
                        <span>{job.location ?? "Remote"}</span>
                      </div>
                      <h4>{job.role}</h4>
                      <a
                        className="company-link"
                        href={job.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {job.company}
                        <ArrowUpRight size={14} />
                      </a>
                      {job.description && <p>{job.description}</p>}
                    </article>
                  ))}
                </div>
                <h3 className="list-heading education-heading" id="education">
                  EDUCATION
                </h3>
                <div className="career-timeline">
                  {education.map((item) => (
                    <article
                      className="journey-item education-item"
                      key={item.degree}
                    >
                      <ContentIcon name={item.school} organization />
                      <div className="item-meta">
                        <CareerDates start={item.start} end={item.end} />
                        <span>{item.location}</span>
                      </div>
                      <h4>{item.degree}</h4>
                      <a
                        className="company-link"
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.school}
                        <ArrowUpRight size={14} />
                      </a>
                      <div className="distinction">
                        <Award size={16} />
                        {item.distinction}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
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
