import type { PostMeta } from '~/lib/posts'

/**
 * Static metadata for welcome.mdx — the MDX pipeline (remark-mdx-frontmatter)
 * would normally export this from the .mdx file itself, but posts are
 * statically imported, so we keep typed metadata in a sibling file.
 *
 * MUST stay in sync with the frontmatter in welcome.mdx.
 * AI disclosure validated by src/lib/posts.ts at build time.
 */
export default {
  slug: 'welcome',
  title: 'Welcome to WebDev of Reality',
  description:
    "Why I'm building a distributed OS in my basement — and why every word on this site carries a label.",
  date: '2026-09-21',
  tags: ['meta', 'spider-verse-os', 'ethical-ai', 'homelab'],
  author: 'Anthony',
  featured: true,
  aiAssisted: true,
  aiModel: 'GLM (glm-5.3-flash) by Z.ai',
  aiScope: 'ai-assisted',
} satisfies PostMeta