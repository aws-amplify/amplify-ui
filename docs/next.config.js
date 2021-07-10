const { execSync } = require("child_process");
const path = require("path");

const gitHead = execSync("git rev-parse --abbrev-ref HEAD")
  .toString()
  .trim();

const BRANCH = gitHead === "HEAD" ? "main" : gitHead;

const withCompileNodeModules = require("@moxy/next-compile-node-modules")({
  include: [
    // Using `path.dirname` because `package.json#main` doesn't exist in some packages yet
    path.dirname(require.resolve("@aws-amplify/ui-core/package.json")),
    path.dirname(require.resolve("@aws-amplify/ui-react/package.json")),
    path.dirname(require.resolve("amplify-docs/package.json")),
  ],
  test: /\.(js|ts)x?/,
});

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [
      require("remark-slug"),
      require("./src/plugins/frontmatter"),
      // ❗️ Cannot use this with <TableOfContents> because it expects a different structure
      // [
      //   require("remark-autolink-headings"),
      //   {
      //     linkProperties: {
      //       className: ["anchor"],
      //     },
      //   },
      // ],
      require("amplify-docs/src/plugins/headings.tsx"),
      require("remark-code-titles"),
    ],
    rehypePlugins: [require("mdx-prism")],
  },
});

module.exports = withCompileNodeModules(
  withMDX({
    env: { BRANCH },

    pageExtensions: ["mdx", "tsx"],

    // Improve local DX, since we're working on a subset of https://docs.amplify.aws/
    async redirects() {
      return [
        {
          source: "/",
          destination: "/ui",
          permanent: true,
        },
      ];
    },
  })
);
