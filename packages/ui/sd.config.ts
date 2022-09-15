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
import { ReactNativeTransforms } from './src/theme/platforms/react-native';
import { RNFormat } from './src/theme/platforms/react-native';

const CSS_VARIABLE_SCOPE = ':root, [data-amplify-theme]';

// TODO: move cssNameTransform and cssValue to a new home - WebTransforms under src/theme/platforms/web
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
        'RNBorderRadius',
        'RNBorderWidth',
        'RNSpace',
        'RNOpacity',
        'RNTime',
        'RNShadow',
      ],
      files: [
        {
          destination: 'dist/react-native/theme.ts',
          format: 'RNFormat',
          filter: (token) =>
            !token.path.some((p) => ['hover', 'focus'].includes(p)),
        },
      ],
    },
  },
}).buildAllPlatforms();
