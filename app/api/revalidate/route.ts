import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

const ALLOWED_PATHS = ['/projects', '/blog']

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const { path } = body as { path?: string }
  if (!path || !ALLOWED_PATHS.includes(path)) {
    return NextResponse.json({ error: 'Invalid path.' }, { status: 400 })
  }

  revalidatePath(path)
  return NextResponse.json({ revalidated: true, path })
}
