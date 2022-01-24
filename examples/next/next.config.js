const { patchWebpackConfig } = require('next-global-css');

module.exports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
  webpack: (config, options) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'mapbox-gl': 'maplibre-gl',
    };

    return patchWebpackConfig(config, options);
  },
};
