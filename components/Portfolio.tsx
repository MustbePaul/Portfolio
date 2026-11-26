import Image from "next/image";
import ContactSection from "@/components/ContactSection";
import Link from "next/link";
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
  developmentJourney,
  experiences,
  profile,
  qualifications,
  services,
  skillCategories,
} from "@/data/portfolio";
import { caseStudies } from "@/data/caseStudies";

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
            <Link className="button primary" href="/projects">
              Explore Projects <ArrowUpRight aria-hidden="true" />
            </Link>
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
            <a
              className="text-link"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              View GitHub <ArrowUpRight aria-hidden="true" />
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
        <div className="journey">
          <h3>Development journey</h3>
          <ol>
            {developmentJourney.map((milestone) => (
              <li key={milestone.year}>
                <strong>{milestone.year}</strong>
                <span>{milestone.detail}</span>
              </li>
            ))}
          </ol>
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
          title="Work with context"
          copy="A selection of web, mobile and business systems, with my role and the release state stated plainly."
        />
        <div className="featured-project-list">
          {caseStudies
            .filter((project) => project.featured)
            .map((project, index) => (
              <article key={project.slug} className="featured-project">
                <span className="project-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="eyebrow">
                    {project.relationship} · {project.status}
                  </p>
                  <h3>
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <p>{project.summary}</p>
                  <div className="tags">
                    {project.stack.slice(0, 4).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
                <Link
                  className="text-link"
                  href={`/projects/${project.slug}`}
                  aria-label={`Read ${project.title} case study`}
                >
                  Case study <ArrowUpRight aria-hidden="true" />
                </Link>
              </article>
            ))}
        </div>
        <Link className="button secondary" href="/projects">
          Browse all projects <ArrowUpRight aria-hidden="true" />
        </Link>
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
        <ContactSection />
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
