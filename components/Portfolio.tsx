import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import HeaderClient from "@/components/HeaderClient";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import {
  experiences,
  profile,
  projects,
  qualifications,
  services,
  skillCategories,
} from "@/data/portfolio";

function Hero() {
  return (
    <section id="home" className="hero section">
      <div className="container hero-grid">
        <div className="hero-main">
          <p className="eyebrow">
            {profile.role} · {profile.location}
          </p>
          <h1>{profile.name}</h1>
          <p className="hero-headline">{profile.headline}</p>
          <p className="hero-copy">{profile.biography}</p>
          <ul className="hero-highlights" aria-label="Core capabilities">
            {profile.highlights.map((highlight) => (
              <li key={highlight}>
                <Check aria-hidden="true" />
                {highlight}
              </li>
            ))}
          </ul>
          <div className="button-row">
            <a className="button primary" href="#projects">
              View Projects <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="button secondary" href="#contact">
              Contact Me <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <div className="hero-secondary-row">
            <a className="text-link" href="/resume.pdf" download>
              Download CV (PDF) <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="text-link" href="/resume">
              View CV <ArrowUpRight aria-hidden="true" />
            </a>
            <div className="socials" aria-label="Professional profiles">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="Paul Napoleon Phiri on GitHub"
              >
                <Github />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="Paul Napoleon Phiri on LinkedIn"
              >
                <Linkedin />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email Paul Napoleon Phiri"
              >
                <Mail />
              </a>
            </div>
          </div>
        </div>
        <aside className="hero-visual" aria-label="Portrait and availability">
          <figure className="portrait-frame">
            <Image
              className="portrait-image"
              src="/images/paul-phiri.webp"
              alt="Paul Napoleon Phiri wearing a navy suit and glasses"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 34vw"
            />
          </figure>
          <div className="hero-status">
            <span className="status-dot" aria-hidden="true" />
            <div>
              <strong>{profile.availability}</strong>
              <span>{profile.location}</span>
            </div>
          </div>
        </aside>
        <a className="scroll-cue" href="#about">
          Scroll to explore <ArrowDown aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function SectionHead({
  label,
  title,
  copy,
}: {
  label?: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="section-head">
      {label && <p className="eyebrow">{label}</p>}
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead
          title="About me"
          copy="A developer who starts from the business problem and builds the software behind it."
        />
        <div className="about-body">
          {profile.aboutParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <SectionHead
          title="Technical expertise"
          copy="Technologies I use, grouped by the work they actually do."
        />
        <div className="capability-list">
          {skillCategories.map((group, index) => (
            <div key={group.id} className="capability-row">
              <span className="capability-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{group.title}</h3>
              <div className="capability-detail">
                <div className="tags">
                  {group.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
                <p className="capability-evidence">{group.evidence}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHead
          title="Work experience"
          copy="Roles where software delivery, operational care and communication meet."
        />
        <div className="timeline">
          {experiences.map((item) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-dot" aria-hidden="true" />
              <article className="glass-card experience-card">
                <div className="card-meta">
                  <span>{item.period}</span>
                  {item.current && (
                    <span className="current">Current role</span>
                  )}
                  {item.classification && (
                    <span className="current">{item.classification}</span>
                  )}
                </div>
                <h3>{item.title}</h3>
                <p className="company">
                  {item.company} · {item.location}
                </p>
                <ul>
                  {item.responsibilities.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Qualifications() {
  return (
    <section id="qualification" className="section section-alt">
      <div className="container">
        <SectionHead
          title="Education"
          copy="Academic grounding across technology, systems and business."
        />
        <div className="qualification-grid">
          {qualifications.map((item) => (
            <div key={item.id} className="glass-card qualification-card">
              <p className="card-meta">
                <span>{item.level}</span>
                <span>{item.period}</span>
              </p>
              <h3>{item.programme}</h3>
              <p className="company">{item.institution}</p>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead
          label="Selected systems"
          title="Project case studies"
          copy="The problems behind the work, the solutions delivered and the responsibilities I owned."
        />
        <div className="projects-grid">
          {projects.map((project, index) => (
            <article key={project.id} className="glass-card project-card">
              {project.image && project.imageAlt ? (
                <div
                  className={`project-image${project.imageContain ? " project-image-contain" : ""}`}
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div
                  className="project-image project-image-text"
                  aria-label={`${project.title} project preview`}
                >
                  <span>{project.title}</span>
                  <small>Project preview</small>
                </div>
              )}
              <div className="project-content">
                <span className="project-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{project.title}</h3>
                <dl className="project-details">
                  <div>
                    <dt>Ownership</dt>
                    <dd>{project.ownership}</dd>
                  </div>
                  {project.status && (
                    <div>
                      <dt>Status</dt>
                      <dd>{project.status}</dd>
                    </div>
                  )}
                </dl>
                <div className="case-study-block case-study-feature">
                  <h4>Problem</h4>
                  <p>{project.problem}</p>
                </div>
                <div className="case-study-grid">
                  <div className="case-study-block">
                    <h4>Solution</h4>
                    <p>{project.solution}</p>
                  </div>
                  <div className="case-study-block">
                    <h4>My contribution</h4>
                    <ul>
                      {project.contribution.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {project.engineering && (
                  <div className="case-study-block project-engineering">
                    <h4>Engineering decision</h4>
                    <p>{project.engineering}</p>
                  </div>
                )}
                <div className="tags">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
                {project.repositoryUrl ? (
                  <p className="repository-note">
                    <strong>Repository:</strong>{" "}
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View public source <ArrowUpRight aria-hidden="true" />
                    </a>
                  </p>
                ) : (
                  <p className="repository-note">
                    <strong>Repository:</strong> Private due to company/client
                    confidentiality.
                  </p>
                )}
                {(project.liveUrl ||
                  project.walkthroughUrl ||
                  project.caseStudyUrl) && (
                  <div className="project-links">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live project <ArrowUpRight aria-hidden="true" />
                      </a>
                    )}
                    {project.walkthroughUrl && (
                      <a
                        href={project.walkthroughUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Walkthrough <ArrowUpRight aria-hidden="true" />
                      </a>
                    )}
                    {project.caseStudyUrl && (
                      <a
                        href={project.caseStudyUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Case study <ArrowUpRight aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section section-alt">
      <div className="container">
        <SectionHead
          title="Services"
          copy="What I can take responsibility for, based on work I have already delivered."
        />
        <div className="services-grid">
          {services.map((service) => (
            <article key={service.id} className="glass-card service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul aria-label={`${service.title} covers`}>
                {service.delivers.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <a className="text-link" href="#contact">
                Discuss this service <ArrowUpRight aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <HeaderClient />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Qualifications />
        <Projects />
        <Services />
        <ContactForm />
      </main>
      <footer>
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} Paul Napoleon Phiri</p>
          <a
            className="back-to-top"
            href="#home"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp aria-hidden="true" />
          </a>
        </div>
      </footer>
    </>
  );
}
