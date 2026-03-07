import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '@/components/LogoutButton'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen">
      {/* Only render admin nav when authenticated (login page has no nav) */}
      {user && (
        <nav className="border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center gap-6 text-sm">
          <span className="text-accent font-bold tracking-tight">Admin</span>
          <Link href="/admin" className="text-gray-500 hover:text-accent transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/projects" className="text-gray-500 hover:text-accent transition-colors">
            Projects
          </Link>
          <Link href="/admin/posts" className="text-gray-500 hover:text-accent transition-colors">
            Posts
          </Link>
          <div className="ml-auto">
            <LogoutButton />
          </div>
        </nav>
      )}
      <div className="max-w-5xl mx-auto px-6 py-10">{children}</div>
    </div>
  )
}
