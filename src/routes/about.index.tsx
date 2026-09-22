import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about/')({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: 'About | WebDev of Reality' },
      {
        name: 'description',
        content:
          'Anthony Renteria — software engineer building Spider-Verse OS and documenting the journey at WebDev of Reality.',
      },
    ],
  }),
})

function AboutPage() {
  return (
    <div className="container-site py-10 sm:py-14">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          About
        </h1>

        <div className="prose-wdr mt-8">
          <p>
            Hey, I'm Anthony — a software engineer who decided the most interesting
            computer in my life should be the one I build myself.
          </p>
          <p>
            <strong>WebDev of Reality</strong> is where I document the journey. The name
            is a play on the "Web of Reality" — the mesh network at the heart of
            Spider-Verse OS, my homelab's distributed operating system — with{" "}
            <em>Dev</em> added because software engineering is the lens I see it all
            through.
          </p>
          <p>
            Here's the thesis: the cloud is just someone else's basement. I'm building my
            own basement. Every device in my house — servers, media boxes, phones —
            treated as one unified computer, controlled by natural language, documented
            from the first commit.
          </p>
          <p>
            What you'll find here:
          </p>
          <ul>
            <li>
              <strong>Spider-Verse OS build logs</strong> — the flagship series, failures
              included. I show what broke at 2 AM, not just what worked.
            </li>
            <li>
              <strong>Engineering wisdom</strong> — architecture patterns, code review
              insights, and honest takes from a decade of shipping software.
            </li>
            <li>
              <strong>AI, ethically applied</strong> — local LLMs, agent patterns, and a
              hard line on transparency: this site labels every piece of AI-assisted
              content and bans AI-generated art outright.
            </li>
          </ul>
          <p>
            No gatekeeping. Assume intelligence, not knowledge. If something sucks, I'll
            say so.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="https://github.com/WebDevOfReality"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            GitHub
          </a>
          <a
            href="https://x.com/webdevofreality"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Follow on X
          </a>
        </div>
      </article>
    </div>
  )
}