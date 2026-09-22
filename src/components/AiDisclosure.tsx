import * as React from 'react'
import { Bot, PenLine, FileAudio, Sparkles } from 'lucide-react'
import type { AiScope } from '~/lib/posts'

const scopeMeta: Record<
  Exclude<AiScope, 'ai-generated'>,
  { label: string; icon: React.ComponentType<{ className?: string }>; tint: string }
> = {
  'human-written': {
    label: 'Human written',
    icon: PenLine,
    tint: 'text-emerald-500 border-emerald-500/40 bg-emerald-500/10',
  },
  'ai-assisted': {
    label: 'AI assisted',
    icon: Sparkles,
    tint: 'text-neon-blue border-neon-blue/40 bg-neon-blue/10',
  },
  'ai-generated-from-human-source': {
    label: 'Generated with AI from human source',
    icon: FileAudio,
    tint: 'text-glitch-pink border-glitch-pink/40 bg-glitch-pink/10',
  },
}

interface AiDisclosureProps {
  aiAssisted?: boolean
  aiModel?: string
  aiScope?: AiScope
  compact?: boolean
}

/**
 * Visible, per-post AI provenance badge. Every post renders one — the absence
 * of AI use is itself a disclosure ("Human written").
 *
 * Per the AI ethics directive (AGENTS.md): aiScope 'ai-generated' is rejected
 * at build time and can never reach this component.
 */
export function AiDisclosure({ aiAssisted, aiModel, aiScope, compact = false }: AiDisclosureProps) {
  if (!aiAssisted) {
    if (compact) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500">
          <PenLine className="h-3 w-3" aria-hidden />
          Human written
        </span>
      )
    }
    return (
      <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <PenLine className="h-4 w-4 text-emerald-500" aria-hidden />
          <span className="text-sm font-semibold text-emerald-500">Human written</span>
        </div>
        <p className="mt-1 text-sm text-muted">
          This post was written by a human without AI assistance, per our{' '}
          <a href="/ai-policy" className="underline decoration-neon-blue/50 underline-offset-2">
            AI policy
          </a>
          .
        </p>
      </div>
    )
  }

  if (!aiScope || !aiModel) {
    throw new Error(
      'AiDisclosure: aiAssisted=true requires aiScope and aiModel (see AGENTS.md — unsigned AI content must not ship).',
    )
  }

  if (aiScope === 'ai-generated') {
    throw new Error('AiDisclosure: aiScope "ai-generated" is forbidden (see AGENTS.md).')
  }

  const meta = scopeMeta[aiScope]
  const Icon = meta.icon

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${meta.tint}`}
        title={`AI model: ${aiModel}`}
      >
        <Icon className="h-3 w-3" aria-hidden />
        {meta.label}
      </span>
    )
  }

  return (
    <div className={`rounded-lg border px-4 py-3 ${meta.tint}`}>
      <div className="flex items-center gap-2">
        <Bot className="h-4 w-4 shrink-0" aria-hidden />
        <span className="text-sm font-semibold">{meta.label}</span>
      </div>
      <p className="mt-1 text-sm text-muted">
        Portions of this post were{' '}
        {aiScope === 'ai-generated-from-human-source'
          ? 'generated with AI from the author\u2019s own source material'
          : 'drafted with AI assistance'}
        . Model:{' '}
        <span className="font-mono font-medium text-foreground">{aiModel}</span>. Human
        reviewed and edited. Read our full{' '}
        <a href="/ai-policy" className="underline decoration-neon-blue/50 underline-offset-2">
          AI policy
        </a>
        .
      </p>
    </div>
  )
}