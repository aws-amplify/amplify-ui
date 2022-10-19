const path = require('path');
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

    // resolve react and react-dom from project node_modules
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react-map-gl': path.resolve(__dirname, 'node_modules/react-map-gl'),
    };

    return config;
  },
};
