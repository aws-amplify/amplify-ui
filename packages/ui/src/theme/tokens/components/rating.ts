import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type RatingTokens<Output extends OutputVariantKey> = {
  large?: DesignTokenProperties<'size', Output>;
  default?: DesignTokenProperties<'size', Output>;
  small?: DesignTokenProperties<'size', Output>;
  filled?: DesignTokenProperties<'color', Output>;
  empty?: DesignTokenProperties<'color', Output>;
};

export const rating: Required<RatingTokens<'default'>> = {
  large: { size: { value: '{fontSizes.xxxl.value}' } },
  default: { size: { value: '{fontSizes.xl.value}' } },
  small: { size: { value: '{fontSizes.small.value}' } },
  filled: { color: { value: '{colors.brand.secondary.80.value}' } },
  empty: { color: { value: '{colors.background.tertiary.value}' } },
};
