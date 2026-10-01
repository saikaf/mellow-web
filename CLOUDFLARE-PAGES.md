# Mellow Web — Cloudflare Pages

The site exports static HTML with Next.js. No runtime Node.js server or Pages Functions are required.

## Dashboard settings

- Project name: `mellow-web` (subject to availability)
- Framework preset: `Next.js (Static HTML Export)`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `out`
- Root directory: repository root
- Node.js: 24 (`.node-version`)

## Environment variable names (do not put secrets in NEXT_PUBLIC variables)

| Name | Production | Preview |
| --- | --- | --- |
| NEXT_PUBLIC_SITE_URL | Set to production origin for correct robots/sitemap/metadata | Set to desired preview origin, or production origin |
| NEXT_PUBLIC_CONTACT_EMAIL | Optional; existing recipient is the fallback | Optional |
| NEXT_PUBLIC_CONTACT_ENDPOINT | Leave unset to preserve current mail-app flow | Leave unset |

NEXT_PUBLIC_CONTACT_ENDPOINT is an existing optional browser POST endpoint. It is not an API key. Do not set it without configuring and testing a compatible external form service.

## Contact behavior

The form collects input, shows a review, then opens the user's email application with recipient and message. The user must send the email there. This is not server-side email delivery. The recipient is necessarily readable by the browser in a mailto flow; splitting its source string does not hide it. No SMTP/API secrets are used. Automatic email delivery with a hidden recipient requires a separately configured server/form service and is not enabled by this migration.

## Deploy

1. Push this project (including lockfiles and `.node-version`) to a GitHub repository, branch `main`.
2. Cloudflare: Workers & Pages → Create application → Pages → Import Git repository.
3. Enter the settings above, set NEXT_PUBLIC_SITE_URL to the chosen production origin, then deploy.
4. Check all direct routes, /#contact, and the form's email-app action. Send a real test from your own email app if needed.
5. If `mellow-web` is unavailable, use a name such as `mellow-web-studio` or `mellowweb-jp` and update NEXT_PUBLIC_SITE_URL before rebuilding.

The custom 404.html disables Pages' default SPA fallback. /contact redirects to /#contact via Pages _redirects and a client fallback. Sample list is the existing home section /#samples (not a separate route).

## Local checks

```sh
npm install
npm run build
npm run lint
npx tsc --noEmit
```

Build creates `out/`; do not commit build output or node_modules. Existing pnpm lockfile is retained; package-lock.json is included for npm. Do not run npm install against an existing pnpm-managed node_modules tree; use a clean checkout.

## Verification notes

Next.js static build and TypeScript checks passed. All page/asset paths and contact/sample anchors were checked in exported HTML. Existing lint findings: 10 no-html-link-for-pages errors and 6 no-img-element warnings; no UI or link behavior was changed merely to silence them. No OGP image or separate logo image exists; current text branding and OGP text metadata are preserved. Pages subdomain availability and real email delivery are only verifiable after account setup / sending from an email app.
