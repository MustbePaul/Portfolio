import type { Metadata } from "next";
import Link from "next/link";
import HeaderClient from "@/components/HeaderClient";
import ProjectCatalogue from "@/components/ProjectCatalogue";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects | Paul Napoleon Phiri",
  description:
    "Evidence-based case studies in Laravel, React, Flutter and business systems by Paul Napoleon Phiri.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Paul Napoleon Phiri",
    url: absoluteUrl("/projects"),
  },
};

export default function ProjectsPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <HeaderClient />
      <main id="main" className="inner-page container">
        <p className="eyebrow">Selected development work</p>
        <h1>Projects with the role made clear.</h1>
        <p className="inner-lead">
          Browse the work by application type or relationship. Each case study
          distinguishes my contribution from the wider product and states what
          is known about release status.
        </p>
        <ProjectCatalogue />
      </main>
      <footer className="inner-footer container">
        <Link href="/#contact">Discuss an opportunity</Link>
        <a href="/resume.pdf" download>
          Download CV
        </a>
      </footer>
    </>
  );
}
