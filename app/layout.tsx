import type { Metadata } from "next";
import Script from "next/script";
import { absoluteUrl, siteUrl } from "@/lib/site";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Paul Napoleon Phiri | Full-Stack Software Developer",
  description:
    "Full-stack software developer in Blantyre, Malawi building web and mobile systems with Laravel, React and Flutter — booking platforms, content systems and payment integrations for real organisational workflows.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Paul Napoleon Phiri | Full-Stack Software Developer",
    description:
      "Full-stack web and mobile case studies: Flutter and Laravel systems, booking workflows, content platforms and payment integrations.",
    type: "profile",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Napoleon Phiri | Full-Stack Software Developer",
    description:
      "Full-stack web and mobile case studies: Flutter and Laravel systems, booking workflows, content platforms and payment integrations.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    url: siteUrl,
    name: "Paul Napoleon Phiri",
    alternateName: "Paul Phiri",
    jobTitle: "Full-Stack Software Developer",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Malawi University of Science and Technology",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Blantyre",
      addressCountry: "Malawi",
    },
    sameAs: [
      "https://github.com/MustbePaul",
      "https://www.linkedin.com/in/paul-napoleon-phiri",
    ],
  };
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
