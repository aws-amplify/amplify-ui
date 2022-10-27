// Internal Style Dictionary methods
import deepExtend from 'style-dictionary/lib/utils/deepExtend';
import get from 'lodash/get';
import mapValues from 'lodash/mapValues';

import { defaultTheme } from './defaultTheme';
import { ColorMode, Theme, ReactNativeTheme } from './types';
import { Tokens } from './tokens';

const mapValuesDeep = (v: object | string, callback: Function): object =>
  typeof v == 'object'
    ? mapValues(v, (v) => mapValuesDeep(v, callback))
    : (callback(v) as object);

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
  const { name, overrides } = mergedTheme;

  // Setting up the tokens.
  // At the end of this, each token should have a raw value
  // All references to tokens will be replaced
  const tokens = mapValuesDeep(mergedTheme.tokens, (value: string) => {
    return typeof value == 'string' && value.startsWith('{')
      ? (get(
          mergedTheme.tokens,
          value.substring(1, value.length - 2) // remove { }
        ) as string)
      : value;
  }) as Tokens;

  return {
    colorMode,
    name,
    tokens,
    // keep overrides separate from base theme
    // allows RN to dynamically switch themes in a provider.
    overrides,
  };
};
