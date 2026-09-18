# Quarantined: Lumos island

Moved out of `src/` on 2026-09-18 during the "Quarantine the Lumos island"
architecture pass. These ~39 modules (Lumos component library, `BaseLayout`,
and the `global`/`base`/`patterns`/`utilities` styles) were dead on every live
route — the only consumer was `404.astro`, which has since been rewritten in
the Rochda idiom.

- Nothing in `src/` imports from here. If anything does again, its `@/...`
  imports will fail loudly, which is the point.
- Excluded from `astro check` (tsconfig) and prettier (`.prettierignore`).
- The repo has no git history, so this directory is the only copy. Do not
  delete it without taking a backup or committing the repo first.
- To restore a module: move it back under the matching `src/` path.

Follow-ups logged at quarantine time, intentionally out of scope:
- Inter loads twice on live pages (local `Font` in `BaseHead` + Google Fonts
  stylesheet in `RochdaLayout`). Unifying changes rendering; left untouched.
