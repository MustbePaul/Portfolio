import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Paul Napoleon Phiri | Full-Stack Software Developer',
  description: 'Paul Napoleon Phiri builds reliable web and mobile systems for banks, NGOs, government agencies and growing businesses.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Paul Napoleon Phiri | Full-Stack Software Developer',
    description: 'Selected software engineering work and case studies by Paul Napoleon Phiri.',
    type: 'profile',
    url: '/',
    images: [{ url: '/images/paul-phiri.png', alt: 'Paul Napoleon Phiri' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paul Napoleon Phiri | Full-Stack Software Developer',
    description: 'Selected software engineering work and case studies by Paul Napoleon Phiri.',
    images: ['/images/paul-phiri.png'],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { '@context': 'https://schema.org', '@type': 'Person', name: 'Paul Napoleon Phiri', alternateName: 'Paul Phiri', jobTitle: 'Full-Stack Software Developer', alumniOf: { '@type': 'CollegeOrUniversity', name: 'Malawi University of Science and Technology' }, address: { '@type': 'PostalAddress', addressLocality: 'Blantyre', addressCountry: 'Malawi' }, sameAs: ['https://github.com/MustbePaul', 'https://linkedin.com/in/paul-phiri-2574281b0'] }
  return <html lang="en"><body>{children}<Script id="person-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>
}
