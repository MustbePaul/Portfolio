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

test("hero résumé CTA points to the résumé route", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: /View résumé/i }),
  ).toHaveAttribute("href", "/resume");
});

test("desktop navigation moves to project content", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page.locator("#projects")).toBeInViewport();
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

test("résumé route renders with a visible print action and canonical URL", async ({
  page,
}) => {
  await page.goto("/resume");
  await expect(
    page.getByRole("heading", { level: 1, name: "Paul Napoleon Phiri" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Download \/ Print PDF/i }),
  ).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^https:\/\/.+\/resume$/,
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
  await page.goto("/#pricing");
  for (const option of [
    "Focused build",
    "Product sprint",
    "Ongoing engineering",
  ]) {
    const list = page.getByRole("list", { name: `${option} includes` });
    const labels = await list.getByRole("listitem").allTextContents();
    expect(labels).toEqual([...new Set(labels)]);
  }
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
