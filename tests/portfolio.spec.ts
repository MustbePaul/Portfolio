import { expect, test, type Page } from "@playwright/test";

const responsiveSizes = [
  { width: 280, height: 640 },
  { width: 320, height: 568 },
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 412, height: 915 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
];

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const documentWidth = document.documentElement.scrollWidth;
    const viewportWidth = document.documentElement.clientWidth;
    return documentWidth - viewportWidth;
  });
  expect(overflow).toBeLessThanOrEqual(1);
}

async function completeContactForm(page: Page) {
  await page.getByLabel("Name").fill("Test Visitor");
  await page
    .getByRole("textbox", { name: "Email", exact: true })
    .fill("visitor@example.com");
  await page.getByLabel("Subject").fill("Project enquiry");
  await page
    .getByLabel("Message")
    .fill("I would like to discuss a dependable web application.");
}

test("homepage loads without console errors and exposes production metadata", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Paul Napoleon Phiri" }),
  ).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^https:\/\/[^/]+\/?$/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /opengraph-image/,
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    "content",
    /twitter-image/,
  );
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
    "content",
    "1200",
  );
  await expect(
    page.locator('meta[property="og:image:height"]'),
  ).toHaveAttribute("content", "630");

  const fontFamily = await page
    .locator("body")
    .evaluate((element) => getComputedStyle(element).fontFamily);
  expect(fontFamily).toContain("IBM Plex Sans");
  const fontLoaded = await page.evaluate(async () => {
    await document.fonts.ready;
    return document.fonts.check('16px "IBM Plex Sans"');
  });
  expect(fontLoaded).toBe(true);
  expect(errors).toEqual([]);
});

test("hero CV actions point to the résumé route and PDF", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /View CV/i })).toHaveAttribute(
    "href",
    "/resume",
  );
  await expect(
    page.getByRole("link", { name: /Download CV/i }),
  ).toHaveAttribute("href", "/resume.pdf");
});

test("employment timeline matches the CV and labels NBC as concurrent", async ({
  page,
}) => {
  await page.goto("/");
  const cards = page.locator("#experience .experience-card");
  await expect(cards).toHaveCount(3);
  await expect(cards.nth(0)).toContainText("Country Club Limbe");
  await expect(cards.nth(0)).toContainText("October 2026");
  await expect(cards.nth(1)).toContainText("February 2026");
  await expect(cards.nth(2)).toContainText("November 2025");
  await expect(cards.nth(2)).toContainText("Family Business");
  await page.goto("/resume");
  await expect(page.getByRole("link", { name: /Download CV/ })).toBeVisible();
});

test("desktop navigation moves to project content", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page.locator("#projects")).toBeInViewport();
});

test("all homepage anchors resolve and project images load", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const hrefs = await page
    .locator("a[href]")
    .evaluateAll((links) =>
      links.map((link) => link.getAttribute("href") ?? ""),
    );
  const localPaths = new Set<string>();
  for (const href of hrefs) {
    if (href.startsWith("#")) {
      expect(await page.locator(href).count(), `Missing target ${href}`).toBe(
        1,
      );
    } else if (href.startsWith("/")) {
      localPaths.add(href);
    } else {
      expect(["https:", "mailto:", "tel:"], `Invalid link ${href}`).toContain(
        new URL(href).protocol,
      );
    }
  }
  for (const path of localPaths) {
    expect((await request.get(path)).status(), `Broken path ${path}`).toBe(200);
  }
  const images = page.locator("img");
  for (let index = 0; index < (await images.count()); index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate((element) =>
          element instanceof HTMLImageElement
            ? element.complete && element.naturalWidth > 0
            : false,
        ),
      )
      .toBe(true);
  }
});

test("mobile menu opens, closes, and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const menu = page.locator('button[aria-controls="mobile-navigation"]');

  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");

  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: /Contact/ })
    .click();
  await expect(page.locator("#contact")).toBeInViewport();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("résumé route presents the verified PDF and canonical URL", async ({
  page,
}) => {
  await page.goto("/resume");
  await expect(
    page.getByRole("heading", { level: 1, name: "Paul Napoleon Phiri" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Download CV \(PDF\)/i }),
  ).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^https:\/\/.+\/resume$/,
  );
});

test("project catalogue filters by category and relationship", async ({
  page,
}) => {
  await page.goto("/projects");
  await expect(page.getByRole("status")).toContainText("10 projects");
  await page.getByLabel("Project category").selectOption("Mobile applications");
  await expect(page.getByRole("status")).toContainText("3 projects");
  await page.getByLabel("Project relationship").selectOption("Personal");
  await expect(page.getByRole("status")).toContainText("1 project");
  await expect(
    page.getByRole("heading", { name: "Serenity Hub" }),
  ).toBeVisible();
});

test("case study explains attribution and release status", async ({ page }) => {
  await page.goto("/projects/buszathu-mobile");
  await expect(
    page.getByRole("heading", { level: 1, name: "BusZathu Mobile" }),
  ).toBeVisible();
  await expect(
    page.getByText(/not the web platform, backend or payment infrastructure/),
  ).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/projects\/buszathu-mobile$/,
  );
});

test("validates the contact form", async ({ page }) => {
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Enter at least 2 characters.")).toBeVisible();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await expect(page.getByText("Enter at least 3 characters.")).toBeVisible();
  await expect(page.getByText("Enter at least 10 characters.")).toBeVisible();
});

test("shows contact success only after API acceptance", async ({ page }) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    }),
  );
  await page.goto("/#contact");
  await completeContactForm(page);
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText(/Message sent/)).toBeVisible();
});

test("shows contact delivery errors", async ({ page }) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({
        error: "Message delivery failed. Please try again or use email.",
      }),
    }),
  );
  await page.goto("/#contact");
  await completeContactForm(page);
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator(".form-note-error")).toContainText(
    "Message delivery failed",
  );
});

test("engagement-option items are not duplicated", async ({ page }) => {
  await page.goto("/#services");
  for (const option of [
    "Full-Stack Web Application Development",
    "Mobile Application Development",
    "API Development and Integration",
    "Business Systems and Workflow Automation",
    "Software Maintenance and Improvement",
  ]) {
    const list = page.getByRole("list", { name: `${option} covers` });
    const labels = await list.getByRole("listitem").allTextContents();
    expect(labels).toEqual([...new Set(labels)]);
  }
});

test("résumé PDF downloads from /resume.pdf", async ({ request }) => {
  const response = await request.get("/resume.pdf");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  const body = await response.body();
  expect(body.subarray(0, 5).toString()).toBe("%PDF-");
  expect(body.length).toBeGreaterThan(10_000);
  expect(
    (body.toString("latin1").match(/\/Type\s*\/Page\b/g) ?? []).length,
  ).toBe(2);
});

test("contact API rate-limits excessive submissions", async ({ request }) => {
  const payload = {
    name: "Rate Limit Check",
    email: "visitor@example.com",
    subject: "Automated check",
    message: "This automated message should be rate limited after five sends.",
    website: "",
  };
  let limited = false;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const response = await request.post("/api/contact", { data: payload });
    if (response.status() === 429) {
      limited = true;
      break;
    }
    expect([503, 422]).toContain(response.status());
  }
  expect(limited).toBe(true);
});

for (const size of responsiveSizes) {
  test(`has no horizontal overflow at ${size.width}x${size.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(size);
    await page.goto("/");
    await expectNoHorizontalOverflow(page);
  });
}
