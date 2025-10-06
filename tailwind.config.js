/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin'

const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        // 👇 keine "colors" mehr importieren — amber usw. sind automatisch verfügbar
        gray: {
          1000: '#3E3E3E',
        },
        blue: {
          900: '#0D93C9',
          950: '#4368b5',
          960: '#6985c0',
          970: '#557ef9',
          1000: '#1c64f2',
        },
        purple: {
          1000: '#734AEE',
        },
        red: '#F24932',
        green: {
          100: '#88D8CD',
          200: '#19A494',
          300: '#36A7B9',
          400: '#1bfc06',
        },
        yellow: {
          100: '#FEF083',
          200: '#F1D140',
          300: '#EFB724',
        },
        orange: {
          1000: '#f98047',
        },
      },
    },
  },
  plugins: [flowbitePlugin],
}

export default config
