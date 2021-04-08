module.exports = {
  darkMode: false, // or 'media' or 'class'
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
};
