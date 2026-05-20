export type Project = {
  id: string
  title: string
  description: string | null
  tags: string[]
  live_url: string | null
  repo_url: string | null
  cover_image_url: string | null
  published: boolean
  sort_order: number
  created_at: string
}

export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  published: boolean
  published_at: string | null
  created_at: string
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}
