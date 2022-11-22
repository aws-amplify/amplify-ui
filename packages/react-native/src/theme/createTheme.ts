import deepExtend from 'style-dictionary/lib/utils/deepExtend';
import resolveObject from 'style-dictionary/lib/utils/resolveObject';
import usesReference from 'style-dictionary/lib/utils/references/usesReference';
import { setupTokens } from '@aws-amplify/ui';
import { Theme, StrictTheme, ColorMode } from './types';
import { defaultTheme } from './defaultTheme';

// This will resolve all references in component themes by either
// calling the component theme function with the already resolved base tokens
// OR
// resolving the component theme object
const setupComponents = (theme: StrictTheme) => {
  const output = {};
  if (theme.components) {
    const { components } = theme;
    for (const [key, value] of Object.entries(components)) {
      if (typeof value === 'function') {
        output[key] = value(theme.tokens) as object;
      } else {
        output[key] = value;
      }
    }
  }
  return resolveObject({
    ...theme.tokens,
    components: output,
  }).components;
};

const setupToken = ({
  token,
  path = [],
  spaceModifier,
}: {
  token: {
    value: string | number;
  };
  path: Array<string>;
  spaceModifier: number;
}): string | number => {
  const { value } = token;
  if (typeof value === 'string') {
    // Perform transforms
    if (path[0] === 'space') {
      if (value.includes('rem')) {
        return Math.floor(parseFloat(value) * 16 * spaceModifier);
      }
    }
    if (value.includes('rem')) {
      return Math.floor(parseFloat(value) * 16);
    }
    if (value.includes('px')) {
      return parseInt(value, 10);
    }
    if (path[0] === 'opacities') {
      return parseFloat(value);
    }
    // Remove .value from references if there is a reference
    if (usesReference(value)) {
      return value.replace('.value', '');
    }
    return value;
  }
  // Font Weights in RN are strings
  if (path[0] === 'fontWeights') {
    return `${value}`;
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
  const { spaceModifier = 1 } = mergedTheme;

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
      setupToken: ({ token, path }) => {
        return setupToken({ token, path, spaceModifier });
      },
    }) as StrictTheme['tokens']
  );

  let { components } = mergedTheme;

  // Resolve component token references too
  if (mergedTheme.components) {
    components = setupComponents({ ...mergedTheme, tokens });
  }

  return { ...mergedTheme, tokens, components };
};
