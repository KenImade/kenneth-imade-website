'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-10 h-5" />

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="text-xs text-gray-400 hover:text-accent transition-colors uppercase tracking-wider"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}
