/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bump: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        bump: 'bump 0.3s ease-in-out',
      },
      colors: {
        base: {
          50: '#666869',
          100: '#616364',
          150: '#5c5e5f',
          200: '#57595a',
          250: '#525456',
          300: '#4d4f51',
          350: '#484a4c',
          400: '#434647',
          450: '#3e4142',
          500: '#393c3d',
          550: '#343739',
          600: '#303234',
          650: '#2b2d2f',
          700: '#26282a',
          750: '#212325',
          800: '#1c1f20',
          850: '#171a1c',
          900: '#121517',
          950: '#0d1012',
          1000: '#080b0d',
        },
      },
    },
  },
  plugins: [],
}