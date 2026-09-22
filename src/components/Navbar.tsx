import * as React from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '~/components/ThemeToggle'

const navItems = [
  { to: '/blog', label: 'Blog' },
  { to: '/videos', label: 'Videos' },
  { to: '/ai-policy', label: 'AI Policy' },
  { to: '/about', label: 'About' },
] as const

/**
 * Text wordmark per brand docs — "WebDev" / "of Reality" with purple→red
 * gradient. Custom logo (designed by a human graphic designer, no AI art)
 * will replace the wordmark once commissioned.
 */
export function BrandWordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-heading text-xl font-bold tracking-tight ${className}`}>
      <span className="text-spider-purple dark:text-neon-blue">WebDev</span>
      <span className="text-neutral-500 dark:text-neutral-400"> of </span>
      <span className="text-electric-red">Reality</span>
    </span>
  )
}

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const location = useLocation()

  React.useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:border-neutral-800 dark:bg-void-black/90 dark:supports-[backdrop-filter]:bg-void-black/70">
      <div className="container-site flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="WebDev of Reality home">
          <BrandWordmark />
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: 'text-foreground font-semibold' }}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-electric-red dark:text-neutral-300 dark:hover:text-neon-blue"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 md:hidden dark:border-neutral-800"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-neutral-200 bg-white px-4 py-4 md:hidden dark:border-neutral-800 dark:bg-void-black" aria-label="Mobile">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: 'text-electric-red font-semibold' }}
                className="text-base font-medium text-neutral-700 dark:text-neutral-200"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}