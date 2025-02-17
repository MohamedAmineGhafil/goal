/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/styles/**/*.css",
    "index.html"
  ],
  theme: {
    extend: {
      colors: {
        'retro-bg': '#1a1a1a',
        'retro-window': '#2a2a2a',
        'retro-border': '#3a3a3a',
      },
      fontFamily: {
        'fsex300': ['FSEX300', 'monospace'],
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px rgba(147, 197, 253, 0.3)',
        'retro-sm': '2px 2px 0px 0px rgba(147, 197, 253, 0.3)',
      },
    },
  },
  plugins: [],
}