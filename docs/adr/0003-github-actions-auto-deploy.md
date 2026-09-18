# Auto-deploy via GitHub Actions

Every push to `main` (plus manual `workflow_dispatch`) runs `.github/workflows/deploy.yml`: `npm ci`, `npm run build`, `npx wrangler deploy` with `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` from repo secrets. Verified end-to-end: Actions run green in 26s, new Worker version live, homepage 200. The 154MB `src/assets/Image Asset.zip` is git-ignored (exceeds GitHub's 100MB limit, unreferenced by the build) so pushes aren't rejected.

**Considered Options**: Cloudflare dashboard Git integration — no secrets in GitHub, reversible — rejected because the Actions workflow is explicit, versioned in-repo, and needs no dashboard clicks per deploy.
**Consequences**: Rotating the Cloudflare token means updating one repo secret; the stray misnamed secret from setup should be deleted and its token revoked in the Cloudflare dashboard.
