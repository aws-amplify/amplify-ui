/*
 * Style Dictionary config
 */

const { formatHelpers } = require('style-dictionary');

const CSS_VARIABLE_PREFIX = 'amplify';
const CSS_VARIABLE_SCOPE = ':root';

module.exports = {
  source: ['src/theme/tokens/index.js'],
  transform: {
    cssPadding: {
      type: 'value',
      transitive: true,
      matcher: (token) => token.path[token.path.length - 1] === 'padding',
      transformer: (token) => {
        if (Array.isArray(token.value)) {
          return token.value.join(' ');
        } else {
          return token.value;
        }
      },
    },
  },
  platforms: {
    css: {
      transforms: ['attribute/cti', 'name/cti/kebab', 'cssPadding'],
      prefix: CSS_VARIABLE_PREFIX,
      files: [
        {
          destination: 'src/theme/css/variables.scss',
          format: 'css/variables',
          options: {
            selector: CSS_VARIABLE_SCOPE,
            outputReferences: true,
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
  },
  format: {
    'javascript/cjs-nested': CommonJSNestedFormatter,
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
