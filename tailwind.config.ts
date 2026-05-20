import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light blue accent — swap hex here to retheme the whole site
        accent: '#60A5FA',
      },
      fontFamily: {
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
