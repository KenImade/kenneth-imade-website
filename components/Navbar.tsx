'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()

  function isActive(href: string) {
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
      <nav className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-8">

        {/* Logo / name */}
        <Link
          href="/"
          className={`font-bold text-sm transition-colors ${pathname === '/' ? 'text-accent' : 'hover:text-accent'
            }`}
        >
          {/* ↓ Replace with your name or handle */}
          KENNETH IMADE
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6 text-xs uppercase tracking-wider">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative pb-px transition-colors ${isActive(href)
                ? 'text-accent'
                : 'text-gray-500 dark:text-gray-400 hover:text-accent'
                }`}
            >
              {label}
              {/* Active underline — aligns flush with navbar bottom border */}
              {isActive(href) && (
                <span className="absolute left-0 -bottom-[1px] right-0 h-px bg-accent" />
              )}
            </Link>
          ))}
        </div>

        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
