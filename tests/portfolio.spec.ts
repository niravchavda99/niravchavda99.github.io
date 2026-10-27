import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("static assets and custom 404 are exported", async ({ request }) => {
  for (const path of [
    "/",
    "/projects/",
    "/icon.svg",
    "/robots.txt",
    "/sitemap.xml",
    "/.nojekyll",
  ]) {
    expect((await request.get(path)).status()).toBe(200);
  }
  const missing = await request.get("/this-page-does-not-exist/");
  expect(missing.status()).toBe(404);
  expect(await missing.text()).toContain("A little");
});

test("pages meet automated WCAG accessibility checks", async ({ page }) => {
  for (const path of ["/", "/projects/"]) {
    await page.goto(path);
    await page.emulateMedia({ reducedMotion: "reduce" });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
});

test("static home preserves content and fits the viewport", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Software,",
  );
  expect(await page.locator(".project-card").count()).toBeGreaterThan(0);
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await expect(
    page.getByRole("link", { name: "niravchavda.dev@gmail.com" }),
  ).toHaveAttribute("href", "mailto:niravchavda.dev@gmail.com");
  expect(errors).toEqual([]);
});

test("all project filters and direct static route work", async ({ page }) => {
  await page.goto("/projects/");
  for (const name of ["All", "Tools", "Experiments", "Web apps", "All"]) {
    const filter = page.getByRole("button", { name, exact: false });
    const count = Number(await filter.locator("span").textContent());
    await filter.click();
    await expect(page.locator(".project-card")).toHaveCount(count);
    await expect(filter).toHaveAttribute("aria-pressed", "true");
  }
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Curiosity",
  );
});

test("motion can be paused and reduced motion is respected", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Pause animations" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  expect(
    await page
      .locator(".orbital-group")
      .evaluate((el) => getComputedStyle(el).animationPlayState),
  ).toBe("paused");
  await page.getByRole("button", { name: "Play animations" }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator(".orbital-group")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});

test("mobile navigation opens, closes, and reaches a section", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile",
    "Mobile navigation is only shown on small screens",
  );
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open navigation" });
  await menu.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Journey" })
    .click();
  await expect(page).toHaveURL(/#journey$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});
