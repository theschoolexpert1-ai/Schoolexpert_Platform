# Images

Drop the real photography here using these exact file names. Until a file exists, the page
shows a designed placeholder in its place — nothing breaks.

| File | Where it appears | Recommended |
| --- | --- | --- |
| `hero-students.webp` | Hero, right side — three Indian schoolchildren in uniform | Transparent background (cut-out), ~1040 × 1180 px, under 200 KB |
| `school-campus.webp` | About Us section — a modern Indian school campus | 1200 × 900 px (4:3), under 180 KB |

Convert to WebP with, for example: `npx @squoosh/cli --webp auto photo.png` or any image editor.

Only use photos you have the rights to, and get consent for any identifiable children.

The logo lives in `../brand/` — replace `logo.svg` (on white) and `logo-light.svg` (on dark blue)
with the official files, keeping the same names. PNG works too: change the paths in `src/config/site.ts`.
