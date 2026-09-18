# Rochda Portfolio

Portfolio site for Rochda Riswat Muliampati: graphic design, photography, and social media management across two brands.

## Language

**Artivive**:
A client brand covering visual identity, commercial photography, and social presence.
_Avoid_: Artivie (zip folder typo)

**Nadi & Co**:
A client brand covering photography and social media management. Slug `nadi-co`.
_Avoid_: nadi.co, Nadi and co

**Mesh**:
The grainy gradient background built from blurred blobs plus grain overlay. Now the static fallback under `SplineBg`; shows when Spline is disabled (`prefers-reduced-motion`), off-screen-lazy, or the CDN fails.
_Avoid_: Spline embed (that is `SplineBg`)

**SplineBg**:
The PortfolioGo Spline canvas layered above `Mesh`, below grain and content. Hero uses the testimonial scene (`XeV6jwtdiFThCAzp`); closing and case-top use the hero scene (`6fOfs4xVNbrf9zFA`). Transparent background so `Mesh` blends through. Hidden under `prefers-reduced-motion`.
_Avoid_: gradient (when you mean the Spline canvas), Mesh

**Closing**:
The contact footer (`#contact`). Variant `full` on the homepage carries the `SplineBg` hero scene; variant `slim` on case pages is `Mesh`-only, no Spline.
_Avoid_: footer (the unused `Footer_wrap`)

**Cover**:
The lead project image on the work overview card and top of a case page. One per project. Carries the brand mark on a dark veil.

**Gallery item**:
One captioned photo in a case-study gallery. Rendered at its native aspect ratio in the masonry grid.
_Avoid_: gallery slot (the `g1`–`g5` fixed-ratio system, removed)

**Signature asset**:
Oversize source files (`desing * (signature).png`, ~27MB) not shipped to the site.
_Avoid_: design asset, master file

**Cover logo veil**:
The centered white brand mark over a cover photo (`rgba(0,0,0,.55)` overlay + grain). Covers only, never gallery frames. Sources: `public/logo/artivive.svg`, `public/logo/nadi-co.svg` (canonical spellings; originals keep uploader names under `src/assets/logo/`).
_Avoid_: watermark, badge

**Masonry gallery**:
The case-study gallery where each photo keeps its native aspect ratio in CSS columns. Overview cards stay uniform 4/3.

**Scroll reveal**:
The reference-parity motion where sections rise on scroll via IntersectionObserver. An explicit amendment to the original motion budget (was: hero reveal only). Always off under `prefers-reduced-motion`; no-JS shows full content.

**Masked reveal**:
The hero's masked line-rise motion reused block-level on big headings (about statement, FAQ heading, closing headline, case-study title), triggered once on scroll.
_Avoid_: fade-up (the generic `.rv-scroll` rise)

**Magnetic CTA**:
The closing circle button that pulls toward the cursor within 120px and springs back on leave. Fine pointers only; off under `prefers-reduced-motion`.

**Showcase video**:
The `.MOV` file in the zip. Excluded from v2.
_Avoid_: hero video, gallery video

**Live URL**:
The public address from a free deploy (`https://rochda-portfolio.rochda-portfolio.workers.dev`). Temporary home until the custom domain lands.
_Avoid_: SITE_URL (that is the canonical `https://rochda.studio`, not where the free deploy lives yet)

**Manual deploy**:
A one-shot publish from this laptop (`npm run build && wrangler deploy`). No GitHub auto-deploy.
_Avoid_: auto-deploy, Pages-connected repo

## Decisions

**Typeface stays Inter**: the reference uses Aspekta (commercial, no legal free source). Inter remains unless the client supplies licensed Aspekta files — then swap the family only, scale untouched.
