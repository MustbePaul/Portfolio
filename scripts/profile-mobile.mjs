import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// Run against a local production server, e.g. PORT=3051 npm run start.
// The Chrome trace and script coverage stay in ignored .lighthouseci/ files.
const label = process.argv[2] ?? "manual";
const target = process.env.PROFILE_URL ?? "http://localhost:3051/";
const output = resolve(".lighthouseci");
mkdirSync(output, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Profiler.enable");
  await cdp.send("Profiler.startPreciseCoverage", {
    callCount: true,
    detailed: true,
  });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  const traceComplete = new Promise((done) =>
    cdp.once("Tracing.tracingComplete", done),
  );
  await cdp.send("Tracing.start", {
    categories: "devtools.timeline,toplevel,v8,blink.user_timing",
    transferMode: "ReturnAsStream",
  });
  await page.goto(target, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const coverage = await cdp.send("Profiler.takePreciseCoverage");
  const domElements = await page.locator("*").count();
  await cdp.send("Tracing.end");
  const { stream } = await traceComplete;
  let raw = "";
  for (;;) {
    const chunk = await cdp.send("IO.read", { handle: stream });
    raw += chunk.base64Encoded
      ? Buffer.from(chunk.data, "base64").toString("utf8")
      : chunk.data;
    if (chunk.eof) break;
  }
  await cdp.send("IO.close", { handle: stream });
  writeFileSync(resolve(output, `trace-${label}.json`), raw);

  const events = JSON.parse(raw).traceEvents ?? [];
  const named = new Map();
  const longTasks = [];
  for (const event of events) {
    if (event.ph !== "X" || !event.dur) continue;
    if (
      [
        "Layout",
        "UpdateLayoutTree",
        "RecalculateStyles",
        "EvaluateScript",
        "FunctionCall",
        "Paint",
      ].includes(event.name)
    ) {
      named.set(event.name, (named.get(event.name) ?? 0) + event.dur / 1000);
    }
    if (event.name.endsWith("RunTask") && event.dur >= 50_000) {
      longTasks.push(Math.round(event.dur / 1000));
    }
  }
  const scripts = coverage.result
    .filter((script) => script.url.includes("/_next/static/"))
    .map((script) => ({
      url: script.url.replace(/^.*\/_next\//, "/_next/"),
      functions: script.functions.length,
      usedFunctions: script.functions.filter((fn) =>
        fn.ranges.some((range) => range.count > 0),
      ).length,
    }));
  const summary = {
    label,
    target,
    viewport: "390x844, 4x CPU throttle",
    domElements,
    eventDurationMs: Object.fromEntries(
      [...named].map(([name, ms]) => [name, Math.round(ms)]),
    ),
    longTasksMs: longTasks.sort((a, b) => b - a).slice(0, 10),
    scripts,
  };
  writeFileSync(
    resolve(output, `profile-${label}.json`),
    JSON.stringify(summary, null, 2),
  );
  console.log(JSON.stringify(summary, null, 2));
} finally {
  await browser.close();
}
