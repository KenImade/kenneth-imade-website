import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center px-6">
      <div className="max-w-4xl mx-auto w-full animate-fade-up">

        {/* Role label with accent bar */}
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-8 bg-accent shrink-0" />
          <p className="text-accent text-xs tracking-widest uppercase">
            {/* ↓ Replace with your role */}
            Software Engineer
          </p>
        </div>

        {/* Name + blinking cursor */}
        <h1 className="text-6xl sm:text-7xl font-bold tracking-tight leading-none mb-8">
          {/* ↓ Replace with your name */}
          Kenneth Imade<span className="text-accent animate-blink">_</span>
        </h1>

        {/* Bio */}
        <p className="text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed mb-10">
          {/* ↓ Replace with your bio */}
          Building solutions with technology.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center gap-4 mb-16">
          <Link
            href="/projects"
            className="bg-accent text-black px-5 py-2 text-sm hover:bg-blue-300 transition-colors"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="border border-current px-5 py-2 text-sm hover:border-accent hover:text-accent transition-colors"
          >
            Get in Touch
          </Link>
        </div>

        {/* Social links — separated by top rule */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex items-center gap-8 text-xs text-gray-400">
          {/* ↓ Replace hrefs with your actual links */}
          <a
            href="https://github.com/KenImade"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/kenneth-imade/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href="mailto:kenneth.imade@yahoo.com"
            className="hover:text-accent transition-colors"
          >
            Email ↗
          </a>
        </div>

      </div>
    </div>
  )
}
