const { execSync } = require('child_process');
const path = require('path');

const gitHead = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const BRANCH = gitHead === 'HEAD' ? 'main' : gitHead;

const withNextPluginPreval = require('next-plugin-preval/config')();
const withCompileNodeModules = require('@moxy/next-compile-node-modules')({
  include: [
    // Using `path.dirname` because `package.json#main` doesn't resolve to a real file.
    // `amplify-docs` aren't a distributable package, so we have to compile them.
    path.dirname(require.resolve('amplify-docs/package.json')),
  ],
  test: /\.(js|ts)x?/,
});

module.exports = withNextPluginPreval(
  withCompileNodeModules({
    env: { BRANCH },
    // Differentiate pages with frontmatter & layout vs. normal MD(X)
    pageExtensions: ['page.mdx', 'page.tsx'],

    // Convenience for local development, since / will 404 by default
    redirects() {
      return [
        {
          source: '/',
          destination: '/ui',
          permanent: true,
        },
        // Redirect top-level nav links to production doc site while this is
        // in developer preview so this site doesn't get 404s
        {
          source: '/lib',
          destination: 'https://docs.amplify.aws/lib',
          basePath: false,
          permanent: true,
        },
        {
          source: '/start',
          destination: 'https://docs.amplify.aws/start',
          basePath: false,
          permanent: true,
        },
        {
          source: '/cli',
          destination: 'https://docs.amplify.aws/cli',
          basePath: false,
          permanent: true,
        },
        {
          source: '/console',
          destination: 'https://docs.amplify.aws/console',
          basePath: false,
          permanent: true,
        },
        {
          source: '/guides',
          destination: 'https://docs.amplify.aws/guides',
          basePath: false,
          permanent: true,
        },
      ];
    },
    // ! This exists due to the TypeScript issues in amplify-docs
    typescript: {
      ignoreBuildErrors: true,
    },
    webpack(config) {
      const defaultRehypePlugins = [require('mdx-prism')];
      const defaultRemarkPlugins = [
        require('remark-code-import'),
        require('remark-gfm'),
        require('remark-mdx-images'),
        [
          require('remark-github'),
          {
            repository: 'aws-amplify/amplify-ui',
          },
        ],
        require('amplify-docs/src/plugins/headings.tsx'),
      ];

      // See: https://github.com/wooorm/xdm#next
      config.module.rules.push({
        test: /\.page.mdx$/,
        use: [
          {
            loader: 'xdm/webpack.cjs',
            options: {
              rehypePlugins: defaultRehypePlugins,
              // Pages have reqiure layout & frontmatter
              remarkPlugins: defaultRemarkPlugins.concat([
                // Remove frontmatter from MDX
                require('remark-frontmatter'),
                // Extract to `frontmatter` export
                [
                  require('remark-mdx-frontmatter').remarkMdxFrontmatter,
                  { name: 'frontmatter' },
                ],
                require('./src/plugins/remark-layout'),
              ]),
            },
          },
        ],
      });

      config.module.rules.push({
        exclude: /\.page.mdx$/,
        test: /\.mdx?$/,
        use: [
          {
            loader: 'xdm/webpack.cjs',
            options: {
              rehypePlugins: defaultRehypePlugins,
              remarkPlugins: defaultRemarkPlugins,
            },
          },
        ],
      });

      config.module.rules.push({
        test: /\.feature$/,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      });

      return config;
    },
  })
);
