import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const rc = JSON.parse(readFileSync(resolve(root, "lighthouserc.json"), "utf8"));
const collect = rc.ci.collect;
const assertions = rc.ci.assert.assertions;
const reportDir = resolve(root, ".lighthouseci");
const mobile = process.argv.includes("--mobile");
const profileDir = resolve(reportDir, "chrome-profile");
const url = collect.url[0];
const serverPort = new URL(url).port;

function waitForServer(child) {
  const readyPattern = new RegExp(collect.startServerReadyPattern);

  return new Promise((resolveReady, rejectReady) => {
    const timeout = setTimeout(
      () => rejectReady(new Error("Timed out waiting for production server.")),
      120_000,
    );

    child.stdout.on("data", (chunk) => {
      const text = chunk.toString();
      process.stdout.write(`[Server] ${text}`);
      if (readyPattern.test(text)) {
        clearTimeout(timeout);
        resolveReady();
      }
    });

    child.stderr.on("data", (chunk) => {
      process.stderr.write(`[Server] ${chunk.toString()}`);
    });

    child.on("exit", (code) => {
      clearTimeout(timeout);
      rejectReady(
        new Error(`Production server exited early with code ${code}.`),
      );
    });
  });
}

function thresholdFor(category) {
  const rule = assertions[`categories:${category}`];
  return rule?.[1]?.minScore ?? 1;
}

function assertScores(lhr) {
  const failures = [];

  for (const category of [
    "performance",
    "accessibility",
    "best-practices",
    "seo",
  ]) {
    const score = lhr.categories[category].score;
    const minScore = thresholdFor(category);
    const display = Math.round(score * 100);
    const minDisplay = Math.round(minScore * 100);
    console.log(`${category}: ${display} (min ${minDisplay})`);
    if (score < minScore)
      failures.push(`${category} ${display} < ${minDisplay}`);
  }

  if (failures.length > 0) {
    throw new Error(`Lighthouse thresholds failed: ${failures.join(", ")}`);
  }
}

function stopServer(child) {
  if (!child.pid) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
      stdio: "ignore",
    });
    return;
  }
  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {
    child.kill("SIGTERM");
  }
}

function stopChromeUsingProfile() {
  if (process.platform !== "win32") return;
  // chrome-launcher's original PID can exit while a child Chrome process remains.
  // Match only this audit's isolated profile, leaving other Chrome windows alone.
  const command =
    "$profilePath = $env:LIGHTHOUSE_CHROME_PROFILE; " +
    "Get-CimInstance Win32_Process -Filter \"name='chrome.exe'\" | " +
    'Where-Object { $_.CommandLine -like "*$profilePath*" } | ' +
    "ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }";
  const result = spawnSync(
    "powershell.exe",
    ["-NoProfile", "-Command", command],
    {
      env: { ...process.env, LIGHTHOUSE_CHROME_PROFILE: profileDir },
      encoding: "utf8",
    },
  );
  if (result.status !== 0) {
    console.warn(`Chrome profile cleanup warning: ${result.stderr.trim()}`);
  }
}

mkdirSync(reportDir, { recursive: true });
rmSync(profileDir, { recursive: true, force: true });
mkdirSync(profileDir, { recursive: true });

const server = spawn("npm run start", {
  cwd: root,
  env: { ...process.env, PORT: serverPort },
  detached: process.platform !== "win32",
  shell: true,
  stdio: ["ignore", "pipe", "pipe"],
});

let chrome;

try {
  await waitForServer(server);
  chrome = await chromeLauncher.launch({
    userDataDir: profileDir,
    chromeFlags: [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--disable-dev-shm-usage",
    ],
  });

  const result = await lighthouse(url, {
    ...(mobile
      ? {
          formFactor: "mobile",
          screenEmulation: {
            mobile: true,
            width: 390,
            height: 844,
            deviceScaleFactor: 2,
            disabled: false,
          },
          throttlingMethod: "simulate",
        }
      : collect.settings),
    port: chrome.port,
    output: "json",
    logLevel: "error",
  });

  if (!result) throw new Error("Lighthouse did not return a result.");

  writeFileSync(
    resolve(reportDir, mobile ? "mobile-report.json" : "local-report.json"),
    JSON.stringify(result.lhr, null, 2),
  );
  if (mobile) {
    for (const category of [
      "performance",
      "accessibility",
      "best-practices",
      "seo",
    ]) {
      console.log(
        `${category}: ${Math.round(result.lhr.categories[category].score * 100)}`,
      );
    }
  } else {
    assertScores(result.lhr);
  }
} finally {
  if (chrome) {
    try {
      await chrome.kill();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      // Chrome can exit by itself after the audit, before chrome-launcher cleans up.
      if (!/process .* not found/i.test(message)) {
        console.warn(`Chrome cleanup warning: ${message}`);
      }
    }
  }
  stopChromeUsingProfile();
  stopServer(server);
  try {
    rmSync(profileDir, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 200,
    });
  } catch (error) {
    console.warn(
      `Chrome profile cleanup warning: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
