import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type OrderVariantKey = 'primary' | 'secondary' | 'tertiary';
type InformationVariantKey = 'info' | 'warning' | 'error' | 'success';

type BaseTextTokens<Output> = DesignTokenProperties<'color', Output>;

export type TextTokens<Output extends OutputVariantKey> =
  BaseTextTokens<Output> &
    Partial<
      Record<OrderVariantKey | InformationVariantKey, BaseTextTokens<Output>>
    >;

export const text: Required<TextTokens<'default'>> = {
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
