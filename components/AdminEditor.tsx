'use client'

import { useState } from 'react'
import { marked } from 'marked'

interface AdminEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function AdminEditor({ value, onChange, placeholder }: AdminEditorProps) {
  const [preview, setPreview] = useState(false)

  // marked.parse() is synchronous when no async extensions are used
  const previewHtml = marked.parse(value) as string

  const tabClass = (active: boolean) =>
    `text-xs uppercase tracking-wider transition-colors ${
      active ? 'text-accent' : 'text-gray-400 hover:text-accent'
    }`

  return (
    <div>
      <div className="flex gap-4 mb-2">
        <button type="button" onClick={() => setPreview(false)} className={tabClass(!preview)}>
          Write
        </button>
        <button type="button" onClick={() => setPreview(true)} className={tabClass(preview)}>
          Preview
        </button>
      </div>

      {preview ? (
        <div
          className="prose min-h-64 border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm overflow-auto"
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={20}
          className="w-full border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-accent resize-none font-mono"
        />
      )}
    </div>
  )
}
