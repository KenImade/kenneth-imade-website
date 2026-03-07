'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils'
import AdminEditor from '@/components/AdminEditor'

type FormState = {
  title: string
  slug: string
  excerpt: string
  content: string
  published: boolean
}

const EMPTY: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  published: false,
}

export default function PostEditPage() {
  const params = useParams()
  const router = useRouter()
  const isNew = params.id === 'new'

  const [form, setForm] = useState<FormState>(EMPTY)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }))

  const fetchPost = useCallback(async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('id', params.id)
      .single()
    if (data) {
      set({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt ?? '',
        content: data.content,
        published: data.published,
      })
    }
  }, [params.id])

  useEffect(() => {
    if (!isNew) fetchPost()
  }, [isNew, fetchPost])

  async function handleSave() {
    setLoading(true)
    setError('')

    const slug = form.slug.trim() || slugify(form.title)
    const payload = {
      title: form.title.trim(),
      slug,
      excerpt: form.excerpt.trim() || null,
      content: form.content,
      published: form.published,
      // Set published_at when first publishing; don't overwrite on edits
      ...(isNew && form.published ? { published_at: new Date().toISOString() } : {}),
    }

    const supabase = createClient()
    const { error: err } = isNew
      ? await supabase.from('posts').insert(payload)
      : await supabase.from('posts').update(payload).eq('id', params.id)

    if (err) {
      setError(err.message)
      setLoading(false)
    } else {
      router.push('/admin/posts')
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this post? This cannot be undone.')) return
    const supabase = createClient()
    await supabase.from('posts').delete().eq('id', params.id)
    router.push('/admin/posts')
  }

  const inputClass =
    'w-full border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-accent font-mono'
  const labelClass = 'block text-xs mb-1 text-gray-500 uppercase tracking-wider'

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-8">{isNew ? 'New Post' : 'Edit Post'}</h1>

      <div className="space-y-4">
        <div>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => {
              const title = e.target.value
              set({ title, ...(isNew ? { slug: slugify(title) } : {}) })
            }}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Slug</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => set({ slug: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => set({ excerpt: e.target.value })}
            rows={2}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div>
          <label className={labelClass}>Content (Markdown)</label>
          <AdminEditor
            value={form.content}
            onChange={(content) => set({ content })}
            placeholder="Write your post in Markdown…"
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="published"
            checked={form.published}
            onChange={(e) => set({ published: e.target.checked })}
            className="accent-accent"
          />
          <label htmlFor="published" className="text-sm">
            Published
          </label>
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <div className="flex items-center gap-6 pt-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-accent text-black px-6 py-2 text-sm hover:bg-blue-300 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving…' : 'Save'}
          </button>
          {!isNew && (
            <button onClick={handleDelete} className="text-xs text-red-500 hover:underline">
              Delete post
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
