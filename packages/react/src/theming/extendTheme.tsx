import merge from 'deepmerge';

import { getCSSVariablesFromTheme } from './utils';

export const extendTheme = <T, K>(themeObject: T, override: K) => {
  const customTheme = merge<T, K>(themeObject, override);
  const CSSVariables = getCSSVariablesFromTheme(customTheme);
  return { themeObject: customTheme, CSSVariables };
};
