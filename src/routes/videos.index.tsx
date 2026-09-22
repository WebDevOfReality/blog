import { createFileRoute } from '@tanstack/react-router'
import { Clapperboard } from 'lucide-react'

export const Route = createFileRoute('/videos/')({
  component: VideosPage,
  head: () => ({
    meta: [
      { title: 'Videos | WebDev of Reality' },
      {
        name: 'description',
        content: 'Video content from the WebDev of Reality YouTube channel.',
      },
    ],
  }),
})

function VideosPage() {
  return (
    <div className="container-site py-10 sm:py-14">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Videos
        </h1>
        <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-300">
          The video side of WebDev of Reality — build series, tutorials, and opinion
          pieces from the YouTube channel.
        </p>
      </header>

      <div className="mt-12 rounded-xl border border-dashed border-neutral-300 p-12 text-center dark:border-neutral-700">
        <Clapperboard className="mx-auto h-10 w-10 text-electric-red" aria-hidden />
        <h2 className="mt-4 text-xl font-bold text-foreground">First video is in production</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-neutral-600 dark:text-neutral-400">
          Episode 1: "Why I'm Building a Distributed OS in My Basement." The video
          library launches with the channel. Follow along in the blog meanwhile.
        </p>
        <a
          href="https://youtube.com/@webdevofreality"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-6"
        >
          Subscribe on YouTube
        </a>
      </div>
    </div>
  )
}