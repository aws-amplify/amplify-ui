/*
 * Style Dictionary config
 */

import StyleDictionary from 'style-dictionary';
import { defaultTheme } from './src/theme';
import {
  CSS_VARIABLE_PREFIX,
  cssNameTransform,
  cssValue,
} from './src/theme/utils';
import { RNFormat, ReactNativeTransforms } from './src/theme/react-native';

const CSS_VARIABLE_SCOPE = ':root, [data-amplify-theme]';

StyleDictionary.extend({
  tokens: defaultTheme.tokens,
  format: {
    RNFormat,
  },
  transform: {
    cssNameTransform: {
      type: 'name',
      transformer: cssNameTransform,
    },
    cssValue: {
      type: 'value',
      transitive: true,
      transformer: cssValue,
    },
    ...ReactNativeTransforms,
  },
  platforms: {
    css: {
      transforms: ['attribute/cti', 'cssNameTransform', 'cssValue'],
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
    reactNative: {
      transforms: [
        'RNFontWeight',
        'RNFontSize',
        'RNRadius',
        'RNSpace',
        'RNOpacity',
        'RNTime',
      ],
      files: [
        {
          destination: 'dist/react-native/theme.ts',
          format: 'RNFormat',
        },
      ],
    },
  },
}).buildAllPlatforms();
