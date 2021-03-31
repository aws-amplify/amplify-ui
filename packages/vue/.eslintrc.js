module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [],
  parserOptions: {
    ecmaVersion: 2020,
    allowImportExportEverywhere: true,
    sourceType: "module"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
