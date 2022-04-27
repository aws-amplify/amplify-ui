const path = require('path');

module.exports = {
  components: './playroom/Components.tsx',
  outputPath: './public/playroom',

  // Optional:
  title: 'Amplify UI',
  snippets: './playroom/snippets.ts',
  frameComponent: './playroom/FrameComponent.tsx',
  scope: './playroom/scope.ts',
  widths: [320, 768, 1024],
  port: 9000,
  openBrowser: true,
  exampleCode: `
    <Button>
      Hello World!
    </Button>
    {/* You can access theme tokens like so: */}
    {/* <Card backgroundColor={theme.tokens.colors.brand.primary[10]}> */}
  `,
  baseUrl: '/playroom/',
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/,
          include: [
            path.resolve(__dirname, 'playroom'),
            path.resolve(__dirname, 'src'),
          ],
          use: ['swc-loader'],
        },
        {
          test: /styles\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    // Custom webpack config goes here...
  }),
  iframeSandbox: 'allow-scripts',
};
