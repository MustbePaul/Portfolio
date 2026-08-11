# Paul Napoleon Phiri — Portfolio

Paul Napoleon Phiri's personal software-development portfolio, showcasing selected web
and mobile projects, technical skills, work experience, qualifications, and
engagement options.

The active application is built with Next.js and lives in the `app/`,
`components/`, and `data/` directories.

## Tech stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Framer Motion
- React Hook Form and Zod
- Lucide React
- CSS

## Getting started

Requirements:

- Node.js 20 or later
- npm

Install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Available commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

- `dev` starts the local development server.
- `build` creates and validates an optimized production build.
- `start` serves the production build after `npm run build`.
- `lint` runs ESLint and fails on warnings.
- `typecheck` checks the TypeScript project without emitting files.

## Project structure

```text
app/
  globals.css       Global styles
  layout.tsx        Metadata, document layout, and structured data
  page.tsx          Home page entry point
components/
  Portfolio.tsx     Portfolio sections and client-side interactions
data/
  portfolio.ts      Profile, skills, experience, projects, and pricing content
public/
  images/           Portrait and project screenshots
```

## Updating portfolio content

Routine content changes should be made in `data/portfolio.ts`. It contains:

- Profile and contact information
- Navigation items
- Skills and technologies
- Work experience
- Qualifications
- Featured projects
- Engagement options

Project images belong in `public/images/`. Reference them from the project data
with a root-relative path:

```ts
{
  image: '/images/project-name.png',
  imageAlt: 'A concise description of the project screenshot'
}
```

Projects support optional `liveUrl`, `walkthroughUrl`, and `caseStudyUrl`
properties. Links appear on a project card when a value is provided. Repository
links are intentionally replaced with a confidentiality notice for private
client and company work.

Project names, branding, screenshots, artwork, and other intellectual property
remain subject to their respective owners' rights. Public visibility of this
portfolio does not grant permission to reuse those materials; see
[`ASSET_RIGHTS.md`](ASSET_RIGHTS.md) for attribution categories.

## Résumé download

The résumé is stored at `public/resume.pdf` and linked from the hero. Replace
that file with an updated PDF to publish a new version without changing the
component.

## Contact form

The contact form validates input in the browser and opens the visitor's default
email application with a prepared message. It does not send or store form data
on a server.

## Production validation

Before deploying, create a production build:

```bash
npm run build
```

The application is statically rendered at `/`, so it does not currently require
a database. Set `NEXT_PUBLIC_SITE_URL` to the full production origin so canonical,
Open Graph, robots, and sitemap URLs point to the deployed site:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

## Deployment

### Vercel

1. Push the project to a Git repository.
2. Import it into Vercel.
3. Keep the detected Next.js build settings.
4. Deploy.

### Other Node.js hosts

Run:

```bash
npm install
npm run build
npm run start
```

The host must support a current Node.js runtime. Add a custom domain through
the selected host and update the site's canonical and social metadata when the
final production URL is known.
