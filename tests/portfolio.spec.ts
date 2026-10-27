import { expect, test } from "@playwright/test";

test("static home preserves content and fits the viewport", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Software,",
  );
  await expect(page.locator(".project-card")).toHaveCount(4);
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
  await expect(page.locator(".project-card")).toHaveCount(8);
  await page.getByRole("button", { name: "Tools" }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Experiments" }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await page.getByRole("button", { name: "Web apps" }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
  await page.getByRole("button", { name: "All", exact: false }).click();
  await expect(page.locator(".project-card")).toHaveCount(8);
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
