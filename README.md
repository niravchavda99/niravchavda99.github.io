# Nirav Chavda — Portfolio

An original editorial portfolio, built with Next.js, React, TypeScript, and Tailwind CSS 4. All UI components and the animated SVG craft engine are authored in this repository.

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
- `src/index.css`: Tailwind import, design tokens, responsive layouts, and motion.
- `CONTENT.md`: original content inventory and known information gaps.

Only navigation, project filtering, pointer interaction, and scroll observation require client JavaScript. Animation uses CSS and SVG; no animation runtime is shipped. Fonts are self-hosted. Reduced motion and manual pause are supported. The existing custom-domain metadata is retained.

## GitHub Pages

`next.config.mjs` retains `output: 'export'` and `distDir: 'dist'`. Trailing slashes generate a real `projects/index.html` for Pages. `public/.nojekyll` preserves Next.js underscore asset paths.

The existing `.github/workflows/publish.yml` builds on pushes to **main** or manual dispatch and uploads **dist** to Pages. The `ui/overhaul` branch is for review and does not automatically publish. Merge to main when ready. The legacy `pnpm deploy` command also targets `dist`.
