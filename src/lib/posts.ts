export type AiScope =
  | 'human-written'
  | 'ai-assisted'
  | 'ai-generated-from-human-source'
  | 'ai-generated'

export interface PostFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  author: string
  draft?: boolean
  featured?: boolean
  videoId?: string
  aiAssisted?: boolean
  aiModel?: string
  aiScope?: AiScope
}

export interface PostMeta extends PostFrontmatter {
  slug: string
}

/**
 * Validates AI disclosure fields per the project's AI ethics directive (AGENTS.md).
 *
 * Rules:
 * - `aiAssisted: true` requires `aiModel` and `aiScope`.
 * - `aiScope: 'ai-generated'` is rejected outright: fully AI-authored posts must
 *   be derived from human source material (`ai-generated-from-human-source`).
 * - Human-written posts must not declare an aiModel.
 *
 * Throws on violation so that CI/build fails loudly — unsigned AI content
 * never ships.
 */
export function validateAiDisclosure(meta: PostFrontmatter, slug: string): void {
  const { aiAssisted, aiModel, aiScope } = meta

  if (!aiAssisted) {
    if (aiModel || aiScope) {
      throw new Error(
        `[${slug}] AI metadata present but aiAssisted is not true. Either set aiAssisted: true or remove aiModel/aiScope.`,
      )
    }
    return
  }

  if (!aiModel) {
    throw new Error(
      `[${slug}] aiAssisted: true requires aiModel (e.g. "GLM (glm-5.3-flash) by Z.ai"). Every AI-generated artifact must name the model used.`,
    )
  }

  if (!aiScope) {
    throw new Error(
      `[${slug}] aiAssisted: true requires aiScope. See AGENTS.md for allowed values.`,
    )
  }

  if (aiScope === 'ai-generated') {
    throw new Error(
      `[${slug}] aiScope "ai-generated" is forbidden by the AI ethics directive. Fully generated posts are only permitted when derived from human source material (use "ai-generated-from-human-source").`,
    )
  }
}

export function validatePostMeta(meta: Partial<PostFrontmatter>, slug: string): PostMeta {
  if (!meta.title) throw new Error(`[${slug}] missing required frontmatter field: title`)
  if (!meta.description) throw new Error(`[${slug}] missing required frontmatter field: description`)
  if (!meta.date) throw new Error(`[${slug}] missing required frontmatter field: date`)
  if (!meta.author) throw new Error(`[${slug}] missing required frontmatter field: author`)

  const normalized: PostFrontmatter = {
    ...meta,
    tags: meta.tags ?? [],
  } as PostFrontmatter

  validateAiDisclosure(normalized, slug)

  return { ...normalized, slug }
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function sortPosts(posts: PostMeta[]): PostMeta[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}