import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Award,
} from "lucide-react";
import portrait from "@/src/assets/images/profile.jpg";
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
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" /> SOFTWARE CRAFTSPERSON AT INCUBYTE
          </div>
          <h1 id="hero-title">
            Software,
            <br />
            <span className="serif-word">thoughtfully</span>
            <br />
            crafted<span className="orange">.</span>
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
          <div className="hero-footnote">
            <span>+</span> CLEAN CODE. CLEAR THINKING. HUMAN EXPERIENCES.
          </div>
        </div>
        <CraftEngine />
        <div className="hero-bottom">
          <span>INDEPENDENT MIND. COLLABORATIVE SPIRIT.</span>
          <a href="#work">
            SCROLL TO EXPLORE <ArrowDown size={13} />
          </a>
        </div>
      </section>
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
              <div className="portrait-block">
                <div className="portrait-frame">
                  <Image
                    src={portrait}
                    alt="Nirav Chavda"
                    sizes="(max-width: 700px) 85vw, 34vw"
                  />
                  <span className="portrait-note">CURIOUS BY DEFAULT.</span>
                </div>
                <div className="portrait-caption">
                  <span>NIRAV CHAVDA</span>
                  <span>DEVELOPER / LEARNER / MAKER</span>
                </div>
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
                  I’m a software craftsperson at Incubyte, working remotely
                  across interfaces, backend systems, and mobile apps. I like
                  asking why, untangling complexity, and leaving code a little
                  better than I found it.
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
                    <li key={skill}>{skill}</li>
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
                {experience.map((job) => (
                  <article className="journey-item" key={job.role}>
                    <div className="item-meta">
                      <span>{job.period}</span>
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
                    <p>{job.description}</p>
                  </article>
                ))}
                <h3 className="list-heading education-heading">EDUCATION</h3>
                {education.map((item) => (
                  <article
                    className="journey-item education-item"
                    key={item.degree}
                  >
                    <div className="item-meta">
                      <span>{item.period}</span>
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
