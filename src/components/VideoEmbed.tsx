interface VideoEmbedProps {
  videoId: string
  title: string
}

/**
 * Privacy-conscious YouTube embed (youtube-nocookie). Brand-wrapped in
 * void-black with a purple border per the visual identity docs.
 */
export function VideoEmbed({ videoId, title }: VideoEmbedProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-spider-purple/30 bg-void-black">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  )
}