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
          destination: 'dist/theme.css',
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
          destination: 'src/theme/theme.ts',
          minified: true,
          format: 'application/typescript',
        },
      ],
    },
  },
  format: {
    'application/typescript': TypeScriptNestedFormatter,
  },
};

/*
 * TypeScript + Nested formatter
 * Exports a theme (minified) as a named export
 */
function TypeScriptNestedFormatter({ dictionary, options, file }) {
  const { fileHeader, minifyDictionary } = formatHelpers;
  const theme = file.minified
    ? minifyDictionary(dictionary.tokens)
    : dictionary.tokens;
  return (
    fileHeader({ file }) + `export default ${JSON.stringify(theme, null, 2)};`
  );
}
