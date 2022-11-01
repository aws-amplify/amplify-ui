import deepExtend from 'style-dictionary/lib/utils/deepExtend';

import { defaultTheme } from './defaultTheme';
import { Theme, ColorMode, StrictTheme } from './types';
import { setupTokens } from './utils';

/**
 * This will be used like `const myTheme = createTheme({})`
 * `myTheme` can then be passed to a Provider
 * const myTheme = createTheme({})
 * const myOtherTheme = createTheme({}, myTheme);
 */
export const createTheme = (
  theme?: Theme,
  colorMode?: ColorMode
): StrictTheme => {
  // merge theme and defaultTheme to get a complete theme
  // deepExtend is an internal Style Dictionary method
  // that performs a deep merge on n objects.
  const mergedTheme: StrictTheme = deepExtend([
    {},
    defaultTheme,
    theme,
  ]) as StrictTheme;
  const { name, overrides } = mergedTheme;

  // Setting up the tokens.
  // At the end of this, each token should have a raw value
  // All references to tokens will be replaced; references to tokens are marked by curly braces
  const tokens = setupTokens(mergedTheme.tokens);

  return {
    colorMode,
    name,
    tokens,
    // keep overrides separate from base theme
    // allows RN to dynamically switch themes in a provider.
    overrides,
  };
};
