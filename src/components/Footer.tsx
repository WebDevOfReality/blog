import { Link } from '@tanstack/react-router'
import { Code2, X as XIcon, Clapperboard } from 'lucide-react'
import { BrandWordmark } from '~/components/Navbar'

const socials = [
  { href: 'https://youtube.com/@webdevofreality', label: 'YouTube', icon: Clapperboard },
  { href: 'https://x.com/webdevofreality', label: 'Twitter / X', icon: XIcon },
  { href: 'https://github.com/WebDevOfReality', label: 'GitHub', icon: Code2 },
]

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-10 dark:border-neutral-800">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <BrandWordmark />
            <p className="max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
              Where distributed systems meet reality. Building in public — failures and all.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-neutral-500 transition-colors hover:text-electric-red dark:text-neutral-400 dark:hover:text-neon-blue"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-neutral-200 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center dark:border-neutral-800 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} WebDev of Reality. Built by a human, in the open.</p>
          <p>
            Every post carries an{' '}
            <Link to="/ai-policy" className="underline decoration-neon-blue/50 underline-offset-2">
              AI provenance label
            </Link>
            . No AI-generated art, ever.
          </p>
        </div>
      </div>
    </footer>
  )
}