import merge from 'deepmerge';
import { Theme, TokenOverrides } from '@aws-amplify/ui';

import { defaultTheme } from './defaultTheming';
import { getCSSVariablesFromTokens, extendTokens } from './utils';

export const extendTheming = (...allOverrideTokens: TokenOverrides[]) => {
  const cloneTokens = { ...defaultTheme.tokens };
  const overrideTokens = merge.all(allOverrideTokens) as TokenOverrides;
  const newTokens = extendTokens(cloneTokens, overrideTokens) as Theme;
  // TODO: Need too scope the usage of this function because it is not used by React Native
  const CSSVariables = getCSSVariablesFromTokens(newTokens);
  const theme = merge(defaultTheme, overrideTokens) as Theme;
  return { theme, CSSVariables };
};
