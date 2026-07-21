# US Home Project Estimator — Roofing MVP

A zero-backend, browser-only roofing debris and dumpster-size estimator designed for US homeowners and contractors.

## Run locally

```bash
npm test
npm run serve
```

Open `http://localhost:4173`.

## Before production

1. Choose the final brand and `.com` domain.
2. Replace every `https://yourdomain.com` canonical/sitemap value.
3. Replace the placeholder contact text in `privacy.html`.
4. Have a US roofing or waste professional review the methodology and test cases.
5. Add analytics and advertising only after updating the privacy/consent implementation.
6. Deploy to Cloudflare Pages, GitHub Pages, Netlify, or another static host.

## Architecture

- No framework or build step
- ES modules
- All calculations occur locally
- No database, API, or uploaded data
- Node built-in tests for the calculation engine
