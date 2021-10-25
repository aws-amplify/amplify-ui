/*
 * Style Dictionary config
 */

import StyleDictionary from 'style-dictionary';
import { defaultTheme } from './src/theme';
import { CSS_VARIABLE_PREFIX, cssNameTransform } from './src/theme/utils';

const CSS_VARIABLE_SCOPE = ':root, [data-amplify-theme]';

StyleDictionary.extend({
  tokens: defaultTheme.tokens,
  transform: {
    cssNameTransform: {
      type: 'name',
      transformer: cssNameTransform,
    },
  },
  platforms: {
    css: {
      transforms: ['attribute/cti', 'cssNameTransform'],
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
