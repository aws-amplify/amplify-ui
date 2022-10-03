// Internal Style Dictionary methods
import deepExtend from 'style-dictionary/lib/utils/deepExtend';

import { defaultTheme } from './defaultTheme';
import { ColorMode, Theme } from './types';

/**
 * This will be used like `const myTheme = createReactNativeTheme({})`
 * `myTheme` can then be passed to a Provider
 * const myTheme = createReactNativeTheme({})
 * const myOtherTheme = createReactNativeTheme({}, myTheme);
 */
export const createReactNativeTheme = (
  theme?: Theme,
  colorMode?: ColorMode
): Theme => {
  // merge theme and defaultTheme to get a complete theme
  // deepExtend is an internal Style Dictionary method
  // that performs a deep merge on n objects.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const mergedTheme: Theme = deepExtend([{}, defaultTheme, theme]);

  const { name, tokens, overrides } = mergedTheme;

  return {
    colorMode,
    name,
    tokens,
    // keep overrides separate from base theme
    // allows RN to dynamically switch themes in a provider.
    overrides,
  };
};
