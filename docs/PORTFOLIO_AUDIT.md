# Portfolio audit — 25 November 2026

## Starting point

The repository was clean on `main` and tracked `MustbePaul/Portfolio`; `origin/main` is the production branch. It used Next.js 16, React 19, TypeScript, a single long homepage, a separate HTML résumé page, typed content in `data/portfolio.ts`, existing project screenshots, a Resend contact endpoint, metadata routes and Playwright tests. The existing dark navy, blue accent, Space Grotesk and IBM Plex visual identity had a usable foundation.

## Findings

- The homepage placed full project narratives in large cards and made scanning difficult.
- The online résumé and public PDF were older than the verified November 2026 CV. Both contained education and skills entries excluded by the new CV audit.
- Project descriptions blurred ownership: TaxiHire web/mobile, BusZathu mobile/platform and ZikoSpace/the House Rentals mirror needed clearer boundaries.
- Project status lacked a consistent model. Several older labels were too vague to help readers assess release state.
- There were no dedicated project URLs or catalogue filters, limiting direct sharing and search discovery.
- Existing accessible navigation, focus states, reduced-motion CSS, form validation and email delivery are strengths worth preserving.
- Contact throttling uses process memory, so it is a best-effort limit across serverless instances. A durable shared limiter remains a deployment improvement.

## Design direction

Retain the typography, palette, portrait and restrained motion. Use an editorial list on the homepage and move detailed evidence to dedicated project pages. Avoid invented metrics, private images and unverified release badges. The public catalogue is deliberately curated rather than an automatic publication of accessible repositories.
