const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PATH': JSON.stringify(
        process.env.VERSION === 'gen1' ? 'src/aws-exports' : 'amplify_outputs'
      ),
    }),
  ],
};
