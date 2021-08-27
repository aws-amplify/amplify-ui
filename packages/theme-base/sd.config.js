/*
 * Style Dictionary config
 */

const { formatHelpers, fileHeader } = require('style-dictionary');

const CSS_VARIABLE_PREFIX = 'amplify';
const CSS_VARIABLE_SCOPE = ':root';

module.exports = {
  source: ['src/tokens/index.js'],
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
        {
          destination: 'dist/AmplifyTheme.ts',
          format: 'themeType',
        },
      ],
    },
  },
  format: {
    'javascript/cjs-nested': CommonJSNestedFormatter,
    themeType: ThemeTypeFormatter,
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

function ThemeTypeFormatter({ dictionary, file }) {
  const { fileHeader } = formatHelpers;
  return (
    fileHeader({ file }) +
    `export interface AmplifyTheme {${ThemeToTypes(dictionary.tokens, 1)}\n}`
  );
}

function ThemeToTypes(obj, depth = 0) {
  let output = ``;
  for (const key in obj) {
    const value = obj[key];
    const indent = [...Array(depth).keys()].map(() => `  `).join('');
    output += `\n${indent}${key}?: `;
    if (typeof value.value === 'undefined') {
      output += `{${ThemeToTypes(value, depth + 1)}\n${indent}}`;
    } else {
      output += `string;`;
    }
  }
  return output;
}
