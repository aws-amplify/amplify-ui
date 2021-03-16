module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./docs/.vitepress/**/*.js",
      "./docs/.vitepress/**/*.vue",
      "./docs/.vitepress/**/*.ts",
    ],
    options: {
      safelist: ["html", "body"],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
