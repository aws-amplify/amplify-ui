import deepExtend from 'style-dictionary/lib/utils/deepExtend';
import tokens from '@aws-amplify/ui/dist/react-native/tokens';

import { BaseTheme, Theme, StrictTheme } from './types';
import { setupTokens } from './utils';

// base theme with shared tokens, excludes components
const baseTheme: BaseTheme = {
  tokens,
  name: 'default-theme',
  colorMode: 'system',
};

/**
 * This will be used like `const myTheme = createTheme({})`
 * `myTheme` can then be passed to a Provider
 * const myTheme = createTheme({})
 * const myOtherTheme = createTheme({}, myTheme);
 */
export const createTheme = (theme?: Theme): StrictTheme => {
  // merge custom `theme` param and `baseTheme` to get the merged theme.
  // `deepExtend` is a Style Dictionary method that performs a deep merge on n objects.
  const { tokens: mergedTokens, ...mergedTheme } = deepExtend([
    {},
    baseTheme,
    theme,
    // cast to `BaseTheme` as `deepExtend` returns a generic object
  ]) as BaseTheme;

  // Setup the tokens:
  // - each token will have a raw value
  // - references to tokens (strings wrapped in curly braces) are replaced by raw values
  const tokens = setupTokens(mergedTokens);

  return { ...mergedTheme, tokens };
};
