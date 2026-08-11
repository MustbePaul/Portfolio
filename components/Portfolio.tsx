"use client";

import Image from "next/image";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactValues } from "@/lib/contact";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  MapPin,
  MessageCircle,
} from "lucide-react";
import {
  engagementOptions,
  experiences,
  navigation,
  profile,
  projects,
  qualifications,
  skillCategories,
} from "@/data/portfolio";

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

const headerNavigation = navigation.filter((item) =>
  ["Home", "Experience", "Projects", "Contact"].includes(item),
);

function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.toLowerCase()))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && setActive(entry.target.id),
        ),
      { rootMargin: "-35% 0px -55%", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    document.body.dataset.menuOpen = String(open);
    return () => {
      delete document.body.dataset.menuOpen;
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          href="#home"
          className="brand"
          aria-label="Paul Napoleon Phiri, home"
        >
          PP<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary">
          {headerNavigation.map((item) => {
            const id = item.toLowerCase();
            return (
              <a
                key={item}
                href={`#${id}`}
                className={active === id ? "active" : ""}
                aria-current={active === id ? "page" : undefined}
              >
                {item}
              </a>
            );
          })}
        </nav>
        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {headerNavigation.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
              >
                {item}
                <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const [role, setRole] = useState(0);
  const [rolePaused, setRolePaused] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || rolePaused) return;
    const timer = window.setInterval(
      () => setRole((value) => (value + 1) % profile.roles.length),
      2400,
    );
    return () => window.clearInterval(timer);
  }, [reduce, rolePaused]);
  const parent = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.08 },
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
            Hello, I’m
          </m.p>
          <m.h1 variants={child}>{profile.name}</m.h1>
          <m.div
            variants={child}
            className="role-line"
            aria-live="polite"
            tabIndex={0}
            onMouseEnter={() => setRolePaused(true)}
            onMouseLeave={() => setRolePaused(false)}
            onFocus={() => setRolePaused(true)}
            onBlur={() => setRolePaused(false)}
            aria-label={`${profile.roles[role]}. Animated role; focus or hover pauses rotation.`}
          >
            <span>I’m a </span>
            <AnimatePresence mode="wait">
              <m.strong
                key={profile.roles[role]}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {profile.roles[role]}
              </m.strong>
            </AnimatePresence>
          </m.div>
          <m.p variants={child} className="hero-copy">
            {profile.biography}
          </m.p>
          <m.div variants={child} className="button-row">
            <a className="button primary" href="#contact">
              Get in touch <ArrowUpRight />
            </a>
            <a className="button secondary" href="/resume.pdf" download>
              Download résumé <ArrowDown />
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
            whileHover={reduce ? undefined : { y: -6 }}
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
                <p className="project-attribution">{project.ownership}</p>
                {project.status && (
                  <p className="project-status">{project.status}</p>
                )}
                <h3>{project.title}</h3>
                <div className="case-study-block">
                  <h4>Problem</h4>
                  <p>{project.problem}</p>
                </div>
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
              <ul>
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
  const [delivery, setDelivery] = useState<
    | { state: "idle" }
    | { state: "success"; message: string }
    | { state: "error"; message: string }
  >({ state: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });
  const submit = async (values: ContactValues) => {
    setDelivery({ state: "idle" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok)
        throw new Error(result.error ?? "Message delivery failed.");
      reset();
      setDelivery({
        state: "success",
        message: "Message sent. I’ll get back to you as soon as I can.",
      });
    } catch (error) {
      setDelivery({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Message delivery failed. Please use the email link instead.",
      });
    }
  };
  const whatsApp = `https://wa.me/265997765664?text=${encodeURIComponent(`Hello Paul, I found your portfolio and would like to discuss a project.`)}`;
  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <SectionHead
          label="Contact"
          title="Let’s build something useful"
          copy="Tell me what you are working on, where it is stuck and what a good outcome looks like."
        />
        <div className="contact-grid">
          <Reveal className="contact-details">
            <div className="detail">
              <Mail />
              <div>
                <span>Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
            </div>
            <div className="detail">
              <MapPin />
              <div>
                <span>Location</span>
                <p>{profile.location}</p>
              </div>
            </div>
            <div className="quick-actions">
              <a className="button secondary" href={`mailto:${profile.email}`}>
                Quick email <Mail />
              </a>
              <a
                className="button secondary"
                href={whatsApp}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp <MessageCircle />
              </a>
            </div>
            <div className="socials">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
            </div>
          </Reveal>
          <Reveal>
            <form
              className="glass-card contact-form"
              onSubmit={handleSubmit(submit)}
              noValidate
            >
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  autoComplete="name"
                  maxLength={80}
                  aria-invalid={!!errors.name}
                  aria-describedby="name-error"
                  {...register("name")}
                />
                <p id="name-error" className="field-message">
                  {errors.name?.message}
                </p>
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                  {...register("email")}
                />
                <p id="email-error" className="field-message">
                  {errors.email?.message}
                </p>
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={6}
                  maxLength={5000}
                  aria-invalid={!!errors.message}
                  aria-describedby="message-error"
                  {...register("message")}
                />
                <p id="message-error" className="field-message">
                  {errors.message?.message}
                </p>
              </div>
              <div className="field">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  autoComplete="off"
                  maxLength={120}
                  aria-invalid={!!errors.subject}
                  aria-describedby="subject-error"
                  {...register("subject")}
                />
                <p id="subject-error" className="field-message">
                  {errors.subject?.message}
                </p>
              </div>
              <div className="honeypot" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("website")}
                />
              </div>
              <button
                className="button primary submit"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Sending…" : "Send message"} <ArrowUpRight />
              </button>
              <p
                className={`form-note ${delivery.state === "error" ? "form-note-error" : ""}`}
                role={delivery.state === "error" ? "alert" : "status"}
                aria-live="polite"
              >
                {delivery.state === "idle"
                  ? "Your message is delivered securely by email."
                  : delivery.message}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  return (
    <LazyMotion features={domAnimation} strict>
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
