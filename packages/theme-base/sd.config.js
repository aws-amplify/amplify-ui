/*
 * Style Dictionary config
 */

const { formatHelpers } = require('style-dictionary');

const CSS_VARIABLE_PREFIX = 'amplify';
const CSS_VARIABLE_SCOPE = ':root';

module.exports = {
  source: ['src/tokens/index.js'],
  format: {
    'javascript/cjs-nested': CommonJSNestedFormatter,
    RNFormat,
  },
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
    RNfontWeight: {
      type: 'value',
      matcher: (token) =>
        token.path[0] === 'fontWeights' ||
        token.path[token.path.length - 1] === 'fontWeight',
      transformer: (token) => {
        const intValue = parseInt(token.value, 10);
        if (isNaN(intValue)) {
          return token.value;
        } else {
          return `${intValue}`;
        }
      },
    },
    RNfontSize: {
      type: 'value',
      matcher: (token) =>
        token.path[0] === 'fontSizes' ||
        token.path[token.path.length - 1] === 'fontSize',
      transformer: (token) => {
        return Math.floor(parseFloat(token.value) * 16);
      },
    },
    RNborderRadius: {
      type: 'value',
      matcher: (token) =>
        token.path[0] === 'radii' ||
        token.path[token.path.length - 1] === 'borderRadius',
      transformer: (token) => {
        return Math.floor(parseFloat(token.value) * 16);
      },
    },
    RNborderWidth: {
      type: 'value',
      matcher: (token) =>
        token.path[0] === 'borderWidths' ||
        token.path[token.path.length - 1] === 'borderWidth',
      transformer: (token) => {
        return parseInt(token.value, 10);
      },
    },
    RNspace: {
      type: 'value',
      matcher: (token) =>
        token.path[0] === 'space' ||
        token.path[token.path.length - 1].startsWith('padding'),
      transformer: (token) => {
        return Math.floor(parseFloat(token.value) * 16);
      },
    },
    RNopacity: {
      type: 'value',
      matcher: (token) =>
        token.path[0] === 'opacities' ||
        token.path[token.path.length - 1] === 'opacity',
      transformer: (token) => {
        return parseFloat(token.value);
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
          format: 'javascript/cjs-nested',
        },
      ],
    },
    reactNative: {
      transforms: [
        'RNfontWeight',
        'RNfontSize',
        'RNborderRadius',
        'RNborderWidth',
        'RNspace',
        'RNopacity',
      ],
      files: [
        {
          destination: 'dist/react-native/theme.js',
          format: 'RNFormat',
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
  const { fileHeader } = formatHelpers;

  return (
    fileHeader({ file }) +
    `module.exports = ${JSON.stringify(dictionary.tokens, null, 2)};`
  );
}

// RN notes:
// padding has to be a number or a string or broken up into parts, paddingTop for example
// fontWeight has to be a string
// fontSize has to be a number for the pt value of font size
// color supports all CSS formats (hex, rgb, hsl)
// borderRadius is a number
// borderWidth is a number
function RNFormat({ dictionary, file }) {
  const { fileHeader, minifyDictionary } = formatHelpers;

  return (
    fileHeader({ file }) +
    `const theme = ${JSON.stringify(
      minifyDictionary(dictionary.tokens),
      null,
      2
    )};
export default theme;`
  );
}

// will hide name collision warnings because it is a nested object format
RNFormat.nested = true;
