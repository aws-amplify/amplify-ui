const { withGlobalCss } = require('next-global-css');

module.exports = withGlobalCss()({
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts'],
  basePath: '/liveness-next-example',
});
