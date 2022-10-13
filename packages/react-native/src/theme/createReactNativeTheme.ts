// Internal Style Dictionary methods
import deepExtend from 'style-dictionary/lib/utils/deepExtend';

import { defaultTheme } from './defaultTheme';
import { ColorMode, Theme, ReactNativeTheme } from './types';

/**
 * This will be used like `const myTheme = createReactNativeTheme({})`
 * `myTheme` can then be passed to a Provider
 * const myTheme = createReactNativeTheme({})
 * const myOtherTheme = createReactNativeTheme({}, myTheme);
 */
export const createReactNativeTheme = (
  theme?: Theme,
  colorMode?: ColorMode
): ReactNativeTheme => {
  // merge theme and defaultTheme to get a complete theme
  // deepExtend is an internal Style Dictionary method
  // that performs a deep merge on n objects.
  const mergedTheme: ReactNativeTheme = deepExtend([
    {},
    defaultTheme,
    theme,
  ]) as ReactNativeTheme;
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
