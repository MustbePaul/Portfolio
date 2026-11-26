# Post-release mobile performance review — 26 November 2026

Production remains on main commit `cebde7c0`. This is a diagnosis and a small maintenance proposal, not a release gate. The three production mobile Lighthouse performance runs were 84, 77 and 77 (median 77). Accessibility, best practices and SEO were 100 in those runs. The representative 77 report is in the local ignored `.lighthouseci/production-mobile-report.json`.

## What occupies the main thread

The representative run measured 1,052 ms Total Blocking Time (TBT). Lighthouse attributed about 1,695 ms of main-thread work to style and layout, 897 ms to script evaluation and 188 ms to script parsing and compilation. Largest Contentful Paint was 1.4 s and Cumulative Layout Shift was 0; the issue is responsiveness during startup rather than late visual loading.

Two tasks account for most of the blocking time: a 675 ms document-attributed task and a 451 ms task in the 228 KB uncompressed React DOM chunk (`3fm6h3thsmzar.js`). That chunk contains `hydrateRoot`; Lighthouse measured about 732 ms of scripting there and estimated about 29 KB of unused transferred JavaScript. A 165 KB uncompressed Next.js client chunk (`3ebb14qanxulx.js`) added about 96 ms of scripting. Ten same-origin scripts transferred about 162 KB compressed; no third-party host appeared in the Lighthouse network list. A separate CPU-throttled profile also placed most sampled time in browser-native work, consistent with the style/layout cost. The homepage contained roughly 564 DOM elements and 93 KB of rendered HTML in that profile.

**Hydration** means React attaches event handling and state to HTML already rendered by Next.js. The existing `HeaderClient` and `ContactForm` need browser JavaScript, which brings in the shared React DOM and Next.js client runtime. The current evidence points to that shared startup work and initial page layout. The header's intersection observer was not a dominant sampled JavaScript task. Minified production function names prevent a reliable claim that one application callback causes the full delay.

## Small experiments to consider

1. Test `content-visibility: auto` on below-the-fold sections to reduce initial style/layout work. Measure TBT and layout shift; verify anchor navigation, keyboard access and responsive sizes before keeping it.
2. Test delaying contact-form hydration until the contact section approaches the viewport while keeping the form's server-rendered markup and validation behavior. Compare JavaScript transfer, TBT and real form interaction. Do not trade away working contact delivery for a score.
3. Compare a production mobile trace before and after each change. Keep only a repeatable improvement across several runs; Lighthouse's simulated mobile score varies with machine load.

No performance code change was made in this maintenance review. The Country Club Limbe screenshot is on a project route and does not add to the homepage startup path.
