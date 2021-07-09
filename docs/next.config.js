const { execSync } = require("child_process");

const gitHead = execSync("git rev-parse --abbrev-ref HEAD")
  .toString()
  .trim();

const BRANCH = gitHead === "HEAD" ? "main" : gitHead;

const withCompileNodeModules = require("@moxy/next-compile-node-modules")({
  include: /[\\/]packages[\\/]/,
  test: /\.(js|ts)x?/,
});

const withMDX = require("@next/mdx")({ extension: /\.mdx?$/ });

module.exports = withCompileNodeModules(
  withMDX({
    env: {
      BRANCH,
    },
    pageExtensions: ["js", "jsx", "mdx", "tsx"],
  })
);
