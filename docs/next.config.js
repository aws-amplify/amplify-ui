const path = require('path');
const { execSync } = require('child_process');

const reHypeIgnoreLines = require('./src/plugins/rehype-ignore-code');
const gitHead = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const BRANCH = gitHead === 'HEAD' ? 'main' : gitHead;

const withNextPluginPreval = require('next-plugin-preval/config')();

module.exports = withNextPluginPreval({
  env: {
    BRANCH,
    SITE_URL: process.env.SITE_URL,
    DOCSEARCH_DOCS_APP_ID: process.env.DOCSEARCH_DOCS_APP_ID,
    DOCSEARCH_DOCS_API_KEY: process.env.DOCSEARCH_DOCS_API_KEY,
    DOCSEARCH_DOCS_INDEX_NAME: process.env.DOCSEARCH_DOCS_INDEX_NAME,
  },
  // Differentiate pages with frontmatter & layout vs. normal MD(X)
  pageExtensions: ['page.mdx', 'page.tsx'],

  swcMinify: true,

  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: [
          // IMPORTANT:
          // These are ONLY used for the Dev server and MUST
          // be kept in sync with customHttp.yml
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // for 'Content-Security-Policy', see _document.page.tsx
        ],
      },
    ];
  },

  // These redirects are because of the IA change from previous docs
  async redirects() {
    return [
      // Normalizing URLs
      // these need to come before the generic redirects
      {
        source:
          '/:platform(react|angular|vue|flutter)/components/authenticator/:page*',
        destination: '/:platform/connected-components/authenticator/:page*',
        permanent: true,
      },
      {
        source: '/:platform(react|angular|vue)/components/geo/:page*',
        destination: '/:platform/connected-components/geo/:page*',
        permanent: true,
      },
      {
        source:
          '/:platform(react|react-native)/components/in-app-messaging/:page*',
        destination: '/:platform/connected-components/in-app-messaging/:page*',
        permanent: true,
      },
      {
        source: '/ui/primitives/stepperField',
        destination: '/components/stepperfield',
        permanent: true,
      },
      {
        source: '/ui/primitives/toggleButton',
        destination: '/components/togglebutton',
        permanent: true,
      },
      {
        source: '/ui/primitives/visuallyHidden',
        destination: '/components/visuallyhidden',
        permanent: true,
      },
      /*
       * source: /ui/theme/alternativeStyling and theming/alternative-styling
       * destination: '/guides/css-in-js'
       */
      {
        source:
          '/:page(ui/theme/alternativeStyling|theming/alternative-styling)',
        destination: '/guides/css-in-js',
        permanent: true,
      },
      // Generic redirects from old IA
      {
        source: '/ui',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ui/components/:page*',
        destination: '/components/:page*',
        permanent: true,
      },
      {
        source: '/ui/getting-started/:page*',
        destination: '/getting-started/:page*',
        permanent: true,
      },
      {
        source: '/ui/primitives/:page*',
        destination: '/components/:page*',
        permanent: true,
      },
      {
        source: '/ui/theme/:page*',
        destination: '/theming/:page*',
        permanent: true,
      },
      /**
       * source: a url has one of the folder's names (components, getting-started, guides, theming)
       * destination: add '/react/' to the the beginning
       */
      {
        source:
          '/:nav(connected-components|components|getting-started|guides|theming)/:page*',
        destination: '/react/:nav/:page*',
        permanent: true,
      },
      /**
       * source: a url points one of the folder's names (components, getting-started, guides, theming)'s index file
       * destination: add '/react/' to the beginning
       */
      {
        source:
          '/:nav(connected-components|components|getting-started|guides|theming)',
        destination: '/react/:nav',
        permanent: true,
      },

      /**
       * Renamed the "headless" Authenticator docs to "advanced"
       */
      {
        source:
          '/:platform(react|react-native|angular|vue)/connected-components/authenticator/headless',
        destination:
          '/:platform(react|react-native|angular|vue)/connected-components/authenticator/advanced',
        permanent: true,
      },

      /**
       * Renamed "expander" to "accordion"
       */
      {
        source: '/react/components/expander',
        destination: '/react/components/accordion',
        permanent: false,
      },
      /**
       * Renamed "Storage Manager" to "File Uploader"
       */
      {
        source: '/react/connected-components/storage/storagemanager',
        destination: '/react/connected-components/storage/fileuploader',
        permanent: true,
      },
      /**
       * Redirect traffic from CRA to Vite getting started page
       */
      {
        source: '/react/getting-started/usage/create-react-app',
        destination: '/react/getting-started/usage/vite',
        permanent: true,
      },
    ];
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },

  webpack(config) {
    const defaultRehypePlugins = [
      // This is a custom plugin that removes lines that end in `// IGNORE`
      // This allows us to include code necessary for an example to run
      // but that should not be in customer's code. For example, using a
      // plugin to make mock a connected component.
      reHypeIgnoreLines,
      require('mdx-prism'),
      // TODO: these are older versions of these packages because the newer versions
      // are ESM only.
      require('rehype-slug'),
      require('rehype-autolink-headings'),
    ];
    const defaultRemarkPlugins = [
      // This needs to come first to import the code before other plugins
      require('remark-code-import'),
      // Disabling snack until we fix it
      // require('./src/plugins/remark-snackplayer'),
      require('remark-gfm'),
      require('remark-mdx-images'),
      [
        require('remark-github'),
        {
          repository: 'aws-amplify/amplify-ui',
        },
      ],
    ];

    // See: https://mdxjs.com/docs/getting-started/#nextjs
    config.module.rules.push({
      test: /\.page.mdx$/,
      use: [
        {
          loader: '@mdx-js/loader',
          /** @type {import('@mdx-js/loader').Options} */
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
          loader: '@mdx-js/loader',
          /** @type {import('@mdx-js/loader').Options} */
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
});
