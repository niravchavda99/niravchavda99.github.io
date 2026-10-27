# Nirav Chavda — Portfolio

An original orbital observatory portfolio, built with Next.js, React, TypeScript, and Tailwind CSS 4. All UI components, motion graphics, and the interactive gravitational world are authored in this repository.

## Run locally

Requires Node.js 20.9+ and pnpm 10.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Check and preview

```sh
pnpm typecheck
pnpm build
pnpm preview
pnpm exec playwright install chromium
pnpm test:e2e
```

The preview serves the actual static export, including direct `/projects/` navigation. Browser tests cover content, filters, navigation, viewport overflow, pause controls, and reduced motion.

## Maintain

- `src/content/portfolio.ts`: personal information, work, education, skills, and activities.
- `src/content/projects.ts`: project metadata, screenshot imports, and links.
- `src/components/studio/`: original, focused interactive components.
- `src/app/`: server-rendered page composition and metadata.
- `src/index.css`: Tailwind import, design tokens, and shared layouts.
- `src/sections.css`: project showcases, personal introduction, toolkit, and career timeline layouts.
- `src/motion.css`: orbital controls and shared motion effects.
- `CONTENT.md`: original content inventory and known information gaps.

The full-width hero is a procedural Canvas world: three-dimensional softened Newtonian gravity drives an orbital debris belt using velocity-Verlet integration. Generated terrain, independently rotating clouds, ocean highlights, atmospheric scattering, and a day/night boundary give the planet depth. Moons link directly to portfolio sections. Drag with a mouse or use arrow keys to orbit the camera; Home restores the view. Controls switch to a binary field, send a pulse, or reset the simulation.

Physics lives in `src/lib/orbital-physics.ts`, projection and scene painting in `src/lib/orbital-renderer.ts`, generated surfaces in `src/lib/planet-surface.ts`, and lifecycle/input in `src/components/studio/orbital-world.tsx`. No animation engine, stock video, downloaded textures, or remote assets are used.

The renderer caps resolution and frame rate, reduces particle count on mobile, stops simulation offscreen and in hidden tabs, and honors reduced motion and the global pause control. Remaining animation lives in `src/motion.css`. Fonts are self-hosted. The midnight/platinum/sapphire palette is defined in `src/index.css` and shared across every page. The existing custom-domain metadata is retained.

## Add content in code

Add an object to `projects` in `src/content/projects.ts`. No component edits are needed. The first four entries appear on the homepage; every entry appears in the collection. Counts, filter totals, and collection metadata update automatically. Screenshots and source links are optional; projects without screenshots get a branded graphic.

```ts
{
  name: "New project",
  category: "Tools", // "Tools" | "Web apps" | "Experiments"
  description: "What it does and who it helps.",
  href: "https://example.com",
  tags: ["React", "TypeScript"],
  color: "sapphire", // "sapphire" | "teal" | "slate" | "violet"
  // image: importedScreenshot, // optional static image import
  // source: "https://github.com/...", // optional
},
```

Add an object to `experience` in `src/content/portfolio.ts`, newest first:

```ts
{
  start: "2026-11", // YYYY-MM
  // end: "2027-05", // omit for a current role
  role: "Your role",
  company: "Company",
  location: "Remote", // optional; defaults to Remote
  href: "https://example.com",
  description: "The work you do and what matters about it.", // optional
},
```

Education, skills, activities, and social links follow the same array-of-objects structure. Run `pnpm build` after editing; TypeScript checks the content shape. Browser tests adapt to project counts so routine additions do not require test edits.

Career and education date ranges and durations are generated from start/end months. End months are **exclusive**: January–July is six months. Current roles update their duration when the page is visited, even between static deployments. `src/content/visuals.ts` maps names to optional existing logos: unknown organizations and technologies get a generic icon automatically, so content additions never require component edits.

## GitHub Pages deployment

`next.config.mjs` retains `output: 'export'` and `distDir: 'dist'`. Trailing slashes generate a real `projects/index.html` for Pages. `public/.nojekyll` preserves Next.js underscore asset paths.

The existing `.github/workflows/publish.yml` builds on pushes to **main** or manual dispatch and uploads **dist** to Pages. The `ui/overhaul` branch is for review and does not automatically publish. Merge to main when ready. The legacy `pnpm deploy` command also targets `dist`.
