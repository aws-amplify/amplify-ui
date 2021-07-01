// TODO Remove this once @aws-amplify/ui-react is compiled
const withCompileNodeModules = require("@moxy/next-compile-node-modules")({
  include: /[\\/]packages[\\/]/,
  test: /\.(js|ts)x?/,
});

module.exports = withCompileNodeModules({
  reactStrictMode: true,
});
