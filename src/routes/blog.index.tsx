import { createFileRoute } from '@tanstack/react-router'
import { publishedPosts } from '~/lib/content'
import { BlogCard } from '~/components/BlogCard'

export const Route = createFileRoute('/blog/')({
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: 'Blog | WebDev of Reality' },
      {
        name: 'description',
        content:
          'Deep-dives on distributed systems, Kubernetes, homelab, and ethical AI — from the WebDev of Reality build-in-public journey.',
      },
    ],
  }),
})

function BlogIndex() {
  const posts = publishedPosts

  return (
    <div className="container-site py-10 sm:py-14">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-300">
          Deep-dives, build logs, and honest takes. Every post is labeled with its AI
          provenance — most are written by a human.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} featured={post.featured} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="mt-10 text-neutral-500 dark:text-neutral-400">
          No posts yet. Check back soon.
        </p>
      )}
    </div>
  )
}