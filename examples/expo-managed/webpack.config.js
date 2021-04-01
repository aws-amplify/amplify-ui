const path = require("path");
const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Transpile workspace projects (to avoid a separate build step)
  config.module.rules.push({
    test: /\.(js|jsx|ts|tsx)$/,
    include: [
      path.dirname(require.resolve("@aws-amplify/ui-react/package.json")),
    ],
    use: "babel-loader",
  });

  // REQUIRED for previous rule to watch the correct files!
  config.resolve.symlinks = true;

  return config;
};
