export interface RatingTokens {
  large: any;
  default: any;
  small: any;
  filled: any;
  empty: any;
}
export const rating: RatingTokens = {
  large: { size: { value: '{fontSizes.xxxl.value}' } },
  default: { size: { value: '{fontSizes.xl.value}' } },
  small: { size: { value: '{fontSizes.small.value}' } },
  filled: { color: { value: '{colors.brand.secondary.80.value}' } },
  empty: { color: { value: '{colors.background.tertiary.value}' } },
};
