module.exports = {
  darkMode: false, // or 'media' or 'class'

  // This will ensure we override `prose`
  important: true,

  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
};
