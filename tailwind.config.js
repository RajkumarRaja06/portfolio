/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0b0d14',
          surface: '#11141f',
          card: '#161a29',
          border: '#232a3d',
          muted: '#8b9bb4',
        },
        gold: {
          DEFAULT: '#e5a93c',
          amber: '#f59e0b',
          light: '#fcd34d',
          dark: '#b45309',
          glow: 'rgba(229, 169, 60, 0.15)',
        },
        alabaster: {
          DEFAULT: '#faf9f6',
          surface: '#f3f1ea',
          card: '#ffffff',
          border: '#e4e1d6',
          muted: '#6b7280',
        },
        accent: {
          cyan: '#22d3ee',
          magenta: '#d946ef',
          emerald: '#10b981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern-dark': 'linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
        'grid-pattern-light': 'linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-44': '44px 44px',
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
        'spin-slow-reverse': 'spin 24s linear infinite reverse',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
