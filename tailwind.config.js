/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme colors (new palette)
        light: {
          background: '#F7F8FA',
          primary: '#71ADBA',
          accent: '#EDEAB1',
          secondary: '#9C71BA',
          text: '#1F2937',
          textSoft: '#6B7280',
          border: '#E5E7EB',
          cta: '#A855F7'
        },
        // Dark theme colors
        dark: {
          background: '#0f172a',
          backgroundSecondary: '#1a2234',
          primary: '#71ADBA',
          secondary: '#9C71BA',
          accent: '#EDEAB1',
          text: '#F9FAFB',
          textSoft: '#D1D5DB',
          border: '#374151',
          cta: '#A855F7'
        }
      },
      transitionProperty: {
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke'
      },
      transitionDuration: {
        '250': '250ms'
      }
    },
  },
  plugins: [],
} 