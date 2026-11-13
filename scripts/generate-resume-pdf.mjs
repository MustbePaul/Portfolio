// Regenerates public/resume.pdf from the canonical source resume/paul-phiri-cv.html.
// Run: npm run resume:pdf  (requires Playwright's Chromium: npx playwright install chromium)
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(root, "resume/paul-phiri-cv.html");
const output = resolve(root, "public/resume.pdf");

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(`file://${source}`, { waitUntil: "networkidle" });
  await page.pdf({
    path: output,
    printBackground: true,
    preferCSSPageSize: true,
  });
} finally {
  await browser.close();
}

const bytes = readFileSync(output);
if (bytes.subarray(0, 5).toString() !== "%PDF-") {
  throw new Error("Generated file is not a valid PDF.");
}
mkdirSync(resolve(root, "public"), { recursive: true });
writeFileSync(resolve(root, "public/resume.pdf"), bytes);
console.log(`Wrote public/resume.pdf (${bytes.length} bytes)`);
