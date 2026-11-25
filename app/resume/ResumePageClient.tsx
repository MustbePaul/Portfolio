"use client";

import Link from "next/link";

export default function ResumePageClient() {
  return (
    <main className="resume-view container" id="main">
      <Link className="back-link" href="/">
        ← Portfolio
      </Link>
      <p className="eyebrow">Curriculum vitae · 2026</p>
      <h1>Paul Napoleon Phiri</h1>
      <p>Full-Stack Software Developer · Web, Mobile & Business Systems</p>
      <p>
        The downloadable PDF is the current verified résumé. It includes my 2023
        programming start, professional experience and selected project
        contributions.
      </p>
      <div className="button-row">
        <a className="button primary" href="/resume.pdf" download>
          Download CV (PDF)
        </a>
        <Link className="button secondary" href="/projects">
          Explore projects
        </Link>
      </div>
      <iframe
        className="resume-frame"
        title="Paul Napoleon Phiri 2026 curriculum vitae"
        src="/resume.pdf"
      />
    </main>
  );
}
