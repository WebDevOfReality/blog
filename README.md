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

1. Create `src/content/blog/<slug>.mdx` with full frontmatter
2. Create `src/content/blog/<slug>.meta.ts` (see `welcome.meta.ts`)
3. Register both in `src/lib/content.ts`
4. `npm run build` — the AI disclosure validator must pass

Frontmatter schema and voice guidelines: `src/content/AGENTS.md`.

## AI transparency

Every post renders a provenance badge. Posts using AI without signed disclosure
**fail the build**. `aiScope: 'ai-generated'` is rejected outright. No
AI-generated art, ever — visual work is commissioned from human designers.

See [/ai-policy](https://webdevofreality.dev/ai-policy) for the public policy.

## Deployment

Netlify auto-deploys `main`. Build config lives in `netlify.toml`.

## License

MIT — see [LICENSE](./LICENSE).