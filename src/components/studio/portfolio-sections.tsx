import { SectionLabel } from "@/src/components/studio/section-label";
import { ArrowUpRight, Award, Gem, ScanEye, Workflow } from "lucide-react";
import {
  education,
  experience,
  profile,
  skillGroups,
} from "@/src/content/portfolio";
import { ContentIcon } from "./content-icon";
import { CareerDates } from "./career-dates";
import { Reveal } from "./reveal";

const principles = [
  {
    title: "Understand the person.",
    description: "Start with the problem and the people behind it.",
    icon: ScanEye,
  },
  {
    title: "Untangle the complexity.",
    description: "Find a clear path through the moving parts.",
    icon: Workflow,
  },
  {
    title: "Build with care.",
    description: "Make it useful today and maintainable tomorrow.",
    icon: Gem,
  },
];

export function AboutSection() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="container">
        <Reveal>
          <SectionLabel number="02">THE PERSON BEHIND THE PIXELS</SectionLabel>
          <div className="person-layout">
            <div className="person-intro">
              <h2 id="about-title">
                A curious mind.
                <br />A craftsperson’s{" "}
                <span className="serif-word">heart.</span>
              </h2>
              <div className="person-signature">
                <span>Nirav.</span>
                <span>THOUGHTFUL BY NATURE.</span>
              </div>
            </div>
            <div className="person-story">
              <p className="person-lead">
                I care about how software feels.
                <br />
                And how it’s made.
              </p>
              <p>
                I’m a {profile.role} at {profile.company}, working remotely
                across interfaces, backend systems, and mobile apps. I like
                asking why, untangling complexity, and leaving code a little
                better than I found it.
              </p>
              <p>
                Outside of work, that same curiosity becomes browser extensions,
                creative experiments, and tools that make everyday things
                easier.
              </p>
              <a className="person-note" href="#education">
                <Award size={19} />
                <span>
                  MCA gold medallist<span>Still learning. Always making.</span>
                </span>
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="principles-grid" aria-label="How I approach the work">
            {principles.map(({ title, description, icon: Icon }, index) => (
              <article className="principle" key={title}>
                <div className="principle-top">
                  <Icon size={25} strokeWidth={1.4} />
                  <span>0{index + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ToolkitSection() {
  const count = skillGroups.reduce(
    (total, group) => total + group.skills.length,
    0,
  );
  return (
    <section
      className="section container toolkit-section"
      id="toolkit"
      aria-labelledby="toolkit-title"
    >
      <Reveal>
        <SectionLabel number="03">THE TOOLKIT</SectionLabel>
        <div className="toolkit-layout">
          <div className="toolkit-intro">
            <h2 id="toolkit-title">
              From interface
              <br />
              to <span className="serif-word">infrastructure.</span>
            </h2>
            <p>
              The right technology for the problem.
              <br />
              Care at every layer.
            </p>
            <div className="toolkit-summary">
              <span>{String(count).padStart(2, "0")}</span>
              <span>
                TECHNOLOGIES
                <br />
                ONE CONNECTED PRACTICE
              </span>
            </div>
          </div>
          <div className="toolkit-groups">
            {skillGroups.map((group) => (
              <article className="skill-group" key={group.number}>
                <div className="skill-group-heading">
                  <span className="skill-number">{group.number}</span>
                  <div>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                  </div>
                  <span className="skill-count">
                    {group.skills.length} tools
                  </span>
                </div>
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
        </div>
      </Reveal>
    </section>
  );
}

export function JourneySection() {
  return (
    <section
      className="journey-section"
      id="journey"
      aria-labelledby="journey-title"
    >
      <div className="container">
        <Reveal>
          <SectionLabel number="04">THE JOURNEY</SectionLabel>
          <div className="section-heading journey-heading">
            <h2 id="journey-title">
              Built on experience.
              <br />
              Driven by <span className="serif-word">curiosity.</span>
            </h2>
            <p>
              Every chapter adds a new way
              <br />
              to look at the next problem.
            </p>
          </div>
          <div className="career-section-heading">
            <h3>Experience</h3>
            <span>THE WORK SO FAR</span>
          </div>
          <div className="career-timeline">
            {experience.map((job) => (
              <article
                className={`journey-item${!job.end ? " is-current" : ""}`}
                key={`${job.company}-${job.role}`}
              >
                <div className="item-meta">
                  <span className="career-year">{job.start.slice(0, 4)}</span>
                  <CareerDates start={job.start} end={job.end} />
                </div>
                <div className="career-entry">
                  <div className="career-entry-heading">
                    <ContentIcon name={job.company} organization />
                    <div>
                      <a
                        className="company-link"
                        href={job.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {job.company}
                        <ArrowUpRight size={14} />
                      </a>
                      <h4>{job.role}</h4>
                    </div>
                    {!job.end && (
                      <span className="current-role">
                        <i className="status-dot" />
                        CURRENT
                      </span>
                    )}
                  </div>
                  {job.description && <p>{job.description}</p>}
                  <span className="career-location">
                    {job.location ?? "Remote"}
                  </span>
                </div>
              </article>
            ))}
          </div>
          <div
            className="career-section-heading education-heading"
            id="education"
          >
            <h3>Education</h3>
            <span>THE FOUNDATIONS</span>
          </div>
          <div className="education-grid">
            {education.map((item) => (
              <article className="education-item" key={item.degree}>
                <div className="education-top">
                  <ContentIcon name={item.school} organization />
                  <CareerDates start={item.start} end={item.end} />
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
                <span className="career-location">{item.location}</span>
                <div className="distinction">
                  <Award size={17} />
                  {item.distinction}
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
