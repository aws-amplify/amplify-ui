export interface RatingToken {
  large: never;
  default: never;
  small: never;
  filled: never;
  empty: never;
}
export const rating: RatingToken = {
  large: { size: { value: '{fontSizes.xxxl.value}' } },
  default: { size: { value: '{fontSizes.xl.value}' } },
  small: { size: { value: '{fontSizes.small.value}' } },
  filled: { color: { value: '{colors.brand.secondary.80.value}' } },
  empty: { color: { value: '{colors.background.tertiary.value}' } },
};
