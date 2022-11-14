/*
 * Style Dictionary config
 */

import StyleDictionary, { Config } from 'style-dictionary';
import { defaultTheme } from './src/theme';
import { CSS_VARIABLE_PREFIX } from './src/theme/utils';
import { WebTransforms } from './src/theme/platforms/web';
import {
  REACT_NATIVE_TOKENS,
  ReactNativeFormat,
  ReactNativeTransforms,
} from './src/theme/platforms/react-native';

const CSS_VARIABLE_SCOPE = ':root, [data-amplify-theme]';

StyleDictionary.extend({
  // cast as the type emiited for `DesignToken` in SD conflicts with the `DesignToken` interface used
  tokens: defaultTheme.tokens as Config['tokens'],
  format: {
    ReactNativeFormat,
  },
  transform: {
    ...WebTransforms,
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
          destination: 'dist/react-native/tokens.ts',
          format: 'ReactNativeFormat',
          filter: (token) =>
            token.path.some((p) => REACT_NATIVE_TOKENS.includes(p)),
        },
      ],
    },
  },
}).buildAllPlatforms();
