import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { publishedPosts } from '~/lib/content'
import { BlogCard } from '~/components/BlogCard'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      { title: 'WebDev of Reality — Where distributed systems meet reality' },
      {
        name: 'description',
        content:
          'Building Spider-Verse OS in public: homelab, Kubernetes, AI agents, mesh networking. Real engineering for real problems, with full AI transparency.',
      },
      { property: 'og:title', content: 'WebDev of Reality' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:site', content: '@webdevofreality' },
    ],
  }),
})

function HomePage() {
  const featured = publishedPosts.filter((p) => p.featured)
  const latest = publishedPosts.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
        <div
          className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 70% 20%, rgba(107,45,145,0.5), transparent), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(230,57,70,0.35), transparent)',
          }}
          aria-hidden
        />
        <div className="container-site relative py-20 sm:py-28">
          <p className="font-mono text-sm text-neon-blue">$ ./initiate-journey.sh</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Where distributed systems{' '}
            <span className="brand-gradient-text">meet reality</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
            I'm building Spider-Verse OS — a distributed operating system that turns a
            homelab into a unified cloud — and documenting the whole journey in public.
            Kubernetes, AI agents, mesh networking, and the war stories in between.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/blog" className="btn-primary">
              Read the blog
            </Link>
            <Link to="/ai-policy" className="btn-secondary">
              Our AI policy
            </Link>
          </div>
        </div>
      </section>

      {/* Latest posts */}
      <section className="container-site py-14 sm:py-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Latest posts</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              Every post is labeled with its AI provenance.
            </p>
          </div>
          <Link
            to="/blog"
            className="hidden shrink-0 text-sm font-medium text-electric-red hover:text-glitch-pink sm:block dark:text-neon-blue"
          >
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(featured.length > 0 ? featured : latest).map((post) => (
            <BlogCard key={post.slug} post={post} featured={post.featured} />
          ))}
        </div>
      </section>

      {/* Content pillars */}
      <section className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="container-site grid gap-10 py-14 sm:grid-cols-3 sm:py-20">
          <div>
            <h3 className="font-heading text-lg font-bold text-spider-purple dark:text-neon-blue">
              🕷️ Spider-Verse OS
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              A distributed OS built in the open: Talos Linux, K3s, Nebula mesh, and AI
              agents called Spiders. The flagship build series.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-spider-purple dark:text-neon-blue">
              🛠️ Real engineering
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Architecture patterns, code review wisdom, and honest breakdowns of what
              self-hosting actually costs. No gatekeeping.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-spider-purple dark:text-neon-blue">
              🤖 Ethical AI
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Local LLMs, agent patterns — and a standing commitment: AI-assisted content
              is labeled and signed. AI art is banned here.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}