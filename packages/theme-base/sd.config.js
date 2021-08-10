/*
 * Style Dictionary config
 */

const { formatHelpers } = require('style-dictionary');
const ReactNativeTransforms = require('./src/platforms/react-native/transforms');
const ReactNativeFormats = require('./src/platforms/react-native/formats');
const WebTransforms = require('./src/platforms/web/transforms');

const CSS_VARIABLE_PREFIX = 'amplify';
const CSS_VARIABLE_SCOPE = ':root';

module.exports = {
  source: ['src/tokens/index.js'],
  format: {
    'javascript/cjs-nested': CommonJSNestedFormatter,
    ...ReactNativeFormats,
  },
  transform: {
    ...ReactNativeTransforms,
    ...WebTransforms,
  },
  platforms: {
    css: {
      transforms: ['attribute/cti', 'name/cti/kebab', 'CSSBoxShadow'],
      prefix: CSS_VARIABLE_PREFIX,
      files: [
        {
          destination: 'dist/variables.scss',
          format: 'css/variables',
          options: {
            selector: CSS_VARIABLE_SCOPE,
            outputReferences: true,
            showFileHeader: false,
          },
        },
      ],
    },
    js: {
      transforms: ['attribute/cti', 'name/cti/kebab'],
      files: [
        {
          destination: 'dist/theme.js',
          minified: true,
          format: 'javascript/cjs-nested',
        },
        {
          destination: 'dist/theme-unminified.js',
          format: 'javascript/cjs-nested',
        },
      ],
    },
    reactNative: {
      transforms: [
        'RNFontWeight',
        'RNFontSize',
        'RNBorderRadius',
        'RNBorderWidth',
        'RNSpace',
        'RNOpacity',
        'RNTime',
        'RNShadow',
      ],
      files: [
        {
          destination: 'dist/react-native/theme.js',
          format: 'RNFormat',
          filter: (token) =>
            !token.path.some((p) => ['hover', 'focus'].includes(p)),
        },
      ],
    },
  },
};

/*
 * CommonJS + Nested formatter
 * Exports a theme (minified) as a named export
 */
function CommonJSNestedFormatter({ dictionary, options, file }) {
  const { fileHeader, minifyDictionary } = formatHelpers;
  const theme = file.minified
    ? minifyDictionary(dictionary.tokens)
    : dictionary.tokens;
  return (
    fileHeader({ file }) + `module.exports = ${JSON.stringify(theme, null, 2)};`
  );
}
