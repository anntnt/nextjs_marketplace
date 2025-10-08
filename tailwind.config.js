/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin'

const config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#06B6D4', // Soft Cyan
          secondary: '#036C87', // Deep Teal
          accent: '#F87171', // Coral
          success: '#A7F3D0', // Mint
          warning: '#F59E0B', // Amber CTA
          error: '#EF4444', // Red
          bg: '#F3F4F6', // Mist Gray background
          surface: '#FFFFFF', // Card/Section
          border: '#E5E7EB', // Gray Line
          text: '#111827', // Graphite text
          muted: '#64748B', // Cool Gray subtext
        },
        dark: {
          bg: '#0F172A',
          surface: '#1E293B',
          text: '#F9FAFB',
          muted: '#94A3B8',
        },
      },
      textColor: {
        inherit: 'inherit',
      },
    },
  },
  plugins: [flowbitePlugin],
}

export default config
