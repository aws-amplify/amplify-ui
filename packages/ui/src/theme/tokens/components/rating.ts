import {
  ColorValue,
  DesignToken,
  SpaceValue,
  TextContrast,
} from '../types/designToken';

interface RatingSizeTokens {
  size: DesignToken<SpaceValue>;
}

interface RatingFilledTokens extends TextContrast {
  color: DesignToken<ColorValue>;
}

interface RatingEmptyTokens extends TextContrast {
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
  filled: {
    backgroundColor: { value: '{colors.transparent}' },
    color: { value: '{colors.brand.secondary.80.value}' },
  },
  empty: {
    backgroundColor: { value: '{colors.transparent}' },
    color: { value: '{colors.background.tertiary.value}' },
  },
};
