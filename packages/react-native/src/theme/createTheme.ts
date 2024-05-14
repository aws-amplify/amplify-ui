import deepExtend from 'style-dictionary/lib/utils/deepExtend';
import resolveObject from 'style-dictionary/lib/utils/resolveObject';
import usesReference from 'style-dictionary/lib/utils/references/usesReference';
import { isFunction, setupTokens } from '@aws-amplify/ui';
import {
  Theme,
  StrictTheme,
  ColorMode,
  Components,
  StrictTokens,
} from './types';
import { defaultTheme } from './defaultTheme';

// This will resolve all references in component themes by either
// calling the component theme function with the already resolved base tokens
// OR
// resolving the component theme object
const setupComponents = ({
  components,
  tokens,
}: {
  components: Components;
  tokens: StrictTokens;
}) => {
  const output = components
    ? Object.entries(components).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: isFunction(value) ? (value(tokens) as typeof value) : value,
        }),
        {}
      )
    : {};

  return resolveObject({
    ...tokens,
    components: output,
  }).components;
};

const shouldParseFloatValue = (pathKey: string) =>
  [
    'space',
    'borderWidths',
    'opacities',
    'fontSizes',
    'lineHeights',
    'radii',
  ].includes(pathKey);

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
    // Remove .value from references if there is a reference
    // this needs to come first so we don't get NaNs for references
    if (usesReference(value)) {
      return value.replace('.value', '');
    }

    if (shouldParseFloatValue(path[0])) {
      if (value.includes('rem')) {
        if (path[0] === 'space') {
          return Math.floor(parseFloat(value) * 16 * spaceModifier);
        }
        return Math.floor(parseFloat(value) * 16);
      }
      if (value.includes('px')) {
        return parseInt(value, 10);
      }
      return parseFloat(value);
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

  let components;

  // Resolve component token references too
  if (mergedTheme.components) {
    components = setupComponents({
      components: mergedTheme.components,
      tokens,
    });
  }

  return { ...mergedTheme, tokens, components };
};
