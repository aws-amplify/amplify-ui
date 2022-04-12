import { ColorValue, DesignToken, SpaceValue } from '../types/designToken';

interface RatingSizeTokens {
  size: DesignToken<SpaceValue>;
}

interface RatingFilledTokens {
  color: DesignToken<ColorValue>;
}

interface RatingEmptyTokens {
  color: DesignToken<ColorValue>;
}

export interface RatingTokens {
  large: RatingSizeTokens;
  default: RatingSizeTokens;
  small: RatingSizeTokens;
  filled: RatingFilledTokens;
  empty: RatingEmptyTokens;
}
export const rating: RatingTokens = {
  large: { size: { value: '{fontSizes.xxxl.value}' } },
  default: { size: { value: '{fontSizes.xl.value}' } },
  small: { size: { value: '{fontSizes.small.value}' } },
  filled: { color: { value: '{colors.brand.secondary.80.value}' } },
  empty: { color: { value: '{colors.background.tertiary.value}' } },
};
