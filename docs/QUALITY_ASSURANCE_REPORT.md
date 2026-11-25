# Quality assurance report — 25 November 2026

## Verified local results

- `npm run format:check`: passed.
- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm audit --omit=dev`: zero reported production dependency vulnerabilities.
- `npm run build`: passed; homepage, catalogue, résumé, metadata routes and ten case studies generated.
- `npm run test:e2e`: 24/24 Chromium checks passed. Coverage includes contact validation, mocked UI success/failure, server honeypot and size rejection, rate limiting, catalogue filters, PDF response, image loading and responsive widths.
- `npm run lighthouse`: final desktop homepage 100 performance, 100 accessibility, 100 best practices, 100 SEO. One final local production-build run at 1440×900.
- `npm run lighthouse:mobile`: mobile homepage performance scores across four local runs were 95, 83, 89 and 89 (median 89); accessibility, best practices and SEO were 100 each. The final run scored 89 and used 390×844 emulation, 2× device scale and simulated throttling. Reports are in the ignored `.lighthouseci/` directory. The spread shows single-run variability, especially in total blocking time.
- Browser captures of homepage, catalogue, résumé and all ten case studies at 390px, 768px and 1440px: 39/39 had 0px horizontal overflow. Captures remain outside the repository. Manual review found the old Serenity login image too small and replaced it with a meaningful demo home image. The mobile résumé page now gives a clear PDF action instead of a blank embedded frame.
- The committed PDF and updated external Word-export PDF have matching SHA-256 hashes. The PDF has two pages, searchable text, four link annotations, the confirmed formal title and classifications, and no excluded school reference.

## Contact delivery

A controlled message titled `CONTROLLED TEST 2026-11-25 portfolio delivery` was submitted to the current production endpoint. It returned HTTP 201 with `{"ok":true}`. The recipient Gmail Inbox contained that exact message, delivered at 19:37 UTC, with the expected `Reply-To: phiri6paul@gmail.com`. The configured sender currently displays as `Paul Phiri Portfolio <onboarding@resend.dev>`; use a verified custom sending domain later if a branded address is desired. Browser success/failure tests are mocked. The server checks malformed JSON, Zod fields, an empty honeypot, request size and a per-instance rate limit; the 24-test suite verifies those branches. A Vercel instance restart or multiple instances can bypass the in-memory limit as a global control.

## Limits

Scores are synthetic measurements of the homepage, not production field data or a full accessibility audit. Employer and client screenshots lacking confirmed publication rights were removed. Banking and Serenity screenshots are authentic labelled demos with synthetic data. Other projects remain text-only until safe, authentic images are available. The new preview and its checks need review after the branch is pushed.
