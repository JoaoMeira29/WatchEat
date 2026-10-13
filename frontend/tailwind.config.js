/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  // The app is always dark: it follows the "dark" class on <html>, not the system setting
  darkMode: 'class',
  theme: {
    // One centred column for every page, so the layout is the same at any window size
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
      },
    },
    extend: {
      colors: {
        // Screening room: warm projector white at one end, the dark of the room at the other
        gray: {
          50: '#F5F3EF',
          100: '#E9E6E0',
          200: '#D3CFC8',
          300: '#B3AFAA',
          400: '#8F8B93',
          500: '#6A6672',
          600: '#4A4753',
          700: '#33313B',
          800: '#23222A',
          900: '#19181F',
          950: '#111016',
        },
        // Curtain red, taken from the logo
        red: {
          100: '#FBE0E3',
          200: '#F6BEC5',
          300: '#F0939E',
          400: '#EC6A79',
          500: '#E23A4E',
          600: '#D7263D',
          700: '#B81D32',
          800: '#94182A',
          900: '#6E1420',
        },
        // Popcorn butter: ratings and everything about food
        butter: {
          200: '#FCE7A6',
          300: '#FAD978',
          400: '#F6C344',
          500: '#E5AC1F',
        },
      },
      fontFamily: {
        sans: ['Figtree', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
        display: ['"Big Shoulders Display"', 'Impact', 'Haettenschweiler', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
