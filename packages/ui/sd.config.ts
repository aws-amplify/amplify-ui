/*
 * Style Dictionary config
 */

import StyleDictionary from 'style-dictionary';
import { theme } from './src/theme';
import { CSS_VARIABLE_PREFIX, cssNameTransform } from './src/theme/utils';

const CSS_VARIABLE_SCOPE = ':root, [data-amplify-theme]';

StyleDictionary.extend({
  tokens: theme.tokens,
  transform: {
    cssNameTransform: {
      type: 'name',
      transformer: cssNameTransform,
    },
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
      transforms: ['attribute/cti', 'cssNameTransform', 'cssPadding'],
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
  },
}).buildAllPlatforms();
