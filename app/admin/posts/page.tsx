import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/lib/types'

export default async function AdminPostsPage() {
  const supabase = createClient()
  const { data } = await supabase
    .from('posts')
    .select('id, title, slug, published, published_at, created_at')
    .order('created_at', { ascending: false })

  const posts: Pick<Post, 'id' | 'title' | 'slug' | 'published' | 'published_at' | 'created_at'>[] =
    data ?? []

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-accent text-black px-4 py-2 text-sm hover:bg-blue-300 transition-colors"
        >
          + New
        </Link>
      </div>

      <div className="space-y-2">
        {posts.length === 0 ? (
          <p className="text-gray-400 text-sm">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between border border-gray-200 dark:border-gray-800 px-4 py-3 hover:border-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium text-sm">{post.title}</span>
                <span
                  className={`text-xs ${
                    post.published ? 'text-green-500' : 'text-gray-400'
                  }`}
                >
                  {post.published ? 'published' : 'draft'}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>{formatDate(post.published_at ?? post.created_at)}</span>
                <Link href={`/admin/posts/${post.id}`} className="text-accent hover:underline">
                  Edit
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
