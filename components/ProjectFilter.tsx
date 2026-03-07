'use client'

import { useState } from 'react'
import ProjectCard from './ProjectCard'
import type { Project } from '@/lib/types'

export default function ProjectFilter({
  projects,
  tags,
}: {
  projects: Project[]
  tags: string[]
}) {
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = selected
    ? projects.filter((p) => p.tags.includes(selected))
    : projects

  function toggle(tag: string) {
    setSelected((prev) => (prev === tag ? null : tag))
  }

  const pillBase = 'text-xs px-3 py-1 border transition-colors duration-150'
  const pillActive = 'border-accent text-accent bg-accent/10'
  const pillIdle = 'border-gray-300 dark:border-gray-700 text-gray-500 hover:border-accent hover:text-accent'

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {/* "All" resets the filter */}
          <button
            onClick={() => setSelected(null)}
            className={`${pillBase} ${selected === null ? pillActive : pillIdle}`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggle(tag)}
              className={`${pillBase} ${selected === tag ? pillActive : pillIdle}`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm">No projects match this filter.</p>
      ) : (
        <div className="grid gap-4">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
