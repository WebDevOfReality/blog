import { Link } from '@tanstack/react-router'
import { formatDate } from '~/lib/posts'
import { AiDisclosure } from '~/components/AiDisclosure'
import type { PostMeta } from '~/lib/posts'

interface BlogCardProps {
  post: PostMeta
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex h-full flex-col rounded-xl border border-neutral-200 bg-card p-6 transition-all hover:border-spider-purple/60 hover:shadow-lg hover:shadow-spider-purple/10 dark:border-neutral-800"
    >
      <div className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {featured && (
          <span className="rounded-full bg-electric-red/10 px-2.5 py-0.5 text-xs font-semibold text-electric-red">
            Featured
          </span>
        )}
      </div>
      <h3
        className={`mt-3 font-bold text-foreground transition-colors group-hover:text-spider-purple dark:group-hover:text-neon-blue ${
          featured ? 'text-2xl' : 'text-lg'
        }`}
      >
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
        {post.description}
      </p>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={post.slug + tag}
            className="rounded-md bg-spider-purple/10 px-2 py-0.5 text-xs text-spider-purple dark:text-neon-blue"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 border-t border-neutral-200 pt-3 dark:border-neutral-800">
        <AiDisclosure
          aiAssisted={post.aiAssisted}
          aiModel={post.aiModel}
          aiScope={post.aiScope}
          compact
        />
      </div>
    </Link>
  )
}