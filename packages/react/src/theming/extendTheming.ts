import merge from 'deepmerge';

import { defaultTheme, defaultTokens } from './defaultTheming';
import { DeepPartial, Theme, Tokens } from './types';
import { getCSSVariablesFromTokens, extendTokens } from './utils';

export const extendTheming = (...allOverrideTokens: DeepPartial<Theme>[]) => {
  const cloneTokens = { ...defaultTokens };
  const overrideTokens = merge.all(allOverrideTokens) as DeepPartial<Theme>;
  const newTokens = extendTokens(cloneTokens, overrideTokens) as Tokens;
  // TODO: Need too scope the usage of this fuction because it is not used by React Native
  const CSSVariables = getCSSVariablesFromTokens(newTokens);
  const theme = merge(defaultTheme, overrideTokens) as Theme;
  return { theme, CSSVariables };
};
