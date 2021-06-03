const withCompileNodeModules = require("@moxy/next-compile-node-modules")({
  include: /[\\/]packages[\\/]/,
  test: /\.(js|ts)x?/,
});

const withMDX = require("@next/mdx")({ extension: /\.mdx?$/ });

module.exports = withCompileNodeModules(
  withMDX({
    i18n: {
      locales: ["en-US"],
      defaultLocale: "en-US",
    },
    pageExtensions: ["js", "jsx", "mdx", "tsx"],
  })
);
