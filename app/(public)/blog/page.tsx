import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import PostCard from '@/components/PostCard'
import type { Post } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = { title: 'Blog' }

export default async function BlogPage() {
  const supabase = createClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, content, published, published_at, created_at')
    .eq('published', true)
    .order('published_at', { ascending: false })

  const allPosts: Post[] = posts ?? []

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Blog</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10 text-sm">
        Writing on software, systems, and craft.
      </p>
      <div className="space-y-4">
        {allPosts.length === 0 ? (
          <p className="text-gray-400 text-sm">No posts yet.</p>
        ) : (
          allPosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  )
}
