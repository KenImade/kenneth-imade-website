import Badge from '@/components/ui/Badge'
import type { Project } from '@/lib/types'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group border border-gray-200 dark:border-gray-800 p-6 hover:border-accent transition-all duration-200 hover:-translate-y-px">

      <div className="flex items-start justify-between gap-4 mb-3">
        <h2 className="font-bold group-hover:text-accent transition-colors duration-200">
          {project.title}
        </h2>
        <div className="flex gap-4 text-xs shrink-0">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline underline-offset-2"
            >
              Live ↗
            </a>
          )}
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-colors"
            >
              Repo ↗
            </a>
          )}
        </div>
      </div>

      {project.description && (
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">
          {project.description}
        </p>
      )}

      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}
    </div>
  )
}
