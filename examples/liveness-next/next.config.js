const { withGlobalCss } = require('next-global-css');

module.exports = withGlobalCss()({
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
  basePath: '/liveness-next-example',
});
