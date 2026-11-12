# The School Expert — public website

React 19, TypeScript, Vite 6 and Tailwind CSS 4 power this public marketing site. Framer Motion supplies animations and Lucide supplies icons. There is no backend, database, login, account dashboard or local registration API in this repository.

## Run and verify

Use Node.js **20.19 or newer** and npm. Run from this `frontend` directory:

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build
npm run preview
```

On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`. Development normally uses `http://localhost:5173`; preview normally uses `http://localhost:4173`. Use the URL printed by Vite if a port is occupied. There is no lint script. Tests use Node's built-in test runner and the existing TypeScript compiler; no extra test package is needed.

The build runs TypeScript, Vite, and SEO generation, producing `dist/`. Preview serves the built files locally. It is not a production server.

## Pages and behavior

`src/config/routes.json` is the shared route inventory for the frontend and sitemap. It includes Home, the Founding Partner Programme, About, Contact, FAQs, Privacy Policy, Terms & Conditions, Cookie Policy and the four audience pages, with their existing aliases. Unknown URLs render a noindex Page not found screen. Static hosting still needs the supplied SPA fallback; the client screen alone cannot set an HTTP 404 status.

- Explore the Platform opens a role dialog. Choosing a role navigates to a Coming Soon audience page. It does not create an account or persist a role.
- Navbar More entries lead to the home Services section from any page. Desktop More supports hover, click, keyboard focus and Escape. Tablet/mobile widths use the collapsible menu.
- The logo navigates home. Footer links are standard anchors.
- Registration Centre navigates to `https://registration.schoolexpert.in`, whose implementation is separate.
- Contact links open website/email/phone handlers; there is no submission form.
- FAQs search bundled content locally. Only one answer is expanded at a time.
- Role dialog focus is contained, background content is inert, Escape/backdrop/Close dismiss it, and focus/scroll state is restored.

## Optional public configuration

Copy `.env.example` to `.env` only when `.env` does not already exist. Never put secrets in `VITE_` variables; they are public build-time values.

| Variable | Behavior |
|---|---|
| `VITE_SITE_URL` | Absolute HTTP(S) public site base URL; enables canonical URLs and sitemap |
| `VITE_SUPPORT_EMAIL` | Overrides the Contact page email; defaults to the existing `info@schoolexpert.in` |
| `VITE_SOCIAL_LINKEDIN` | Overrides the existing LinkedIn profile |
| `VITE_SOCIAL_INSTAGRAM` | Overrides the existing Instagram profile |
| `VITE_SOCIAL_YOUTUBE` | Adds a YouTube footer link when supplied |
| `VITE_SOCIAL_FACEBOOK` | Adds a Facebook footer link when supplied |

Social links accept HTTP(S) URLs without embedded credentials. Invalid values are omitted; missing/empty LinkedIn and Instagram values preserve existing profiles. Policy/FAQ contact wording is authored content and is not automatically rewritten by environment settings.

The production SEO generator uses Vite's environment precedence: process environment, `.env.production.local`, `.env.production`, `.env.local`, `.env`. Without `VITE_SITE_URL`, it writes robots.txt and skips/removes sitemap.xml. Rebuild to change configuration in a deployed site.

If deliberately building a custom Vite mode, pass the same mode to both stages:

```sh
npm run typecheck
npx vite build --mode staging
node scripts/generate-seo-files.mjs staging
```

## Content and assets

- Home content lives in `src/pages/Home/sections` and `src/components/Hero`.
- FAQ content lives in `src/pages/FAQs/faq-data.json`. Answers are structured text/paragraph/list/strong/link nodes rendered with React escaping, not raw HTML. Preserve unique question IDs. The same content structure supplies search text.
- Each policy imports its adjacent JSON. `privacy-policy.json` is the authoritative active privacy text; the obsolete unused TypeScript copy was removed. No displayed policy wording was changed by the bug fixes.
- Active branding is configured in `src/config/site.ts`. See `public/images/README.md` for current image paths.
- Secondary pages load on demand. A page error boundary offers reload if a lazy page cannot load.

## Deployment

Publish `dist/` to static hosting after `npm run build`. For Vercel, set the project root to this frontend directory; `vercel.json` serves index.html for route refreshes. Configure equivalent SPA fallback on other hosts. This repository does not provision hosting, database services, containers or CI/CD. No deployment is performed by the build.

The sitemap contains the eight indexable canonical pages. Audience placeholders and aliases are excluded. `public/robots.txt` is the source for both development and generated crawler rules. Page-specific metadata is currently applied by React; crawler/social-preview verification and any future prerendering remain separate work.

## Checks and limitations

`npm test` covers route resolution, malformed fragments, reduced-motion scroll selection, FAQ search/HTML escaping/safe URLs, visible configuration overrides and SEO environment precedence/output. These are source/component/logic tests, not browser interaction or viewport tests. See `BUGFIX_REPORT.md` for executed checks and remaining manual QA.
