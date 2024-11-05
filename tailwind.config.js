/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      gray: {
        1000: '#3E3E3E',
      },
      blue: {
        1000: '#0D93C9',
      },
      purple: '#734AEE',
      red: '#F24932',
      green: {
        100: '#88D8CD',
        200: '#19A494',
        300: '#36A7B9',
      },
      yellow: {
        100: '#FEF083',
        200: '#F1D140',
        300: '#EFB724',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
