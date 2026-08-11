/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#080B11',
          900: '#0B0F17',
          800: '#111826',
          700: '#182236',
          600: '#25324A',
        },
        paper: {
          100: '#EEF1F7',
          300: '#C7CEDC',
          500: '#8B94A7',
        },
        signal: {
          amber: '#F2A93B',
          blue: '#4C8DFF',
          green: '#3ECF8E',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
