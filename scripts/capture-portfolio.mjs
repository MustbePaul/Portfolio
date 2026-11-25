import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const output = process.argv[2];
if (!output) throw new Error("Pass an output directory outside public/.");
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
for (const [name, width, height] of [
  ["mobile", 390, 844],
  ["tablet", 768, 1024],
  ["desktop", 1440, 900],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  for (const [route, file] of [
    ["/", "home"],
    ["/projects", "projects"],
    ["/projects/serenity-hub", "case-study"],
  ]) {
    await page.goto(`http://127.0.0.1:3000${route}`);
    for (const image of await page.locator("img").all())
      await image.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: join(output, `${file}-${name}.png`),
      fullPage: true,
      animations: "disabled",
    });
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    console.log(`${route} ${name}: horizontal overflow ${overflow}px`);
  }
  await page.close();
}
await browser.close();
