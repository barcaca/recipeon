/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts}'],
  darkMode: ['class'],
  theme: { fontFamily: {
    sans: ['Raleway', 'system-ui', 'sans-serif'],
    display: ['Cinzel Decorative', 'system-ui', 'sans-serif'],
    title: ['Poppins', 'system-ui', 'sans-serif'],
  },
  extend: {
    screens: {
      xs: '450px',
    },
  }
  },
  plugins: [],
}

