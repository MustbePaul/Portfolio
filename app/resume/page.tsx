'use client';

import { useEffect, useState } from 'react';

export default function ResumePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  const handlePrint = () => {
    window.print();
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-ink-950 text-paper-100">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 sm:py-16">
        {/* Masthead */}
        <header className="border-b border-ink-800 pb-8 mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-paper-500 mb-4">
            Résumé
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-3">
            Paul Napoleon Phiri
          </h1>
          <p className="text-lg sm:text-xl text-paper-300 mb-6">
            I&apos;m a <span className="font-semibold text-paper-100">Full-Stack Software Developer</span> — Laravel · React · Flutter
          </p>
          
          {/* Contact Info */}
          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm font-mono text-paper-500 mb-6">
            <span>Blantyre, Malawi</span>
            <a href="tel:+265997765664" className="hover:text-signal-blue transition-colors">
              +265 997 765 664
            </a>
            <a href="mailto:phiri6paul@gmail.com" className="hover:text-signal-blue transition-colors">
              phiri6paul@gmail.com
            </a>
            <a href="https://paul-phiri-portfolio.vercel.app" className="hover:text-signal-blue transition-colors">
              paul-phiri-portfolio.vercel.app
            </a>
            <a href="https://github.com/MustbePaul" className="hover:text-signal-blue transition-colors">
              github.com/MustbePaul
            </a>
            <a href="https://www.linkedin.com/in/paul-napoleon-phiri" className="hover:text-signal-blue transition-colors">
              linkedin.com/in/paul-napoleon-phiri
            </a>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-paper-500 border border-ink-700 rounded-full px-4 py-2 bg-ink-900 no-print">
            <span className="w-2 h-2 rounded-full bg-signal-green flex-shrink-0"></span>
            Available for selected work
          </div>
        </header>

        {/* Profile Section */}
        <section className="border-b border-ink-800 py-8 grid grid-cols-[auto_1fr] gap-8">
          <div className="font-mono text-xs text-paper-500 uppercase tracking-wider pt-1">01</div>
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-signal-blue font-semibold mb-4">
              Profile
            </h2>
            <p className="text-base leading-relaxed text-paper-300">
              Business Information Technology graduate building <span className="font-semibold text-paper-100">dependable web and mobile systems</span> for banks, NGOs and growing businesses — booking platforms, content systems and payment integrations. Comfortable owning a feature from database schema to mobile interface, and used to shipping under real hosting, connectivity and payment-provider constraints.
            </p>
          </div>
        </section>

        {/* Experience Section */}
        <section className="border-b border-ink-800 py-8 grid grid-cols-[auto_1fr] gap-8">
          <div className="font-mono text-xs text-paper-500 uppercase tracking-wider pt-1">02</div>
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-signal-blue font-semibold mb-6">
              Experience
            </h2>

            {/* Terex */}
            <div className="mb-8">
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-2">
                <h3 className="text-lg font-semibold text-paper-100">Software Developer</h3>
                <span className="font-mono text-xs text-paper-500 whitespace-nowrap">Feb 2026 — Sep 2026</span>
              </div>
              <p className="text-sm text-paper-300 mb-4">
                Terex Innovation Lab Limited · Blantyre, Malawi
              </p>
              <ul className="space-y-2">
                <li className="text-sm text-paper-300 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-paper-500">
                  Shipped features across three in-house products — <span className="font-semibold text-paper-100">ZikoSpace</span>, <span className="font-semibold text-paper-100">TaxiHire / SWIFTR</span> and the Terex website — in Laravel, PHP, JavaScript, React, Angular and Flutter.
                </li>
                <li className="text-sm text-paper-300 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-paper-500">
                  Integrated <span className="font-semibold text-paper-100">dual payment gateways</span> (PayChangu and OneKhusa) into TaxiHire, re-architecting the payment flow mid-build after hosting constraints ruled out the original approach.
                </li>
                <li className="text-sm text-paper-300 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-paper-500">
                  Delivered role-specific booking, payment and content workflows for passengers, drivers and administrators across web and mobile clients.
                </li>
                <li className="text-sm text-paper-300 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-paper-500">
                  Rebuilt authentication, routing and theme persistence for ZikoSpace, then delivered its accommodation booking flow end to end.
                </li>
                <li className="text-sm text-paper-300 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-paper-500">
                  Implemented the Terex website redesign — refreshed hero, partner and initiative content with scroll interactions; currently under review ahead of production.
                </li>
              </ul>
            </div>

            {/* Naporcas */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-2">
                <h3 className="text-lg font-semibold text-paper-100">Operations &amp; Financial Records Assistant</h3>
                <span className="font-mono text-xs text-paper-500 whitespace-nowrap">Ongoing</span>
              </div>
              <p className="text-sm text-paper-300 mb-4">
                Naporcas Business Center · Lilongwe, Malawi
              </p>
              <ul className="space-y-2">
                <li className="text-sm text-paper-300 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-paper-500">
                  Manage rental fee collection and maintain accurate financial records.
                </li>
                <li className="text-sm text-paper-300 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-paper-500">
                  Track income, expenditure and payment documentation for reliable reconciliation.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="border-b border-ink-800 py-8 grid grid-cols-[auto_1fr] gap-8">
          <div className="font-mono text-xs text-paper-500 uppercase tracking-wider pt-1">03</div>
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-signal-blue font-semibold mb-6">
              Selected Projects
            </h2>

            {/* Serenity Hub */}
            <div className="mb-8">
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-2">
                <h3 className="text-lg font-semibold text-paper-100">Serenity Hub</h3>
                <span className="font-mono text-xs text-paper-500 whitespace-nowrap">Personal project</span>
              </div>
              <p className="font-mono text-xs text-paper-500 mb-3">
                Public source · github.com/MustbePaul/Serenity-Hub
              </p>
              <p className="text-sm text-paper-300 mb-4 max-w-prose">
                Mental-wellness app pairing a Flutter client with a versioned Laravel API: guided audio and video sessions with saved playback progress, mood check-ins feeding mood-informed recommendations, therapist discovery and availability, appointment booking, bookmarks and support requests.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Flutter', 'Dart', 'Laravel 13', 'PHP 8.3', 'Provider', 'SQLite', 'REST API'].map((tech) => (
                  <span key={tech} className="text-xs font-mono text-paper-500 bg-ink-900 border border-ink-700 rounded px-2 py-1">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Story Workshop */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-2">
                <h3 className="text-lg font-semibold text-paper-100">Story Workshop Website &amp; CMS</h3>
                <span className="font-mono text-xs text-paper-500 whitespace-nowrap">Client project</span>
              </div>
              <p className="text-sm text-paper-300 mb-4 max-w-prose">
                Public storytelling platform backed by a protected CMS managing articles, events, vacancies, bookings, newsletters and public submissions.
              </p>
              <div className="flex flex-wrap gap-2">
                {['React 19', 'Laravel 13', 'Sanctum', 'MySQL', 'React Query', 'Framer Motion'].map((tech) => (
                  <span key={tech} className="text-xs font-mono text-paper-500 bg-ink-900 border border-ink-700 rounded px-2 py-1">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="border-b border-ink-800 py-8 grid grid-cols-[auto_1fr] gap-8">
          <div className="font-mono text-xs text-paper-500 uppercase tracking-wider pt-1">04</div>
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-signal-blue font-semibold mb-6">
              Education
            </h2>

            <div className="mb-6">
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-2">
                <h3 className="text-lg font-semibold text-paper-100">BSc in Business Information Technology</h3>
                <span className="font-mono text-xs text-paper-500 whitespace-nowrap">2022 — Aug 2026</span>
              </div>
              <p className="text-sm text-paper-300">
                Malawi University of Science and Technology · Graduated 6 August 2026
              </p>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-2">
                <h3 className="text-lg font-semibold text-paper-100">AS Level &amp; IGCSE</h3>
                <span className="font-mono text-xs text-paper-500 whitespace-nowrap">2015 — 2021</span>
              </div>
              <p className="text-sm text-paper-300">
                Kamuzu Academy
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-8 grid grid-cols-[auto_1fr] gap-8">
          <div className="font-mono text-xs text-paper-500 uppercase tracking-wider pt-1">05</div>
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-signal-blue font-semibold mb-6">
              Skills &amp; Technologies
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-[150px_1fr] gap-6">
                <div className="text-sm font-semibold">Backend</div>
                <div className="text-sm text-paper-300">Laravel · PHP · Node.js · REST APIs · PayChangu · OneKhusa</div>
              </div>
              <div className="grid grid-cols-[150px_1fr] gap-6 border-t border-ink-800 pt-4">
                <div className="text-sm font-semibold">Frontend &amp; Mobile</div>
                <div className="text-sm text-paper-300">React · Next.js · Angular · Flutter · TypeScript · JavaScript · Tailwind CSS · HTML5 · CSS3</div>
              </div>
              <div className="grid grid-cols-[150px_1fr] gap-6 border-t border-ink-800 pt-4">
                <div className="text-sm font-semibold">Databases</div>
                <div className="text-sm text-paper-300">MySQL · PostgreSQL · SQLite · SQL</div>
              </div>
              <div className="grid grid-cols-[150px_1fr] gap-6 border-t border-ink-800 pt-4">
                <div className="text-sm font-semibold">Tools</div>
                <div className="text-sm text-paper-300">Git · GitHub · Postman · Figma · VS Code · Laragon</div>
              </div>
              <div className="grid grid-cols-[150px_1fr] gap-6 border-t border-ink-800 pt-4">
                <div className="text-sm font-semibold">Focus areas</div>
                <div className="text-sm text-paper-300">Booking and payment workflows · Offline-first mobile · CMS and dashboard development · API design and integration</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-ink-800 flex flex-wrap justify-between items-center gap-4 font-mono text-xs text-paper-500 no-print">
          <span>© 2026 Paul Napoleon Phiri</span>
          <button
            onClick={handlePrint}
            className="uppercase tracking-wider text-paper-100 bg-ink-900 border border-ink-700 rounded-full px-4 py-2 hover:border-signal-blue hover:text-signal-blue transition-colors"
          >
            Download / Print PDF
          </button>
        </footer>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white;
            color: black;
          }
          .min-h-screen {
            min-height: auto;
            background: white;
          }
          section {
            break-inside: avoid;
          }
          a {
            text-decoration: none;
            color: inherit;
          }
          @page {
            margin: 13mm 14mm;
            size: A4;
          }
        }
      `}</style>
    </div>
  );
}
