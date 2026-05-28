/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0f1117',
          2: '#181c27',
          3: '#1e2233',
        },
        brand: {
          yellow: '#F0B90B',
          'yellow-dim': '#BA7517',
          green: '#1D9E75',
          red: '#E24B4A',
          blue: '#378ADD',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
