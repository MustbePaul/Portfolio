import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import { absoluteUrl, siteUrl } from "@/lib/site";
import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: "normal",
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Paul Napoleon Phiri | Full-Stack Software Developer",
  description:
    "Paul Napoleon Phiri builds reliable web and mobile systems for banks, NGOs, government agencies and growing businesses.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Paul Napoleon Phiri | Full-Stack Software Developer",
    description:
      "Selected software engineering work and case studies by Paul Napoleon Phiri.",
    type: "profile",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Napoleon Phiri | Full-Stack Software Developer",
    description:
      "Selected software engineering work and case studies by Paul Napoleon Phiri.",
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
  const fontVariables = `${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`;
  return (
    <html lang="en" className={fontVariables}>
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
