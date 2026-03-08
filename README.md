# Mohammad Nour Al Awad - Next.js Portfolio

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

All portfolio content is still JSON-driven:
- `data/profile.json`
- `data/about.json`
- `data/experience.json`
- `data/study.json`
- `data/papers.json`
- `data/reviews.json`
- `data/links.json`

Static files are served from `public/assets/`.

## GitHub Pages deployment

This repo includes a workflow at `.github/workflows/deploy.yml` that:
1. Builds the Next.js app as static files.
2. Auto-configures `basePath` for project pages.
3. Deploys `out/` to GitHub Pages.

## SEO

The app includes:
- Metadata in `app/layout.js`
- Structured data (Person schema) in `app/page.js`
- `app/robots.js`
- `app/sitemap.js`

Set `NEXT_PUBLIC_SITE_URL` in CI for production canonical URLs.

## Visit counter

The visit counter uses [countapi.xyz](https://countapi.xyz/) from the browser. It tracks page loads, not unique users.

You can control its namespace with:
- `NEXT_PUBLIC_COUNTER_NAMESPACE`
