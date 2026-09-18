# Spline backgrounds plus Lenis smooth scroll

Hero uses the PortfolioGo testimonial Spline scene and the homepage closing uses its hero scene via `@splinetool/viewer`, layered over the static `Mesh` fallback; Lenis (`lenis`, duration 1.15) provides smooth wheel scroll with anchor `scrollTo`. Chosen over pure-CSS Mesh because the request explicitly wanted the live Spline look via CDN, accepting ~500kB WebGL chunk and an external `prod.spline.design` dependency. Case (details) pages stay Spline-free: `case-top` and `Closing slim` are `Mesh`-only.

**Considered Options**: CSS-only Mesh recolor approximating the Spline palettes — zero JS, reversible — rejected per request to use the real scenes.
**Consequences**: Spline hidden under `prefers-reduced-motion` (Mesh shows); Lenis skipped under reduced-motion leaving native `scroll-behavior: smooth`; no-JS still shows Mesh + jump anchors.
