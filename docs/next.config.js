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

module.exports = withCompileNodeModules({
  env: { BRANCH },
  pageExtensions: ["mdx", "tsx"],
  // Convenience for local development, since / will 404 by default
  redirects() {
    return [
      {
        source: "/",
        destination: "/ui",
        permanent: true,
      },
    ];
  },
  // ! This exists due to the TypeScript issues in amplify-docs
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    // https://github.com/wooorm/xdm#next
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        {
          loader: "xdm/webpack.cjs",
          options: {
            rehypePlugins: [require("mdx-prism")],
            remarkPlugins: [
              require("remark-gfm"),
              require("remark-mdx-images"),
              [
                require("remark-github"),
                {
                  repository: "aws-amplify/docs",
                },
              ],
              // Remove frontmatter from MDX
              require("remark-frontmatter"),
              // Extract to `frontmatter` export
              [
                require("remark-mdx-frontmatter").remarkMdxFrontmatter,
                { name: "frontmatter" },
              ],
              require("amplify-docs/src/plugins/headings.tsx"),
            ],
          },
        },
      ],
    });

    return config;
  },
});
