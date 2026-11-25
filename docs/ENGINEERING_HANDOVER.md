# Engineering handover

This guide refers to the portfolio source in this repository. Work through the exercises on a branch and inspect the result locally before opening a pull request.

## How a request becomes a page

Next.js 16 uses the App Router under `app/`. `app/layout.tsx` wraps every route, loads fonts and global CSS, defines common metadata, and emits Person structured data. `app/page.tsx` renders the homepage through `components/Portfolio.tsx`. `app/projects/page.tsx` renders the catalogue. `app/projects/[slug]/page.tsx` handles a project slug, looks it up in `data/caseStudies.ts`, generates its canonical URL and metadata, and calls `notFound()` for an unknown slug. `generateStaticParams()` lists the ten known slugs, so Next.js can pre-render those pages during the build. The decision gives quick public pages and one source of truth for case studies. A missing or duplicated slug would create a broken or misleading route.

Most route files are **server components**: they run on the server or at build time and can prepare content and metadata without shipping that logic to the browser. Files marked `"use client"`, such as `components/HeaderClient.tsx`, `components/ProjectCatalogue.tsx`, `components/ContactForm.tsx` and `app/resume/ResumePageClient.tsx`, run in the browser for menus, filters and form state. Keep client components focused: moving all content into them increases JavaScript and can slow mobile devices.

`data/portfolio.ts` defines typed profile, experience and skills data. `data/caseStudies.ts` defines the `CaseStudy` shape and the ten public entries, including ownership, status, scope, image alt text and optional galleries. TypeScript catches misspelled fields and missing required values at build time. It cannot verify historical facts or image rights; those still need human review. Add a project by adding a valid entry, checking the catalogue filter, route, metadata, and attribution register.

## Contact request lifecycle

`components/ContactForm.tsx` collects name, email, subject and message and sends JSON to `app/api/contact/route.ts`. `lib/contact.ts` defines the Zod schema shared by browser and server. Browser checks help users correct mistakes early; the API parses and validates again because an attacker can bypass the browser. The optional empty `website` field is a honeypot. The API also rejects malformed and oversized JSON, then applies a per-instance sliding-window limit of five attempts per ten minutes.

For a valid request, the route reads `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` from server environment variables. It calls Resend with the visitor address in `replyTo`, a controlled subject prefix and a plain-text body. A Resend response ID causes HTTP 201; that is **provider acceptance**, not proof the recipient inbox received the message. API errors return 400, 413, 422, 429, 502 or 503 as appropriate. The UI displays the server's result.

The in-memory limiter is cheap and useful against simple bursts. Vercel functions can run in several isolated instances and restart, so this map is neither global nor durable. Forwarded IP headers also depend on the trusted hosting proxy. A durable store or provider-side abuse controls would be needed for strict global limits; do not add paid services without approval. A honeypot alone cannot stop targeted abuse.

Never commit real `.env` files or put the Resend key in a `NEXT_PUBLIC_` variable. `.env.example` documents names only. Set production and preview values in the hosting environment, restrict access, verify the sender domain, and rotate a key if exposed. The test suite starts a server with blank contact credentials so its API tests cannot send real email.

## Quality and release path

Use the feature branch `feature/portfolio-professional-refresh-2026`; `main` is production. Commit focused changes, push the branch and let PR #1 run `.github/workflows/ci.yml`. Its GitHub Actions job installs Node 24 dependencies and runs formatting, lint, TypeScript, dependency audit, build, Playwright and Lighthouse. The actions themselves use a supported Node 24 runtime. A green workflow proves those commands passed on that commit, not that every publication right or email inbox delivery is verified.

`tests/portfolio.spec.ts` uses Playwright Chromium to check navigation, routes, metadata, filters, images, PDF response, contact validation and layout widths. Mocked contact success and failure test the UI states only. `playwright.config.ts` starts the built app and clears email credentials for tests. Run `npm run build` before `npm run test:e2e`.

`npm run lighthouse` runs `scripts/lighthouse.mjs` against a local production build with the desktop settings in `lighthouserc.json`; the report is saved under `.lighthouseci/`. `npm run lighthouse:mobile` uses 390×844 mobile emulation and simulated throttling. A single synthetic score can vary with machine load and does not replace field data or manual accessibility review.

Vercel builds a preview for the PR and deploys `main` to production after an authorised merge. Check the preview and all public routes before marking the PR ready. Verify the production deployment commit and routes after release. For rollback, identify the last healthy `main` commit and prior Vercel deployment first. Use Vercel's previous-deployment promotion if authorised and available, or revert the release commit through a normal PR and let Vercel deploy the revert. Do not force push or bypass checks.

## Practical exercises

1. Run `npm run dev`, open `/projects`, select each category and relationship, then inspect the same page at 390px, 768px and 1440px. Explain which component updates the filter.
2. Read one entry in `data/caseStudies.ts`; follow its slug through `generateStaticParams()`, `generateMetadata()` and the rendered page. Visit a nonexistent slug and observe the 404.
3. In a throwaway branch, change a case-study summary and run `npm run typecheck` and `npm run build`. Check the page title, description and canonical URL, then discard the exercise change.
4. With no Resend variables, submit a valid local form and inspect the network response. Submit an invalid email and a filled honeypot directly to `/api/contact`; compare 503, 422 and 429 behavior. Do not use real customer data.
5. Run `npm run test:e2e` and read one passing test. Make a reversible UI change that breaks its assertion, observe the failure, and restore the code.
6. Run `npm run lighthouse`, read `.lighthouseci/local-report.json`, and inspect one diagnostic behind a score. Repeat on mobile and note the device and throttling settings.
7. Inspect PR #1 checks and preview, then find the last healthy `main` SHA and Vercel deployment ID. Write down the exact rollback target before merging.

The downloadable `public/resume.pdf` is exported from the corrected Word CV kept in the private CV workspace. Do not regenerate it from an older HTML draft. Compare extracted PDF text against the Word CV and verify page count before each release.
