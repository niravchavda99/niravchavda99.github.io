import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("portrait is shown once in the opening view and career details are reachable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const portrait = page.getByRole("img", {
    name: "Portrait of Nirav Chavda",
    exact: true,
  });
  await expect(portrait).toHaveCount(1);
  await expect(portrait).toBeInViewport();
  await expect(page.locator(".hero-identity")).toContainText(
    "Tech Lead at Incubyte",
  );
  await page.locator("#toolkit").scrollIntoViewIfNeeded();
  await page.evaluate(() =>
    Promise.all(
      [
        ...document.querySelectorAll<HTMLImageElement>(".technology-icon img"),
      ].map((image) => {
        image.loading = "eager";
        return image.decode();
      }),
    ),
  );
  await expect(page.locator(".technology-icon")).not.toHaveCount(0);
  await page
    .locator(".quick-navigation")
    .getByRole("link", { name: "Experience", exact: true })
    .click();
  const currentRole = page.locator(".journey-item").filter({
    has: page.getByRole("heading", { name: "Tech Lead", exact: true }),
  });
  await expect(currentRole).toContainText("Aug 2026");
  await expect(currentRole.locator(".organization-logo img")).toBeVisible();
  await expect(currentRole.locator(".career-duration")).not.toBeEmpty();
  await page
    .locator(".quick-navigation")
    .getByRole("link", { name: "Education", exact: true })
    .click();
  await expect(page).toHaveURL(/#education$/);
  const education = page.locator(".education-item");
  await expect(education.first().locator(".career-duration")).toHaveText(
    "3 years",
  );
  await expect(
    education.first().locator(".organization-logo img"),
  ).toBeVisible();
});

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
  const canvas = page.locator(".orbital-canvas");
  await expect(canvas).toBeVisible();
  const initial = await canvas.evaluate((element) =>
    (element as HTMLCanvasElement).toDataURL(),
  );
  await expect
    .poll(() =>
      canvas.evaluate((element) => (element as HTMLCanvasElement).toDataURL()),
    )
    .not.toBe(initial);
  await page.getByRole("button", { name: "Binary field", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Binary field", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Send a pulse", exact: true }).click();
  await page.getByRole("button", { name: "Pause animations" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  await page.waitForTimeout(80);
  const paused = await canvas.evaluate((element) =>
    (element as HTMLCanvasElement).toDataURL(),
  );
  await page.waitForTimeout(200);
  expect(
    await canvas.evaluate((element) =>
      (element as HTMLCanvasElement).toDataURL(),
    ),
  ).toBe(paused);
  await page.getByRole("button", { name: "Play animations" }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(80);
  const reduced = await canvas.evaluate((element) =>
    (element as HTMLCanvasElement).toDataURL(),
  );
  await page.waitForTimeout(200);
  expect(
    await canvas.evaluate((element) =>
      (element as HTMLCanvasElement).toDataURL(),
    ),
  ).toBe(reduced);
});

test("camera works with a keyboard and reset restores the scene", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const canvas = page.locator(".orbital-canvas");
  await page.getByRole("button", { name: "Reset simulation" }).click();
  const snapshot = () =>
    canvas.evaluate((element) => (element as HTMLCanvasElement).toDataURL());
  const initial = await snapshot();
  await canvas.focus();
  await page.keyboard.press("ArrowRight");
  expect(await snapshot()).not.toBe(initial);
  await page.keyboard.press("Home");
  expect(await snapshot()).toBe(initial);
  await page.keyboard.press("ArrowUp");
  await page.getByRole("button", { name: "Reset simulation" }).click();
  expect(await snapshot()).toBe(initial);
  await page.getByRole("link", { name: "Explore skills", exact: true }).click();
  await expect(page).toHaveURL(/#toolkit$/);
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
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link")
    .first()
    .focus();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Journey" })
    .click();
  await expect(page).toHaveURL(/#journey$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("keyboard visitors can skip navigation and reveal long sections", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  const results = await new AxeBuilder({ page })
    .include(".skip-link")
    .withTags(["wcag2aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  const about = page.locator("#about .reveal");
  await expect(about).toHaveClass(/reveal-ready/);
  await page.addStyleTag({
    content: "#about .reveal { min-height: 14000px; }",
  });
  await page.locator("#about").evaluate((element) => element.scrollIntoView());
  await expect(about).toHaveClass(/is-revealed/);
  await expect(about).toHaveCSS("opacity", "1");
});

test("navigation fits a short viewport and closes at desktop width", async ({
  page,
}) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  const navigation = page.getByRole("navigation", {
    name: "Mobile navigation",
  });
  const bounds = await navigation.boundingBox();
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(390);
  await navigation.getByRole("link", { name: "All projects" }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await toggle.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(navigation).toHaveCount(0);
});
