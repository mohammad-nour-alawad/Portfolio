# Mohammad Nour Al Awad - Multilingual Next.js Portfolio

This portfolio is built with Next.js using static export, so it can be hosted on GitHub Pages with good SEO and fast loading.

## Local development

```bash
npm install
npm run dev
```

## Build for static hosting

```bash
npm run build
```

The static output is generated in `out/`.

## Content editing (JSON-first)

Portfolio content remains JSON-driven and is grouped by locale:
- `data/en/` for the English root page
- `data/ar/` for `/ar/`
- `data/ru/` for `/ru/`

Each locale contains `profile.json`, `about.json`, `experience.json`, `study.json`, `papers.json`, `reviews.json`, and `ui.json`. Shared identity and profile links live in `data/identity.json` and `data/links.json`.

The Russian name is configured as `Ал Авад Мохаммад Нур` in `data/identity.json`. Update that single field if the preferred official spelling changes.

Static files are served from `public/assets/`.

## Local source archive

Non-deployable source material can be organized under `.archive/`. This directory is ignored by Git and is not included in the GitHub Pages artifact.

## GitHub Pages deployment

This repo includes a workflow at `.github/workflows/deploy.yml` that:
1. Builds the Next.js app as static files.
2. Auto-configures `basePath` for project pages.
3. Deploys `out/` to GitHub Pages.

## SEO

The app includes:
- Locale-specific metadata and reciprocal `hreflang` links
- One shared Person entity and stable JSON-LD `@id`
- `app/robots.js`
- `app/sitemap.js`

Set `NEXT_PUBLIC_SITE_URL` in CI for production canonical URLs.

## Visit counter

The visit counter uses an image badge from [hits.sh](https://hits.sh/), which works with the static GitHub Pages export and tracks page loads rather than unique users.

You can control the tracked site path with:
- `NEXT_PUBLIC_COUNTER_TARGET`
