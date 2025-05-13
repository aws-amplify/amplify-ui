import { reactNativeDarkTokens, reactNativeTokens } from '@aws-amplify/ui';
import type { DefaultTheme, Override } from './types';

export const defaultTheme: DefaultTheme = {
  tokens: reactNativeTokens,
};

export const defaultDarkModeOverride: Override = {
  colorMode: 'dark',
  tokens: reactNativeDarkTokens,
};
