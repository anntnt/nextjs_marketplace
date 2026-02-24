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
        // Flattened brand colors (Tailwind 3.4+ compatible)
        'brand-primary': '#06B6D4',
        'brand-secondary': '#036C87',
        'brand-accent': '#F87171',
        'brand-success': '#A7F3D0',
        'brand-warning': '#F59E0B',
        'brand-error': '#EF4444',
        'brand-bg': '#F3F4F6',
        'brand-surface': '#FFFFFF',
        'brand-border': '#E5E7EB',
        'brand-text': '#111827',
        'brand-muted': '#64748B',

        // Dark mode colors
        'dark-bg': '#0F172A',
        'dark-surface': '#1E293B',
        'dark-text': '#F9FAFB',
        'dark-muted': '#94A3B8',

        // Flash message colors (AA compliant)
        success: {
          DEFAULT: '#064E3B',
          light: '#D1FAE5',
        },
        info: {
          DEFAULT: '#034D67',
          light: '#BAE6FD',
        },
        warning: {
          DEFAULT: '#78350F',
          light: '#FEF3C7',
        },
        error: {
          DEFAULT: '#7F1D1D',
          light: '#FECACA',
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
