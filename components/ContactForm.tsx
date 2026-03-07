'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function set(patch: Partial<typeof form>) {
    setForm((f) => ({ ...f, ...patch }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } else {
      const data = await res.json().catch(() => ({}))
      setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-gray-200 dark:border-gray-800 p-8 text-center">
        <p className="font-medium text-green-500 mb-1">Message sent.</p>
        <p className="text-xs text-gray-400">I&apos;ll get back to you soon.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-xs text-accent hover:underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    )
  }

  const inputClass =
    'w-full border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-accent font-mono'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs mb-1 text-gray-500 uppercase tracking-wider">
          Name
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => set({ name: e.target.value })}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs mb-1 text-gray-500 uppercase tracking-wider">
          Email
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => set({ email: e.target.value })}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs mb-1 text-gray-500 uppercase tracking-wider">
          Message
        </label>
        <textarea
          value={form.message}
          onChange={(e) => set({ message: e.target.value })}
          required
          rows={5}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="text-red-500 text-xs">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-accent text-black px-6 py-2 text-sm hover:bg-blue-300 transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
