const withTM = require("next-transpile-modules")(["@aws-amplify/ui-react"], {
  resolveSymlinks: true,
});

const withMDX = require("@next/mdx")({ extension: /\.mdx?$/ });

module.exports = withMDX(
  withTM({
    pageExtensions: ["js", "jsx", "mdx", "tsx"],
  })
);
