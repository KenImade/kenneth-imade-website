import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Project } from '@/lib/types'

export default async function AdminProjectsPage() {
  const supabase = createClient()
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })

  const projects: Project[] = data ?? []

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-accent text-black px-4 py-2 text-sm hover:bg-blue-300 transition-colors"
        >
          + New
        </Link>
      </div>

      <div className="space-y-2">
        {projects.length === 0 ? (
          <p className="text-gray-400 text-sm">No projects yet.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between border border-gray-200 dark:border-gray-800 px-4 py-3 hover:border-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium text-sm">{project.title}</span>
                <span
                  className={`text-xs ${
                    project.published ? 'text-green-500' : 'text-gray-400'
                  }`}
                >
                  {project.published ? 'published' : 'draft'}
                </span>
              </div>
              <Link
                href={`/admin/projects/${project.id}`}
                className="text-xs text-accent hover:underline"
              >
                Edit
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
