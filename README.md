# Paul Napoleon Phiri | Software Developer Portfolio

A Next.js portfolio for a full-stack software developer in Blantyre, Malawi. It presents a development journey beginning in 2023, professional experience, technical capabilities and evidence-based web and mobile case studies.

[Live website](https://paul-phiri-portfolio.vercel.app/) | [Projects](https://paul-phiri-portfolio.vercel.app/projects) | [GitHub](https://github.com/MustbePaul) | [LinkedIn](https://linkedin.com/in/paul-napoleon-phiri)

## Structure

- `app/`: homepage, project catalogue, case study routes, CV view, API and SEO metadata routes.
- `components/`: navigation, contact form and catalogue interactions.
- `data/portfolio.ts`: profile, employment, education, skills, services and journey.
- `data/caseStudies.ts`: typed, curated project records and attribution boundaries.
- `public/resume.pdf`: verified public 2026 CV. The old HTML CV files in `resume/` are legacy sources and must not be used to regenerate this PDF.
- `docs/`: sanitised audit, attribution, strategy, QA and release notes.

## Local development

Requires Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

For contact delivery, copy `.env.example` to `.env` and supply server-side Resend values. Do not commit secrets. The form still provides direct email when delivery is unavailable.

## Verification

```bash
npm run typecheck
npm run lint
npm run build
npm run test:e2e
npm run lighthouse
npm audit --omit=dev
```

A browser screenshot capture script can write review images outside `public/`:

```bash
node scripts/capture-portfolio.mjs C:/path/to/private-preview-folder
```

## Deployment

The production branch is `main`. Review the feature branch and a preview before merging. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin. Configure `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` in the hosting environment only; the sending domain must be verified. The contact API uses schema validation, a honeypot and a per-instance rate limit. See [deployment readiness](docs/DEPLOYMENT_READINESS.md) for remaining checks.
