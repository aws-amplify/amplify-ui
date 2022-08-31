import { ColorValue, DesignToken, TextContrast } from '../types/designToken';

interface TextVariationTokens extends TextContrast {}

export interface TextTokens extends TextContrast {
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
  backgroundColor: { value: 'transparent' },
  color: { value: '{colors.font.primary.value}' },

  // variations
  primary: {
    backgroundColor: { value: 'transparent' },
    color: { value: '{colors.font.primary.value}' },
  },
  secondary: {
    backgroundColor: { value: 'transparent' },
    color: { value: '{colors.font.secondary.value}' },
  },
  tertiary: {
    backgroundColor: { value: 'transparent' },
    color: { value: '{colors.font.tertiary.value}' },
  },
  error: {
    backgroundColor: { value: 'transparent' },
    color: { value: '{colors.font.error.value}' },
  },
  warning: {
    backgroundColor: { value: 'transparent' },
    color: { value: '{colors.font.warning.value}' },
  },
  success: {
    backgroundColor: { value: 'transparent' },
    color: { value: '{colors.font.success.value}' },
  },
  info: {
    backgroundColor: { value: 'transparent' },
    color: { value: '{colors.font.info.value}' },
  },
};
