import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = createClient()

  const [{ count: projectCount }, { count: postCount }, { count: messageCount }] =
    await Promise.all([
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('posts').select('*', { count: 'exact', head: true }),
      supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
    ])

  const stats = [
    { label: 'Projects', count: projectCount ?? 0, href: '/admin/projects' },
    { label: 'Posts', count: postCount ?? 0, href: '/admin/posts' },
    { label: 'Messages', count: messageCount ?? 0, href: '#' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="border border-gray-200 dark:border-gray-800 p-6 hover:border-accent transition-colors"
          >
            <p className="text-3xl font-bold text-accent">{s.count}</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4">
        <Link
          href="/admin/projects/new"
          className="border border-current px-4 py-2 text-sm hover:border-accent hover:text-accent transition-colors"
        >
          + New Project
        </Link>
        <Link
          href="/admin/posts/new"
          className="border border-current px-4 py-2 text-sm hover:border-accent hover:text-accent transition-colors"
        >
          + New Post
        </Link>
      </div>
    </div>
  )
}
