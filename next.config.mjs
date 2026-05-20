/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // shiki (used by rehype-pretty-code) must run in Node.js, not the Edge runtime
    serverComponentsExternalPackages: ['shiki'],
  },
}

export default nextConfig
