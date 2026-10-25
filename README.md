# winerybooks.com

The marketing site for Winery Books: Rhea for small, owner-run wineries. A static Next.js 16 export (`out/`), served by
GitHub Pages at https://winerybooks.com. Built from rheafi.com's design (tokens, `globals.css`, header, footer,
waitlist form), with one brand and light mode only, like rheafi.com.

- The words: `src/content/copy.ts`, from the winerybooks.com copy, word for word.
- Prices: `src/lib/pricing.ts`, copied unchanged from rhea-site. The pricing table and the structured data read it;
  `tests/pricing.test.mjs` fails the build when a figure in the copy doesn't match it.
- The waitlist form posts to the same Formspree form as rheafi.com, with `_subject` "Pilot request from
  winerybooks.com" and a hidden `site` field "winerybooks.com".
- Privacy and terms are rheafi.com's (linked from the footer and the form).

## Run, build, check

```bash
npm ci
npm run dev        # http://localhost:3000
npm run lint
npm run build      # the pricing test, then next build to out/, then scripts/check-seo.mjs over out/
```

`npm run build` fails on: a price in the copy that `pricing.ts` doesn't back; a title of 60 characters or more; a
description over 155; a page without exactly one H1; a canonical without a trailing slash; JSON-LD that doesn't parse;
and the words the site never uses ("AI" as a word, Claude, Anthropic, "machine learning", "smart", "fake", "forecast"
outside a sentence about the National Weather Service, and the em dash).

The build fetches Inter Tight from Google Fonts through `next/font` (self-hosted in `out/`, no request from a visitor's
browser). Set `NEXT_PUBLIC_WAITLIST_URL` (see `.env.example`) for a local build whose form submits.

Images (`src/app/opengraph-image.png`, `apple-icon.png`, `favicon.ico`, `icon.svg`) are committed; regenerate them
with `npm run generate:images`.

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`: `npm ci`, lint, build, then publishes `out/` to GitHub
Pages. `public/CNAME` holds `winerybooks.com`.

### GitHub Pages settings (repo Settings, Pages)

1. Source: **GitHub Actions**.
2. Custom domain: **winerybooks.com**.
3. Tick **Enforce HTTPS** once GitHub has issued the certificate (it can take up to an hour after DNS resolves).

### DNS records (at the registrar for winerybooks.com)

| Type  | Host | Value                  |
|-------|------|------------------------|
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | alexgateley.github.io  |

Remove any parking A, AAAA or CNAME records the registrar added for `@` or `www` first.
