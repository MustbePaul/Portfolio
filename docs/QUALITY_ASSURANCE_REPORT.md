# Quality assurance report

Test results and browser evidence are recorded here after validation. The automated suite covers the homepage, navigation, résumé delivery, contact validation and response states, rate limiting, project filters, project case studies and mobile overflow checks.

## Recorded results

- TypeScript: `npm run typecheck` passed.
- ESLint: `npm run lint` passed after internal routes were changed to Next.js links.
- Production build: `npm run build` passed; the homepage, catalogue, résumé, metadata routes and ten case studies were generated.
- Playwright: 22/22 Chromium checks passed. They include form validation, mocked success/failure, API rate limiting, résumé PDF response, catalogue filters, case-study metadata and widths from 280px to 1440px.
- Browser captures: homepage, catalogue and Serenity Hub case study at 390px, 768px and 1440px. All nine measured 0px horizontal overflow. Captures are kept outside the repository and `public/`.
- Lighthouse desktop homepage, local production build: performance 100, accessibility 100, best practices 100, SEO 100. This is one local run with the repository's desktop settings, not a field measurement or mobile score.
- `npm audit --omit=dev`: zero reported production dependency vulnerabilities.
- Verified the public PDF hash matches the approved two-page November 2026 PDF exactly.

## Limits

The existing Resend delivery path cannot be end-to-end tested without sending a real message. Browser tests mock success and failure responses; API tests exercise the no-credentials branch. Production delivery depends on the existing server-side environment configuration. Automated accessibility scoring does not establish full WCAG 2.2 AA conformance; manual screen-reader review remains useful. The Lighthouse result covers the homepage only.
