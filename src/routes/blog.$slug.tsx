import { createFileRoute, notFound } from '@tanstack/react-router'
import { MDXProvider } from '@mdx-js/react'
import { getPostBySlug, getPostComponent, getRelatedPosts } from '~/lib/content'
import { formatDate } from '~/lib/posts'
import { AiDisclosure } from '~/components/AiDisclosure'
import { BlogCard } from '~/components/BlogCard'
import { VideoEmbed } from '~/components/VideoEmbed'

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostPage,
  notFoundComponent: BlogNotFound,
  head: ({ match }) => {
    const post = getPostBySlug(match.params.slug)
    if (!post) return { meta: [{ title: 'Post Not Found | WebDev of Reality' }] }
    return {
      meta: [
        { title: `${post.title} | WebDev of Reality` },
        { name: 'description', content: post.description },
        { property: 'og:title', content: post.title },
        { property: 'og:description', content: post.description },
        { property: 'og:type', content: 'article' },
        { property: 'article:published_time', content: post.date },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@webdevofreality' },
      ],
    }
  },
})

function BlogPostPage() {
  const { slug } = Route.useParams()
  const post = getPostBySlug(slug)
  const Content = getPostComponent(slug)

  if (!post || !Content || post.draft) {
    throw notFound()
  }

  const related = getRelatedPosts(slug)

  const components = {
    VideoEmbed,
  } as unknown as Record<string, React.ComponentType<Record<string, unknown>>>

  return (
    <div className="container-site py-10 sm:py-14">
      <article className="mx-auto max-w-3xl">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.author}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300">{post.description}</p>
          <AiDisclosure
            aiAssisted={post.aiAssisted}
            aiModel={post.aiModel}
            aiScope={post.aiScope}
          />
        </header>

        <div className="prose-wdr mt-10">
          <MDXProvider components={components}>
            <Content />
          </MDXProvider>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-4xl border-t border-neutral-200 pt-10 dark:border-neutral-800">
          <h2 className="text-xl font-bold text-foreground">Keep reading</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function BlogNotFound() {
  return (
    <div className="container-site py-20 text-center">
      <h1 className="text-3xl font-bold text-foreground">Post not found</h1>
      <p className="mt-3 text-neutral-500 dark:text-neutral-400">
        This reality doesn't exist (yet).{' '}
        <a href="/blog" className="text-neon-blue underline underline-offset-4">
          Back to the blog
        </a>
      </p>
    </div>
  )
}

export default BlogPostPage