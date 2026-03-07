import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Contact</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10 text-sm">
        Have a project in mind or want to work together? Send me a message.
      </p>

      <ContactForm />

      <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-400 mb-3">Prefer a document?</p>
        <a
          href="/resume.pdf"
          download
          className="text-sm text-accent hover:underline underline-offset-2"
        >
          Download Resume (PDF)
        </a>
      </div>
    </div>
  )
}
