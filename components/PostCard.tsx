import Link from 'next/link'
import { formatDate, readingTime } from '@/lib/utils'
import type { Post } from '@/lib/types'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border border-gray-200 dark:border-gray-800 p-6 hover:border-accent transition-all duration-200 hover:-translate-y-px"
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <h2 className="font-bold group-hover:text-accent transition-colors duration-200">
          {post.title}
        </h2>
        {/* Arrow slides right on hover */}
        <span className="text-gray-300 dark:text-gray-700 group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 text-sm shrink-0 mt-0.5">
          →
        </span>
      </div>

      {post.excerpt && (
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">
          {post.excerpt}
        </p>
      )}

      <div className="flex items-center gap-3 text-xs text-gray-400">
        <span>{formatDate(post.published_at ?? post.created_at)}</span>
        <span>·</span>
        <span>{readingTime(post.content)} min read</span>
      </div>
    </Link>
  )
}
