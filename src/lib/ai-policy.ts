/**
 * AI ethics policy data — single source of truth for site-wide AI transparency.
 * Mirrors AGENTS.md at repo root. Update both together.
 */
export const AI_POLICY = {
  principles: [
    {
      title: 'Human first, always',
      body: 'Posts are written by Anthony. AI never authors original thought on this site. The ideas, opinions, war stories, and takes are human-generated; some formatting and transcription assistance may not be.',
    },
    {
      title: 'Labeled and signed',
      body: 'Every piece of AI-assisted content carries a visible disclosure naming the model used and the scope of its contribution. No unlabeled AI content ships — the build itself fails if a post declares AI use without a signature.',
    },
    {
      title: 'No AI art, period',
      body: 'No AI-generated images, logos, illustrations, or thumbnails appear on this site. Visual work is done by hired graphic designers or by Anthony, crudely and proudly, by hand.',
    },
    {
      title: 'AI transforms, humans originate',
      body: 'The only fully AI-generated text allowed is transformation of human source material — e.g., a vlog transcript reworked into a write-up. The source is always human; AI is the adapter, not the author.',
    },
  ],
} as const