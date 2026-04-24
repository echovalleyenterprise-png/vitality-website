/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Black / dark backgrounds
          black:        '#080808',
          brown:        '#0E0E0E',   // mapped: was warm brown → now deep black
          'brown-light':'#181818',   // mapped: was light brown → now dark charcoal
          // Grey scale
          beige:        '#242424',   // mapped: used for subtle borders/hover
          grey:         '#888888',   // muted text
          'grey-light':  '#AAAAAA',
          // Gold
          gold:          '#C9A84C',
          'gold-light':  '#E4C97A',
          'gold-dim':    '#8A6B2A',
          // Light text
          cream:         '#D8D8D8',  // mapped: was warm cream → now light silver
          'cream-light': '#F0F0F0',  // mapped: near-white
          white:         '#FFFFFF',
        },
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        sans:   ['"Cormorant Garamond"', '"Garamond"', 'Georgia', 'serif'],
        body:   ['"Raleway"', '"Helvetica Neue"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E4C97A 50%, #C9A84C 100%)',
        'dark-gradient': 'linear-gradient(180deg, #080808 0%, #0E0E0E 100%)',
        'grey-gradient': 'linear-gradient(135deg, #181818 0%, #242424 100%)',
      },
    },
  },
  plugins: [],
};
