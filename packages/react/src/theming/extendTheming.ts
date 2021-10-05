import merge from 'deepmerge';
import { AmplifyTheme, AmplifyThemeOverrides } from '@aws-amplify/ui';

import { defaultTheme } from './defaultTheming';
// import { Theme } from './types';
import { getCSSVariablesFromTokens, extendTokens } from './utils';

export const extendTheming = (
  ...allOverrideTokens: AmplifyThemeOverrides[]
) => {
  const cloneTokens = { ...defaultTheme };
  const overrideTokens = merge.all(allOverrideTokens) as AmplifyThemeOverrides;
  const newTokens = extendTokens(cloneTokens, overrideTokens) as AmplifyTheme;
  // TODO: Need too scope the usage of this function because it is not used by React Native
  const CSSVariables = getCSSVariablesFromTokens(newTokens);
  const theme = merge(defaultTheme, overrideTokens) as AmplifyTheme;
  return { theme, CSSVariables };
};
