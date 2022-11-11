import { DesignTokenProperties } from '../types/designToken';

export type RatingTokens<Output = unknown> = {
  large: DesignTokenProperties<'size', Output>;
  default: DesignTokenProperties<'size', Output>;
  small: DesignTokenProperties<'size', Output>;
  filled?: DesignTokenProperties<'color', Output>;
  empty?: DesignTokenProperties<'color', Output>;
};

export const rating: RatingTokens = {
  large: { size: { value: '{fontSizes.xxxl.value}' } },
  default: { size: { value: '{fontSizes.xl.value}' } },
  small: { size: { value: '{fontSizes.small.value}' } },
  filled: { color: { value: '{colors.brand.secondary.80.value}' } },
  empty: { color: { value: '{colors.background.tertiary.value}' } },
};
