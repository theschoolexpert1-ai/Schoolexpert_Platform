# School Expert — bug fixes and verification

Date: 11 November 2026. Scope: the available frontend checkout. No backend, database or authentication implementation was found or added. No deployment, commit or push was performed.

The previous review was checked against the current source before editing. The existing modification to `public/favicon.svg` was preserved byte for byte. The parent README, outside the frontend writable root, was updated after explicit tool approval. All other source changes are inside the frontend workspace.

## 1. Issues identified

“Confirmed” below means established by current source inspection or an executed check. Browser behavior is not claimed as tested. Performance observations are not security vulnerabilities.

| ID | Issue | Severity | Affected source | Root cause |
|---|---|---|---|---|
| B01 | More menu actions do nothing on inner pages | Medium | Navbar.tsx | Only the current document is searched for `#services` |
| B02 | Logo does not return home | Medium | Logo.tsx | `href="#top"` targets the current page |
| B03 | Dialog lacks keyboard focus management | Medium | RoleSelectionModal.tsx | Scroll/Escape handling exists, but no initial focus, focus containment, background inert state or restoration |
| B04 | SEO ignores `.env.local` and mode-local settings | Medium | generate-seo-files.mjs | Handwritten env parsing differs from Vite |
| B05 | Large images and unconditional role-image downloads | Medium performance | RoleSelectionModal, Hero, AboutSection, PNG assets | Role art is preloaded at module evaluation; large PNGs are used for delivery |
| B06 | Active favicon has mismatched bytes/extension/MIME | Low–Medium | index.html, public/favicon.svg | Pre-existing user edit put PNG bytes under SVG naming |
| B07 | Unknown URLs display Home | Low–Medium | App.tsx | Unconditional Home fallback |
| B08 | Public social/contact settings do not affect visible links | Low–Medium | site.ts, Footer, Contact | Settings are parsed but separate values are hardcoded in components |
| B09 | Malformed URL fragments throw | Low | Layout.tsx | Unguarded decodeURIComponent |
| B10 | Privacy datasets disagree; section 45 branch is unreachable | Low–Medium | PrivacyPolicy.tsx, privacy-policy-data.ts, privacy-policy.json | Active JSON has 44 sections; unused alternative has more content |
| B11 | Sitemap lists only Home | Low | generate-seo-files.mjs | Public page list is incomplete and separate from routing |
| B12 | Production robots rules differ from source | Low | public/robots.txt, SEO script | Generator replaces source rules with its own string |
| B13 | Documentation describes obsolete modal behavior and assets | Low | Parent README, images README | Documentation did not track implementation changes |
| B14 | Inactive source escapes normal TypeScript checks | Low | tsconfig.app.json; unused modules | Only main.tsx and its import graph are included |
| B15 | All pages/content load eagerly | Low–Medium performance | App.tsx | Static imports include FAQ and policy data in the initial application chunk |
| B16 | FAQ rendering uses an unsanitized raw-HTML sink | Defense-in-depth | FAQs.tsx, faq-data.json | dangerouslySetInnerHTML renders authored HTML; no attacker-controlled input path was demonstrated |
| B17 | Desktop More has no explicit click state or Escape dismissal | Low–Medium accessibility | Navbar.tsx | CSS hover/focus-only disclosure lacks complete state and controls |
| B18 | Scroll callbacks ignore reduced-motion preference; delayed hash lookup is brittle | Low accessibility/reliability | Hero, Layout, navigation handlers | Unconditional smooth scrolling and a fixed 80 ms lookup |
| B19 | Lazy page load failures need a recoverable UI | Reliability, introduced requirement | App.tsx | Splitting pages means a failed chunk request must not leave an unrecoverable blank screen |
| B20 | Tablet navbar crowding risk; modal title shares close-button space | Layout risk, not visually reproduced | Navbar, RoleSelectionModal | Dense desktop navigation starts at md; dialog heading has no reserved close-button space |
| B21 | Some supported environment-file variants are not ignored | Low hygiene | .gitignore | Only .env and .env.local were ignored |

No known dependency advisory was reported by the successful npm audit. No credential leak or exploitable backend/authentication vulnerability was established.

## 2. Fixes implemented and verification

| ID | Implemented correction | Main files | Verification actually performed |
|---|---|---|---|
| B01 | Shared section navigation scrolls locally or navigates to the home fragment | navigation.ts, Navbar, Hero | Tests verify local scrolling and fallback URL; typecheck/build |
| B02 | Logo uses `/`; footer navigation uses real anchors | Logo, Footer | Rendered markup assertions verify home and section hrefs |
| B03 | Focus moves to Close; Tab/Shift+Tab are contained; root becomes inert; Escape/backdrop/Close dismiss; original focus, inert and overflow state are restored; exiting dialog becomes inert | RoleSelectionModal | Source inspection and typecheck/build; live keyboard testing remains required |
| B04 | SEO uses Vite loadEnv, including local/mode-local files and process precedence; validates HTTP(S) base URL | scripts/seo.mjs, generate-seo-files.mjs | Temporary-fixture tests reproduce local/mode/process precedence and reject executable URL schemes |
| B05 | Removed module-level preload; lossless WebP delivery art; campus lazy loading; explicit hero/campus dimensions; hero priority | RoleSelectionModal, Hero, AboutSection, six WebP files | All six decoded RGBA images exactly match originals; assets served successfully; size measurements below |
| B06 | Active icon points to favicon.png with image/png; original user-edited file is untouched | index.html, new public/favicon.png | Identical SHA-256/bytes to original artwork; HTTP image/png response |
| B07 | Explicit noindex not-found page; no canonical/og:url for unknown paths | App, NotFound, useDocumentMeta | Route tests reject unknown/login/prototype-like paths; not-found component renders; HTTP fallback checked |
| B08 | Footer consumes validated social config; Contact consumes supportEmail; existing public defaults remain | site.ts, Footer, Contact | Tests render configured email/social overrides and reject executable social URLs |
| B09 | Decode guarded; getElementById replaces selector parsing for fragments | navigation.ts | Tests include malformed encoding, encoded spaces, missing targets and selector-like fragments |
| B10 | Active JSON remains authoritative; obsolete unimported TypeScript copy and unreachable conditional removed | PrivacyPolicy.tsx; deleted privacy-policy-data.ts | Active JSON is unchanged; rendered page includes final section 44 |
| B11 | One route manifest supplies routing and the seven public canonical sitemap URLs | routes.json, routes.ts, App, SEO | Tests cover every alias and canonical URL; sitemap has seven entries and excludes audience placeholders/aliases |
| B12 | SEO reads the same public/robots.txt; stale sitemap is removed when URL is absent | public/robots.txt, SEO | Generated/source rules equality and stale sitemap removal tested |
| B13 | New authoritative frontend README; updated image guide; parent README points to current instructions | README files | Commands checked against package.json and executed where stated |
| B14 | All src files included in typecheck; obsolete roles and SmartImage modules removed; unused API declaration/props/data and Hero any removed | tsconfig, obsolete files, Hero, ServiceCard/ServicesSection, ComingSoon, Logo | Full src typecheck passes; source scan found no explicit any/raw HTML/preloading sink in TS/TSX |
| B15 | Secondary pages use React.lazy/Suspense; direct hash scrolling runs after page commit | App | Separate build chunks verified; route resolution tested; component render smoke checks |
| B16 | Answers are structured text/list/paragraph/strong/link nodes, rendered with React escaping and a URL allowlist | faq-data.json, FAQAnswer, faq-content, FAQs | Tests reject javascript/data/credentialed URLs and escape script-like text; all 26 original answers, questions and links compared with Git baseline |
| B17 | Stateful More disclosure with hover, click, Escape, outside-pointer/blur dismissal and aria-expanded/controls; hover gap bridged; menu entrance animation retained | Navbar, index.css | Source inspection and typecheck/build; pointer/keyboard browser verification remains |
| B18 | Scroll helper observes reduced motion; hash listener mounts after lazy content; skip-to-main link added; audience aliases use canonical primary path | navigation.ts, App, Layout, ComingSoon | Reduced-motion branch and fragment behavior tested; canonical source inspected |
| B19 | Page error boundary offers Reload; Suspense provides loading status | PageErrorBoundary, App | Typecheck/build; deliberate browser network-failure test not performed |
| B20 | Existing mobile navigation now remains active through tablet widths; heading reserves room for Close | Navbar, RoleSelectionModal | Defensive source adjustment; viewport measurements/screenshots remain unverified |
| B21 | Ignore `.env.*` while retaining `.env.example` | .gitignore | git check-ignore confirms production/local variants are ignored and example remains trackable |

Published policy wording and original artwork were not changed. Removed privacy text was an unused alternative source, not the JSON rendered on the site. No new production/test dependency was installed; package.json gained only a test command.

## 3. Remaining issues and limits

1. **Browser and responsive QA is incomplete.** The browser-access host was unavailable. A native Chrome attempt was then stopped by the computer-use tool because it could not confidently determine the current browser URL. No further UI input was attempted. This prevented screenshot comparisons, viewport testing, live focus/animation checks, browser refresh/back testing and browser-console inspection.
2. **The external Registration Centre cannot be audited from this checkout.** Its source, authentication, database and workflows remain outside scope. Audience pages intentionally remain Coming Soon; no feature was invented.
3. **A static SPA not-found screen does not set HTTP 404 status.** The supplied fallback and local preview return the HTML entry with status 200 for unknown paths. A correct client not-found page is now implemented; server-level status handling requires hosting configuration beyond the current catch-all.
4. **Crawler/social behavior remains unverified.** Page metadata is still client-rendered; a future prerendering/deployment decision may be appropriate. No live host security-header, cookie or crawler audit was performed.
5. **No production site URL is configured in this checkout.** The actual build correctly warns and skips sitemap.xml. Tests verify sitemap generation with temporary URL fixtures. Set VITE_SITE_URL for the intended deployment and rebuild.
6. **Large original PNGs are retained as source artwork.** The site requests the smaller WebP delivery files. The build copies public source art too, increasing output storage but not automatically transferring unused files to visitors. Further lossy compression/resizing was avoided to preserve exact pixels.
7. **The original user-modified favicon.svg remains in the working tree.** It is no longer referenced by index.html. It was neither reverted nor overwritten.
8. **Policy/business wording requires its owner's decisions.** References to features outside this checkout were not rewritten as if their organizational status were known.

No claim is made that the application is bug-free or visually regression-free because compilation passes.

## 4. Files modified, added or removed

Paths are relative to the frontend directory unless stated otherwise.

### Modified

| File | Change |
|---|---|
| `.gitignore` | Ignore supported environment variants while retaining example |
| `index.html` | Correct active favicon path/type |
| `package.json` | Add built-in Node regression test command |
| `public/images/README.md` | Current assets, exact-pixel conversion and active-logo instructions |
| `public/robots.txt` | Single current public-site crawler policy |
| `scripts/generate-seo-files.mjs` | Thin entry using shared/testable SEO generation and explicit mode |
| `src/App.tsx` | Shared route resolution, unknown route, lazy loading, loading/error handling, post-commit hash handling |
| `src/components/Footer/Footer.tsx` | Real navigation anchors and configured social links |
| `src/components/Hero/Hero.tsx` | Typed icon tuples, shared scroll helper, dialog semantics and WebP delivery/dimensions |
| `src/components/Layout/Layout.tsx` | Skip link/main focus target; remove brittle hash timer |
| `src/components/Logo/Logo.tsx` | Home link; remove unused tagline prop/misleading comment |
| `src/components/Navbar/Navbar.tsx` | Cross-page actions, accessible disclosure state, Escape handling, tablet breakpoint |
| `src/components/RoleSelectionModal/RoleSelectionModal.tsx` | Focus/inert/scroll lifecycle, no preload, WebP art, heading clearance |
| `src/components/ServiceCard/ServiceCard.tsx` | Remove unused features type field |
| `src/config/site.ts` | Validate public links/email; preserve existing defaults; wire public config |
| `src/hooks/useDocumentMeta.ts` | Allow no canonical and remove stale og:url |
| `src/index.css` | Accurate palette comment and accessible disclosure entrance animation |
| `src/pages/ComingSoon/ComingSoon.tsx` | Canonical primary audience paths; remove unused headings |
| `src/pages/Contact/Contact.tsx` | Configured support email |
| `src/pages/FAQs/FAQs.tsx` | Structured answer rendering, shared search logic and valid accordion controls |
| `src/pages/FAQs/faq-data.json` | Mechanical conversion of existing HTML to structured content; wording/links preserved |
| `src/pages/Home/sections/AboutSection.tsx` | Lossless WebP, lazy image, intrinsic dimensions |
| `src/pages/Home/sections/ServicesSection.tsx` | Remove unrendered features arrays; existing visible descriptions/links preserved |
| `src/pages/PrivacyPolicy/PrivacyPolicy.tsx` | Remove unreachable extra contact section/imports |
| `src/vite-env.d.ts` | Remove unused API URL declaration |
| `tsconfig.app.json` | Check all maintained src files |
| `../README.md` | Replace outdated overview with current-guide pointer; approval obtained |

### Added

| File | Purpose |
|---|---|
| `README.md` | Authoritative current development/configuration/deployment guide |
| `BUGFIX_REPORT.md` | This audit, change inventory and validation report |
| `public/favicon.png` | Existing user's icon bytes with correct name |
| `public/images/hero-students.webp` | Lossless delivery version |
| `public/images/school-building.webp` | Lossless delivery version |
| `public/images/role-school.webp` | Lossless delivery version |
| `public/images/role-parent.webp` | Lossless delivery version |
| `public/images/role-teacher.webp` | Lossless delivery version |
| `public/images/role-vendor.webp` | Lossless delivery version |
| `scripts/seo.mjs` | Tested SEO generation using Vite env loading |
| `src/components/PageErrorBoundary.tsx` | Page-level recovery screen |
| `src/config/routes.json` | Shared canonical route/alias/indexing inventory |
| `src/config/routes.ts` | Tested pathname normalization/resolution |
| `src/pages/FAQs/FAQAnswer.tsx` | Safe structured-content renderer |
| `src/pages/FAQs/faq-content.ts` | Answer types, safe links, text extraction and search |
| `src/pages/NotFound/NotFound.tsx` | Public not-found screen |
| `src/utils/navigation.ts` | Safe hash and home-section navigation |
| `tests/load-ts.mjs` | Test-only loader using existing TypeScript and Node modules |
| `tests/regression.test.mjs` | Seven regression test groups |

### Removed

| File | Reason |
|---|---|
| `src/components/ui/SmartImage.tsx` | Unused fallback utility; actual active images did not use it |
| `src/utils/roles.ts` | Unimported duplicate role metadata/helper |
| `src/pages/PrivacyPolicy/privacy-policy-data.ts` | Unimported competing policy dataset; active JSON unchanged |

`public/favicon.svg` was modified before this task and is not an agent modification. `package-lock.json` and dependency versions are unchanged. Generated `dist/` and TypeScript/Vite caches were updated by the requested checks and are ignored by Git.

## 5. Testing results

| Category | Result | Evidence and limits |
|---|---|---|
| TypeScript | **PASS** | `npm.cmd run typecheck` with all src included |
| Production build | **PASS** | Exact `npm.cmd run build`; TypeScript, Vite and SEO stages completed |
| Automated logic/component regression | **PASS** | `npm.cmd test`: 7 groups passed, 0 failed; includes informational page and four audience component rendering |
| Functional browser testing | **NOT RUN to completion** | Tool stopped before reliable page inspection; interactions remain unverified |
| Responsive browser testing | **NOT RUN** | No supported browser session; no mobile/tablet/desktop screenshots taken |
| HTTP delivery smoke checks | **PASS** | 22 direct URLs: 21 supported canonical/alias routes + unknown fallback; 5 compiled entry assets + 7 referenced images; expected asset MIME types |
| Security checks | **PASS for executed checks** | Successful `npm.cmd audit --json`: 0 known vulnerabilities across reported 167 dependencies; malicious URL and escaped-content regression cases passed. Not a penetration test |
| FAQ content preservation | **PASS** | Compared all 26 entries with pre-change Git content: IDs, questions, concatenated answer text and link targets match |
| Image preservation | **PASS** | All six lossless WebP files have identical decoded RGBA pixels and dimensions to source PNGs; source images have no embedded color/orientation metadata |
| User favicon preservation | **PASS** | Original and active PNG bytes identical; original SHA-256 unchanged: `9CE9F4EC74E325C460A42939C963FEC0A3DB6A247E98E0157473A1E4C8EDC2C7` |
| Patch whitespace | **PASS** | `git diff --check` after cleanup |
| Lint | **NOT RUN** | No lint command/configuration provided; no unnecessary lint dependency added |

Tests cover route aliases/trailing slashes/unknown paths; invalid/encoded hashes; reduced-motion scroll selection; FAQ answer-text filtering and empty results; React escaping and safe-link schemes; displayed contact/social overrides; policy page section availability; four Coming Soon variants; SEO local/mode/process env precedence; public-route inclusion and placeholder exclusion; stale sitemap cleanup.

Component/server rendering checks do not execute browser effects, measure layout, exercise modal focus or verify animations. HTTP responses prove serving/fallback behavior, not the browser-rendered destination component.

Both temporary local development and preview servers started for verification were stopped after the checks.

### Measured delivery changes

| Asset | Original PNG bytes | Lossless WebP bytes |
|---|---:|---:|
| Hero | 1,920,433 | 1,376,292 |
| Campus | 2,590,465 | 2,024,952 |
| School role | 1,355,047 | 828,636 |
| Parent role | 1,507,763 | 960,182 |
| Teacher role | 1,616,663 | 1,052,024 |
| Vendor role | 1,323,434 | 825,094 |
| **Total** | **10,313,805** | **7,067,180** |

That is approximately **31.5% fewer image bytes**, with no pixel changes. Role art is also deferred until the dialog renders instead of being fetched at startup.

The original main JS chunk was 344.86 kB (98.80 kB gzip). The final main chunk is **261.83 kB (81.04 kB gzip)**, with separate About, Contact, Coming Soon, FAQ and policy chunks. CSS is 71.75 kB (13.19 kB gzip). These are build measurements, not page-load timing or a claim about total session bandwidth.

## 6. Application status and manual QA handover

The available frontend builds successfully and is ready for further development and manual acceptance testing. Confirmed source defects have been corrected within the existing architecture; defensive changes and verification limits are identified above. Browser-based release readiness has not been established.

Before release, use the production preview at representative widths such as 375, 768 and 1440 CSS pixels:

1. Check Home, navbar/footer, art scaling and horizontal overflow.
2. Open More by mouse and keyboard, close with Escape, and follow an entry from About/Contact/policy/audience pages.
3. Open the role dialog from both CTAs; cycle Tab/Shift+Tab; confirm background controls cannot be reached; close via Escape, backdrop and Close; verify focus and scroll restoration, including short mobile screens.
4. Follow all four service/role destinations, then use the logo to return home.
5. Search FAQs by question and answer terms; open/close answers; verify empty results and Clear search.
6. Open every direct route/alias, refresh, navigate back and follow policy anchors, including a direct URL with a fragment.
7. Inspect the not-found page and reload recovery after deliberately blocking a secondary chunk in a disposable test session.
8. Confirm reduced-motion behavior, image loading, browser console/network errors, and the configured deployment's canonical/sitemap/robots behavior.

No external registration, email or phone action was submitted during this work.
