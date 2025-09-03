/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'geo-blue': '#1e40af',
        'geo-green': '#059669',
        'geo-gray': '#6b7280',
      }
    },
  },
  plugins: [],
}
