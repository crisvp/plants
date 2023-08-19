/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    prefix: 'pl-tw-',
    extend: {
      keyframes: {
        'slide-head-out': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(90%)' },
        },
        'slide-head-in': {
          '0%': { transform: 'translateX(90%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'slide-head-out': 'slide-head-out 0.5s ease-in-out',
        'slide-head-in': 'slide-head-in 0.5s ease-in-out',
      },
    },
  },
};
