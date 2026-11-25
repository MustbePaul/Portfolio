import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeaderClient from "@/components/HeaderClient";
import { caseStudies } from "@/data/caseStudies";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudies.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Paul Napoleon Phiri`,
    description: project.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: absoluteUrl(`/projects/${slug}`),
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = caseStudies.find((item) => item.slug === slug);
  if (!project) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: absoluteUrl(`/projects/${slug}`),
    author: { "@type": "Person", name: "Paul Napoleon Phiri" },
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <HeaderClient />
      <main id="main" className="inner-page container case-page">
        <Link className="back-link" href="/projects">
          ← All projects
        </Link>
        <p className="eyebrow">
          {project.relationship} · {project.status}
        </p>
        <h1>{project.title}</h1>
        <p className="inner-lead">{project.summary}</p>
        <dl className="case-facts">
          <div>
            <dt>Relationship</dt>
            <dd>{project.relationship}</dd>
          </div>
          <div>
            <dt>Current status</dt>
            <dd>{project.status}</dd>
          </div>
          {project.period && (
            <div>
              <dt>Verified period</dt>
              <dd>{project.period}</dd>
            </div>
          )}
        </dl>
        {project.image && (
          <figure className="case-image">
            <Image
              src={project.image}
              alt={project.imageAlt ?? ""}
              fill
              sizes="(max-width: 800px) 100vw, 80vw"
            />
            <figcaption>
              Application screenshot from existing portfolio assets.
            </figcaption>
          </figure>
        )}
        <div className="case-layout">
          <div className="case-narrative">
            <section>
              <h2>The problem</h2>
              <p>{project.problem}</p>
            </section>
            <section>
              <h2>My contribution</h2>
              <p>{project.role}</p>
            </section>
            <section>
              <h2>Implemented workflows</h2>
              <ul>
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2>Engineering approach</h2>
              <p>{project.engineering}</p>
            </section>
            <section>
              <h2>Testing and release</h2>
              <p>{project.quality}</p>
              <p>{project.deployment}</p>
            </section>
            <section>
              <h2>What I learned</h2>
              <p>{project.learning}</p>
            </section>
          </div>
          <aside className="case-aside">
            <h2>Technology</h2>
            <ul>
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {project.repository && (
              <a
                className="text-link"
                href={project.repository}
                target="_blank"
                rel="noreferrer"
              >
                View public source ↗
              </a>
            )}
          </aside>
        </div>
        <nav className="case-next" aria-label="More projects">
          <Link href="/projects">Explore more projects →</Link>
          <Link href="/#contact">Contact me →</Link>
        </nav>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
