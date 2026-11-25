# Deployment readiness

The work is on `feature/portfolio-professional-refresh-2026`. Production deployment requires review and explicit approval. No Vercel CLI or local Vercel project link was found, so a preview URL has not been created from this workspace.

Before release, confirm the ten public case study descriptions and screenshot rights, validate the production contact environment, and check the preview across target devices. The public build serves only `public/resume.pdf` and the existing approved images; the source inventory and CV evidence remain outside the repository.

The contact endpoint has schema validation, a honeypot and a per-instance in-memory rate limit. Serverless instances do not share that limit, so stronger abuse protection would need a durable store. Basic security response headers are configured. No new client-side secret exposure is introduced.
