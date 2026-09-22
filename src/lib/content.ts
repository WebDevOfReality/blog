import { validatePostMeta, sortPosts, type PostMeta } from './posts'

import welcome from '~/content/blog/welcome.mdx'
import welcomeMeta from '~/content/blog/welcome.meta'

const postComponents: Record<string, React.ComponentType> = {
  welcome,
}

export type { PostMeta }

function buildIndex(): PostMeta[] {
  const raw = [welcomeMeta] as Partial<PostMeta>[]
  return raw.map((meta) => validatePostMeta(meta, meta.slug ?? 'unknown'))
}

export const postIndex: PostMeta[] = buildIndex()

export const publishedPosts: PostMeta[] = sortPosts(
  postIndex.filter((p) => !p.draft),
)

export function getPostBySlug(slug: string): PostMeta | undefined {
  return postIndex.find((p) => p.slug === slug)
}

export function getPostComponent(slug: string): React.ComponentType | undefined {
  return postComponents[slug]
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