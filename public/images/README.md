# Image assets

The current website uses these lossless WebP delivery assets:

| File | Used by |
|---|---|
| `hero-students.webp` | Home hero; high-priority above-the-fold image |
| `school-building.webp` | Home About section; lazy-loaded |
| `role-school.webp`, `role-parent.webp`, `role-teacher.webp`, `role-vendor.webp` | Role dialog; requested only when the dialog renders |
| `the-school-expert-official-logo.png` | Navbar/footer logo, configured in `src/config/site.ts` |

The original corresponding PNGs remain as source artwork. WebP versions preserve dimensions and all decoded RGBA pixels; they do not crop, resize or alter the artwork. When replacing artwork, regenerate its delivery version and verify dimensions/pixels. The components reference WebP names, not the old README's `school-campus.webp` name.

Active images use standard `img` elements; there is no automatic designed fallback if a referenced file is missing. Verify asset paths when changing images. The unused SmartImage helper and provisional role metadata were removed.

`public/favicon.png` preserves the user's existing favicon artwork with the correct PNG extension and MIME type. The pre-existing user-modified `public/favicon.svg` is left untouched and is no longer referenced by index.html.

`public/brand/logo.svg`, `logo-light.svg`, and `brand-lockup.png` are not the active logo paths. Changing them alone does not change the current navbar/footer.
