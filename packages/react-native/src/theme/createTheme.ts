import deepExtend from 'style-dictionary/lib/utils/deepExtend';
import resolveObject from 'style-dictionary/lib/utils/resolveObject';
import usesReference from 'style-dictionary/lib/utils/references/usesReference';
import { reactNativeTokens, setupTokens, SetupToken } from '@aws-amplify/ui';
import { DefaultTheme, Theme, StrictTheme, ColorMode } from './types';

const defaultTheme: DefaultTheme = {
  tokens: reactNativeTokens,
};

const setupToken: SetupToken<string | number> = ({ token }) => {
  const { value } = token;
  if (typeof value === 'string') {
    // Perform transforms
    if (value.includes('rem')) {
      return Math.floor(parseFloat(value) * 16);
    }
    if (value.includes('px')) {
      return parseInt(value, 10);
    }
    // Remove .value from references if there is a reference
    if (usesReference(value)) {
      return value.replace('.value', '');
    }
    return value;
  }
  return value;
};

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
  // merge custom `theme` param and `StrictTheme` to get the merged theme.
  // `deepExtend` is a Style Dictionary method that performs a deep merge on n objects.
  const mergedTheme = deepExtend([
    {},
    defaultTheme,
    theme,
    // cast to `StrictTheme` as `deepExtend` returns a generic object
  ]) as StrictTheme;

  let { tokens: mergedTokens } = mergedTheme;

  // We need to merge in any applicable overrides because we need to
  // resolve the values of all tokens at runtime based on which
  // overrides are present and should be applied
  if (theme?.overrides?.length) {
    theme.overrides.forEach((override) => {
      if (override?.colorMode === colorMode) {
        mergedTokens = deepExtend([
          {},
          mergedTokens,
          override.tokens,
        ]) as StrictTheme['tokens'];
      }
      // more overrides in the future could happen here
    });
  }

  // Setup the tokens:
  // - each token will have a raw value
  // - references to tokens (strings wrapped in curly braces) are replaced by raw values
  const tokens = resolveObject(
    setupTokens({
      tokens: mergedTokens,
      setupToken,
    }) as StrictTheme['tokens']
  );

  // Resolve component token references too
  const { components } = resolveObject({
    components: mergedTheme.components,
    ...tokens,
  });

  return { ...mergedTheme, tokens, components };
};
