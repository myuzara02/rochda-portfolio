# Free deploy on Cloudflare Workers (assets-only)

Live URL is `https://portfolio.rochda-portfolio.workers.dev` via `wrangler deploy` serving `./dist` as an assets-only Worker (`not_found_handling: 404-page`, no `main` script). Worker renamed from `rochda-portfolio` to `portfolio` so the URL isn't doubled (old worker deleted). `SITE_URL` stays `https://rochda.studio` so canonical + sitemap are already correct when the custom domain lands; until then they point at a domain that isn't live yet. Deploys are manual from the laptop (`npm run build && npx wrangler deploy`), no GitHub auto-deploy wired up.

**Considered Options**: Cloudflare Pages / Netlify / Vercel Hobby / GitHub Pages — all free for static Astro, reversible — rejected because `wrangler.jsonc` assets-only was already configured and Workers free tier covers this traffic with free SSL + custom domain later.
**Consequences**: First `workers.dev` subdomain must exist before publish (dashboard prompts once); local TLS stack in this environment can't handshake `workers.dev` so live-check is DNS + `wrangler versions list` + open-in-browser; adding `routes` for `rochda.studio` is the only change needed for custom domain.
