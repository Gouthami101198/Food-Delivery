/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff8f1',
          100: '#feeee2',
          200: '#fcd9c4',
          300: '#fab998',
          400: '#f68e64',
          500: '#ff5c00', // signature vibrant delivery orange
          600: '#e54900',
          700: '#bf3600',
          800: '#982b04',
          900: '#7a2507',
          dark: '#1c1917',
        },
        fresh: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#10b981',
          600: '#059669',
        },
        surface: {
          DEFAULT: '#ffffff',
          warm: '#fbfaf8',
          muted: '#f4f3f0',
          dark: '#0f172a',
          card: '#ffffff',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'float': '0 10px 30px -4px rgba(255, 92, 0, 0.15)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 25px -5px rgba(255, 92, 0, 0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}

