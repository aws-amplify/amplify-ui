const { patchWebpackConfig } = require('next-global-css');

module.exports = {
  reactStrictMode: true,
  /**
   * Setting trailingSlash to true to resolve known bug with federated sign in redirect + next.js
   * https://github.com/aws-amplify/amplify-cli/issues/7359#issuecomment-812821315
   */
  trailingSlash: true,
  pageExtensions: ['page.tsx'],
  webpack: (config, options) => {
    // allows importing of css files inside modules
    patchWebpackConfig(config, options);

    return config;
  },
};
