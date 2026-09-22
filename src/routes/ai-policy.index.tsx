import { createFileRoute } from '@tanstack/react-router'
import { AI_POLICY } from '~/lib/ai-policy'

export const Route = createFileRoute('/ai-policy/')({
  component: AiPolicyPage,
  head: () => ({
    meta: [
      { title: 'AI Policy | WebDev of Reality' },
      {
        name: 'description',
        content:
          'Our standing commitments on AI transparency: every post labeled and signed, human authorship first, no AI-generated art. Ever.',
      },
    ],
  }),
})

function AiPolicyPage() {
  return (
    <div className="container-site py-10 sm:py-14">
      <article className="mx-auto max-w-3xl">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            AI Policy
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            This blog is grounded in ethical AI use. These are not aspirations — they're
            enforced in the build itself. Our content pipeline validates that every post
            declares its provenance, and posts using AI without a signed disclosure fail
            to compile.
          </p>
        </header>

        <div className="mt-10 space-y-6">
          {AI_POLICY.principles.map((principle) => (
            <section
              key={principle.title}
              className="rounded-xl border border-neutral-200 bg-card p-6 dark:border-neutral-800"
            >
              <h2 className="font-heading text-xl font-bold text-spider-purple dark:text-neon-blue">
                {principle.title}
              </h2>
              <p className="mt-2 leading-7 text-neutral-700 dark:text-neutral-300">
                {principle.body}
              </p>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-xl border border-neon-blue/30 bg-neon-blue/5 p-6">
          <h2 className="font-heading text-lg font-bold text-foreground">
            What the labels mean
          </h2>
          <dl className="mt-4 space-y-4 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
            <div>
              <dt className="font-semibold text-foreground">Human written</dt>
              <dd>
                Written by Anthony with no AI assistance. Ideas, drafts, and edits are
                human.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">AI assisted</dt>
              <dd>
                Human-authored with AI help for specific tasks (editing, code snippets,
                research). The model used is named on the post.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">
                Generated with AI from human source
              </dt>
              <dd>
                AI transformed the author's own material — for example, a vlog transcript
                reworked into a write-up. The source is human; AI is the adapter. The
                model used is named on the post.
              </dd>
            </div>
          </dl>
        </section>

        <p className="mt-10 text-sm text-neutral-500 dark:text-neutral-400">
          This policy is also enforced in our repository's AGENTS.md directive, which
          governs any AI tooling used to build this site. Questions? Reach out on{' '}
          <a
            href="https://x.com/webdevofreality"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-blue underline underline-offset-4"
          >
            X
          </a>
          .
        </p>
      </article>
    </div>
  )
}