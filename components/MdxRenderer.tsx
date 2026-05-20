import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode, { type Options } from 'rehype-pretty-code'

const prettyCodeOptions: Options = {
  // Dual theme — light/dark handled via CSS data attributes set by rehype-pretty-code
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  keepBackground: false,
}

// Server Component — no 'use client' needed
export default function MdxRenderer({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
        },
      }}
    />
  )
}
