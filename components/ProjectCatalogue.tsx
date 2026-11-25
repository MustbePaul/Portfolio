"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  caseStudies,
  type ProjectCategory,
  type ProjectRelationship,
} from "@/data/caseStudies";

const categories: ("All projects" | ProjectCategory)[] = [
  "All projects",
  "Web applications",
  "Mobile applications",
  "Enterprise systems",
  "Financial technology",
  "Healthcare and wellbeing",
  "Booking and transportation",
  "Business management",
  "Academic projects",
];
const relationships: ("All relationships" | ProjectRelationship)[] = [
  "All relationships",
  "Personal",
  "Employer-owned",
  "Client",
  "Collaborative",
  "Academic",
  "Personal Academic Project",
  "Personal Project",
];

export default function ProjectCatalogue() {
  const [category, setCategory] =
    useState<(typeof categories)[number]>("All projects");
  const [relationship, setRelationship] =
    useState<(typeof relationships)[number]>("All relationships");
  const visible = useMemo(
    () =>
      caseStudies.filter(
        (project) =>
          (category === "All projects" ||
            project.categories.includes(category)) &&
          (relationship === "All relationships" ||
            project.relationship === relationship ||
            (relationship === "Personal" &&
              (project.relationship === "Personal Academic Project" ||
                project.relationship === "Personal Project")) ||
            (relationship === "Academic" &&
              project.relationship === "Personal Academic Project")),
      ),
    [category, relationship],
  );

  return (
    <>
      <div className="catalogue-filters">
        <label>
          Project category
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as typeof category)
            }
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Project relationship
          <select
            value={relationship}
            onChange={(event) =>
              setRelationship(event.target.value as typeof relationship)
            }
          >
            {relationships.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <p role="status">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>
      <div className="catalogue-grid">
        {visible.map((project) => (
          <article className="catalogue-card" key={project.slug}>
            {project.image && (
              <div className="catalogue-image">
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? ""}
                  fill
                  sizes="(max-width: 720px) 100vw, 50vw"
                />
              </div>
            )}
            <div className="catalogue-card-body">
              <p className="eyebrow">
                {project.relationship} · {project.status}
              </p>
              <h2>
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              </h2>
              <p>{project.summary}</p>
              <div className="tags">
                {project.stack.slice(0, 5).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <Link className="text-link" href={`/projects/${project.slug}`}>
                Read case study <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
      {visible.length === 0 && <p>No projects match both filters.</p>}
    </>
  );
}
