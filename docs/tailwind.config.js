module.exports = {
  corePlugins: {
    preflight: false,
  },
  darkMode: false, // or 'media' or 'class'
  important: true,
  mode: 'jit',
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        amazon: '#f90',
      },
      fontFamily: {
        amazon: [
          'Amazon Ember',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
};
