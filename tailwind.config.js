/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        
        'app-bg':'#A87BE3',
        'app-light-bg':'#EEEAF5'
        
      },
    },
  },
  plugins: [],
}

