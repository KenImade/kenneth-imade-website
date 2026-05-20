'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type FormState = {
  title: string
  description: string
  tags: string
  live_url: string
  repo_url: string
  cover_image_url: string
  sort_order: number
  published: boolean
}

const EMPTY: FormState = {
  title: '',
  description: '',
  tags: '',
  live_url: '',
  repo_url: '',
  cover_image_url: '',
  sort_order: 0,
  published: false,
}

export default function ProjectEditPage() {
  const params = useParams()
  const router = useRouter()
  const isNew = params.id === 'new'

  const [form, setForm] = useState<FormState>(EMPTY)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }))

  const fetchProject = useCallback(async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('id', params.id)
      .single()
    if (data) {
      set({
        title: data.title,
        description: data.description ?? '',
        tags: data.tags.join(', '),
        live_url: data.live_url ?? '',
        repo_url: data.repo_url ?? '',
        cover_image_url: data.cover_image_url ?? '',
        sort_order: data.sort_order,
        published: data.published,
      })
    }
  }, [params.id])

  useEffect(() => {
    if (!isNew) fetchProject()
  }, [isNew, fetchProject])

  async function handleSave() {
    setLoading(true)
    setError('')

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      live_url: form.live_url.trim() || null,
      repo_url: form.repo_url.trim() || null,
      cover_image_url: form.cover_image_url.trim() || null,
      sort_order: form.sort_order,
      published: form.published,
    }

    const supabase = createClient()
    const { error: err } = isNew
      ? await supabase.from('projects').insert(payload)
      : await supabase.from('projects').update(payload).eq('id', params.id)

    if (err) {
      setError(err.message)
      setLoading(false)
    } else {
      router.push('/admin/projects')
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this project? This cannot be undone.')) return
    const supabase = createClient()
    await supabase.from('projects').delete().eq('id', params.id)
    router.push('/admin/projects')
  }

  const inputClass =
    'w-full border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-accent font-mono'
  const labelClass = 'block text-xs mb-1 text-gray-500 uppercase tracking-wider'

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">{isNew ? 'New Project' : 'Edit Project'}</h1>

      <div className="space-y-4">
        <div>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => set({ title: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => set({ description: e.target.value })}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div>
          <label className={labelClass}>Tags (comma-separated)</label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => set({ tags: e.target.value })}
            placeholder="Next.js, TypeScript, Supabase"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Live URL</label>
          <input type="url" value={form.live_url} onChange={(e) => set({ live_url: e.target.value })} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Repo URL</label>
          <input type="url" value={form.repo_url} onChange={(e) => set({ repo_url: e.target.value })} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Cover Image URL</label>
          <input type="url" value={form.cover_image_url} onChange={(e) => set({ cover_image_url: e.target.value })} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Sort Order</label>
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => set({ sort_order: Number(e.target.value) })}
            className={inputClass}
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
              Delete project
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
