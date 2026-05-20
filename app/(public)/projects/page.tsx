import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import ProjectFilter from '@/components/ProjectFilter'
import type { Project } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = { title: 'Projects' }

export default async function ProjectsPage() {
  const supabase = createClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })

  const allProjects: Project[] = projects ?? []
  const allTags = Array.from(new Set(allProjects.flatMap((p) => p.tags))).sort()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Projects</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10 text-sm">
        A selection of things I&apos;ve built.
      </p>
      <ProjectFilter projects={allProjects} tags={allTags} />
    </div>
  )
}
