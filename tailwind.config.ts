import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        grid: 'var(--color-grid)',
      },
      fontFamily: {
        heading: ['"DM Sans"', 'Outfit', 'sans-serif'],
        ui: ['"JetBrains Mono"', '"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
