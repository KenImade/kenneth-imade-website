import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'
import MdxRenderer from '@/components/MdxRenderer'
import { formatDate, readingTime } from '@/lib/utils'

export const revalidate = 60

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  // generateStaticParams runs at build time outside a request scope,
  // so cookies() is unavailable. Use a plain client instead.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data } = await supabase
    .from('posts')
    .select('slug')
    .eq('published', true)
  return (data ?? []).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('posts')
    .select('title, excerpt')
    .eq('slug', params.slug)
    .single()
  return {
    title: data?.title ?? 'Post',
    description: data?.excerpt ?? undefined,
  }
}

export default async function PostPage({ params }: Props) {
  const supabase = createServerClient()
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!post) notFound()

  return (
    <article className="max-w-2xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="text-xs text-gray-400 hover:text-accent transition-colors mb-10 inline-block"
      >
        ← Back to blog
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>{formatDate(post.published_at ?? post.created_at)}</span>
          <span>·</span>
          <span>{readingTime(post.content)} min read</span>
        </div>
      </header>

      <div className="prose">
        <MdxRenderer source={post.content} />
      </div>
    </article>
  )
}
