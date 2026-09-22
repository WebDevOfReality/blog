import { validatePostMeta, sortPosts, type PostMeta } from './posts'

// Auto-discover every MDX post; slug = filename. New posts added via the
// CMS (/admin) or by hand need no registration — they're picked up at build.
const modules = import.meta.glob<{ default: React.ComponentType; frontmatter?: Record<string, unknown> }>(
  '~/content/blog/*.mdx',
  { eager: true },
)

export type { PostMeta }

function buildIndex(): PostMeta[] {
  const posts: PostMeta[] = []

  for (const [path, mod] of Object.entries(modules)) {
    const slug = path.replace(/^.*\/(.+)\.mdx$/, '$1')
    const fm = (mod.frontmatter ?? {}) as Partial<PostMeta>

    posts.push(validatePostMeta({ ...fm, slug }, slug))
  }

  return posts
}

export const postIndex: PostMeta[] = buildIndex()

export const publishedPosts: PostMeta[] = sortPosts(
  postIndex.filter((p) => !p.draft),
)

export function getPostBySlug(slug: string): PostMeta | undefined {
  return postIndex.find((p) => p.slug === slug)
}

export function getPostComponent(slug: string): React.ComponentType | undefined {
  return modules[`~/content/blog/${slug}.mdx`]?.default
}

export function estimateReadingTime(html: string): number {
  const words = html
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

export function getRelatedPosts(slug: string, limit = 2): PostMeta[] {
  const current = getPostBySlug(slug)
  if (!current) return []
  return sortPosts(
    publishedPosts
      .filter((p) => p.slug !== slug)
      .map((p) => ({
        post: p,
        sharedTags: p.tags.filter((t) => current.tags.includes(t)).length,
      }))
      .sort(
        (a, b) => b.sharedTags - a.sharedTags || +new Date(b.post.date) - +new Date(a.post.date),
      )
      .slice(0, limit)
      .map(({ post }) => post),
  )
}