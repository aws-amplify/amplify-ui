import { ColorValue, DesignToken } from '../types/designToken';

interface TextVariationTokens {
  color: DesignToken<ColorValue>;
}

export interface TextTokens {
  color: DesignToken<ColorValue>;
  primary: TextVariationTokens;
  secondary: TextVariationTokens;
  tertiary: TextVariationTokens;
  error: TextVariationTokens;
  warning: TextVariationTokens;
  success: TextVariationTokens;
  info: TextVariationTokens;
}

export const text: TextTokens = {
  // default styles
  color: { value: '{colors.font.primary.value}' },

  // variations
  primary: {
    color: { value: '{colors.font.primary.value}' },
  },
  secondary: {
    color: { value: '{colors.font.secondary.value}' },
  },
  tertiary: {
    color: { value: '{colors.font.tertiary.value}' },
  },
  error: {
    color: { value: '{colors.font.error.value}' },
  },
  warning: {
    color: { value: '{colors.font.warning.value}' },
  },
  success: {
    color: { value: '{colors.font.success.value}' },
  },
  info: {
    color: { value: '{colors.font.info.value}' },
  },
};
