# WebDev of Reality — Blog

The public home of [WebDev of Reality](https://webdevofreality.dev) — where
distributed systems meet reality. Build-in-public documentation of
**Spider-Verse OS**: a distributed operating system for a homelab.

> **AI agents & assistants:** read [AGENTS.md](./AGENTS.md) before doing
> anything. It is a binding directive, especially the AI Ethics Directive.

## Stack

- **TanStack Start** (Vite, React 19, SSR via Nitro) — file-based routing, static prerendering
- **MDX** with `remark-gfm` + frontmatter parsing (tables and frontmatter are load-bearing)
- **Tailwind CSS 4** (CSS-first config) + `@tailwindcss/typography`
- **Netlify** hosting via `@netlify/vite-plugin-tanstack-start`
- **Self-hosted Umami** analytics (heim k3s)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (includes AI disclosure validation)
npm run typecheck  # tsc --noEmit
```

## Writing a post

Posts are auto-discovered: drop a `.mdx` file in `src/content/blog/` (slug =
filename) — no registration needed. Frontmatter is the single source of truth.

Two ways:

- **CMS:** visit `/admin/` (Sveltia CMS, commits to `main` via Netlify
  OAuth). Unlisted and `noindex`.
- **By hand:** create the file, run `npm run build` — the AI disclosure
  validator must pass.

Frontmatter schema and voice guidelines: `src/content/AGENTS.md`.

### CMS auth (Netlify OAuth) — one-time setup

1. GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**
   - Homepage: your site URL
   - Callback URL: `https://api.netlify.com/auth/done`
2. Netlify → Site configuration → **Access & security → OAuth** → install
   the GitHub provider using the app's Client ID + Client Secret
3. Log in at `/admin/` with "Log in with Netlify"

## AI transparency

Every post renders a provenance badge. Posts using AI without signed disclosure
**fail the build**. `aiScope: 'ai-generated'` is rejected outright. No
AI-generated art, ever — visual work is commissioned from human designers.

See [/ai-policy](https://webdevofreality.dev/ai-policy) for the public policy.

## Deployment

Netlify auto-deploys `main`. Build config lives in `netlify.toml`.

## License

MIT — see [LICENSE](./LICENSE).