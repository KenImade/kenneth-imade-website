import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'
import { sendContactEmail } from '@/lib/email'

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required').max(5000),
})

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.errors[0].message },
      { status: 400 }
    )
  }

  const { name, email, message } = result.data

  // Service role bypasses RLS — this key must never reach the client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error: dbError } = await supabase
    .from('contact_messages')
    .insert({ name, email, message })

  if (dbError) {
    console.error('[contact] db error:', dbError.message)
    return NextResponse.json({ error: 'Failed to save message.' }, { status: 500 })
  }

  try {
    await sendContactEmail({ name, email, message })
  } catch (err) {
    // Don't fail the request — message is saved even if email delivery fails
    console.error('[contact] email error:', err)
  }

  return NextResponse.json({ success: true })
}
