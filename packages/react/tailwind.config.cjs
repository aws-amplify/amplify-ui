module.exports = {
  darkMode: false, // or 'media' or 'class'
  important: true,
  mode: 'jit',
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  purge: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/primitives/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {},
  variants: {
    extend: {},
  },
};
