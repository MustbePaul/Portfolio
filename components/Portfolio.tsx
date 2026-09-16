import Image from "next/image";
import { createElement } from "react";
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
  engagementOptions,
  experiences,
  profile,
  projects,
  qualifications,
  skillCategories,
} from "@/data/portfolio";

type MotionlessProps<T extends keyof React.JSX.IntrinsicElements> =
  React.JSX.IntrinsicElements[T] & {
    variants?: unknown;
    initial?: unknown;
    animate?: unknown;
    exit?: unknown;
    transition?: unknown;
    whileHover?: unknown;
  };

function motionless<T extends keyof React.JSX.IntrinsicElements>(Tag: T) {
  return function Motionless({
    variants,
    initial,
    animate,
    exit,
    transition,
    whileHover,
    ...props
  }: MotionlessProps<T>) {
    void variants;
    void initial;
    void animate;
    void exit;
    void transition;
    void whileHover;
    return createElement(Tag, props);
  };
}

const m = {
  a: motionless("a"),
  aside: motionless("aside"),
  div: motionless("div"),
  figure: motionless("figure"),
  h1: motionless("h1"),
  nav: motionless("nav"),
  p: motionless("p"),
  strong: motionless("strong"),
  ul: motionless("ul"),
};

function AnimatePresence({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode?: string;
}) {
  void mode;
  return <>{children}</>;
}

function LazyMotion({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

function Header() {
  return <HeaderClient />;
}

function Hero() {
  const role = 0;
  const parent = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0, delayChildren: 0 },
    },
  };
  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };
  return (
    <section id="home" className="hero section">
      <m.div
        className="container hero-grid"
        variants={parent}
        initial={false}
        animate="visible"
      >
        <div className="hero-main">
          <m.p variants={child} className="eyebrow">
            Hello, I&apos;m
          </m.p>
          <m.h1 variants={child}>{profile.name}</m.h1>
          <m.div
            variants={child}
            className="role-line"
            aria-live="polite"
            tabIndex={0}
            aria-label={profile.roles[role]}
          >
            <span>I&apos;m a </span>
            <AnimatePresence mode="wait">
              <m.strong
                key={profile.roles[role]}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={undefined}
                transition={{ duration: 0.25 }}
              >
                {profile.roles[role]}
              </m.strong>
            </AnimatePresence>
          </m.div>
          <m.p variants={child} className="hero-copy">
            {profile.biography}
          </m.p>
          <m.ul
            variants={child}
            className="hero-highlights"
            aria-label="Core capabilities"
          >
            {profile.highlights.map((highlight) => (
              <li key={highlight}>
                <Check aria-hidden="true" />
                {highlight}
              </li>
            ))}
          </m.ul>
          <m.div variants={child} className="button-row">
            <a className="button primary" href="#contact">
              Contact Paul <ArrowUpRight />
            </a>
            <a className="button secondary" href="/resume">
              View résumé <ArrowUpRight />
            </a>
          </m.div>
          <m.div variants={child} className="socials">
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
          </m.div>
        </div>
        <m.aside
          variants={child}
          className="hero-visual"
          aria-label="Portrait and availability"
        >
          <m.figure
            className="portrait-frame"
            whileHover={undefined}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              className="portrait-image"
              src="/images/paul-phiri.webp"
              alt="Paul Napoleon Phiri wearing a navy suit and glasses"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 34vw"
            />
          </m.figure>
          <div className="hero-status">
            <span className="status-dot" />
            <div>
              <strong>Available for selected work</strong>
              <span>{profile.location}</span>
            </div>
          </div>
        </m.aside>
        <m.a variants={child} className="scroll-cue" href="#skills">
          Scroll to explore <ArrowDown />
        </m.a>
      </m.div>
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
    <Reveal className="section-head">
      {label && <p className="eyebrow">{label}</p>}
      <h2>{title}</h2>
      <p>{copy}</p>
    </Reveal>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHead
          title="Skills & technologies"
          copy="A pragmatic toolkit for building reliable products from interface to integration."
        />
        <div className="capability-list">
          {skillCategories.map((group, index) => (
            <div key={group.id} className="capability-row">
              <span className="capability-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{group.title}</h3>
              <div className="tags">
                {group.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
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
    <section id="experience" className="section section-alt">
      <div className="container">
        <SectionHead
          title="Work experience"
          copy="Roles where software delivery, operational care and communication meet."
        />
        <div className="timeline">
          {experiences.map((item) => (
            <Reveal key={item.id} className="timeline-item">
              <div className="timeline-dot" />
              <article className="glass-card experience-card">
                <div className="card-meta">
                  <span>{item.period}</span>
                  {item.current && (
                    <span className="current">Current role</span>
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Qualifications() {
  return (
    <section id="qualification" className="section">
      <div className="container">
        <SectionHead
          title="Education & qualifications"
          copy="Academic grounding across technology, systems and business."
        />
        <div className="qualification-grid">
          {qualifications.map((item) => (
            <Reveal key={item.id} className="glass-card qualification-card">
              <p className="card-meta">
                <span>{item.level}</span>
                <span>{item.period}</span>
              </p>
              <h3>{item.programme}</h3>
              <p className="company">{item.institution}</p>
              <p>{item.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <SectionHead
          label="Selected systems"
          title="Project case studies"
          copy="The problems behind the work, the solutions delivered and the responsibilities I owned."
        />
        <div className="projects-grid">
          {projects.map((project, index) => (
            <Reveal key={project.id} className="glass-card project-card">
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
                      View public source <ArrowUpRight />
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
                        Live project <ArrowUpRight />
                      </a>
                    )}
                    {project.walkthroughUrl && (
                      <a
                        href={project.walkthroughUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Walkthrough <ArrowUpRight />
                      </a>
                    )}
                    {project.caseStudyUrl && (
                      <a
                        href={project.caseStudyUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Case study <ArrowUpRight />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <SectionHead
          title="Engagement options"
          copy="Every project is scoped around the problem. These starting points make the first conversation concrete—rates follow a confirmed brief."
        />
        <div className="pricing-grid">
          {engagementOptions.map((option) => (
            <Reveal key={option.title} className="glass-card pricing-card">
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              <ul aria-label={`${option.title} includes`}>
                {option.includes.map((item) => (
                  <li key={item}>
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
              <a className="text-link" href="#contact">
                Discuss scope <ArrowUpRight />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return <ContactForm />;
}

export default function Portfolio() {
  return (
    <LazyMotion>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Skills />
        <Experience />
        <Qualifications />
        <Projects />
        <Pricing />
        <Contact />
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
    </LazyMotion>
  );
}
