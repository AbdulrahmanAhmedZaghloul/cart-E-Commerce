/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('../../image/slider_bg.jpg')",
        'footer-texture': "url('../../image/slider_bg.jpg')",
      }
    },
  },
  plugins: [],
}

