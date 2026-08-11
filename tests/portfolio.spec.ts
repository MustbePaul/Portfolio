import { expect, test } from "@playwright/test";

test("loads without console errors and exposes production metadata", async ({
  page,
}, testInfo) => {
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
    "https://portfolio-ci.vercel.app",
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

  if (testInfo.project.name === "chromium") {
    await page.getByRole("link", { name: "Projects", exact: true }).click();
    await expect(page.locator("#projects")).toBeInViewport();
    await expect(
      page.getByRole("link", { name: /Download résumé/i }),
    ).toHaveAttribute("href", "/resume.pdf");
  }
});

test("validates the contact form", async ({ page }) => {
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Enter at least 2 characters.")).toBeVisible();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await expect(page.getByText("Enter at least 3 characters.")).toBeVisible();
  await expect(page.getByText("Enter at least 10 characters.")).toBeVisible();
});

async function completeContactForm(page: import("@playwright/test").Page) {
  await page.getByLabel("Name").fill("Test Visitor");
  await page
    .getByRole("textbox", { name: "Email", exact: true })
    .fill("visitor@example.com");
  await page.getByLabel("Subject").fill("Project enquiry");
  await page
    .getByLabel("Message")
    .fill("I would like to discuss a dependable web application.");
}

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

test("mobile navigation opens and navigates", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile-chromium",
    "mobile-only behavior",
  );
  await page.goto("/");
  const menu = page.locator('button[aria-controls="mobile-navigation"]');
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: /Contact/ })
    .click();
  await expect(page.locator("#contact")).toBeInViewport();
});
