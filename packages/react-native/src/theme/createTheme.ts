import deepExtend from 'style-dictionary/lib/utils/deepExtend';
import get from 'lodash/get';
import mapValues from 'lodash/mapValues';

import { defaultTheme } from './defaultTheme';
import { BaseTheme, ColorMode, Theme } from './types';
import { Tokens } from './tokens';

/**
 * Util similar to lodash mapValues but recurses into nested objects.
 * @param obj
 * @param callback
 */
const mapValuesDeep = <T>(obj: T, callback: Function): T =>
  typeof obj === 'object'
    ? (mapValues(obj, (obj) => mapValuesDeep(obj, callback)) as T)
    : (callback(obj) as T);

/**
 * This will be used like `const myTheme = createTheme({})`
 * `myTheme` can then be passed to a Provider
 * const myTheme = createTheme({})
 * const myOtherTheme = createTheme({}, myTheme);
 */
export const createTheme = (
  theme?: BaseTheme,
  colorMode?: ColorMode
): Theme => {
  // merge theme and defaultTheme to get a complete theme
  // deepExtend is an internal Style Dictionary method
  // that performs a deep merge on n objects.
  const mergedTheme: Theme = deepExtend([{}, defaultTheme, theme]) as Theme;
  const { name, overrides } = mergedTheme;

  // Setting up the tokens.
  // At the end of this, each token should have a raw value
  // All references to tokens will be replaced; references to tokens are marked by curly braces
  const tokens = mapValuesDeep<Tokens>(mergedTheme.tokens, (value: string) => {
    return typeof value === 'string' &&
      value.startsWith('{') &&
      value.endsWith('}')
      ? (get(
          mergedTheme.tokens,
          value.substring(1, value.length - 2)
        ) as string)
      : value;
  });

  return {
    colorMode,
    name,
    tokens,
    // keep overrides separate from base theme
    // allows RN to dynamically switch themes in a provider.
    overrides,
  };
};
