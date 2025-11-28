/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        'eko-gold': '#D4AF37',
        'eko-green': '#064E3B',
        'eko-black': '#121212',
        'eko-cream': '#F5F5DC',
      }
    },
  },
  plugins: [],
}
