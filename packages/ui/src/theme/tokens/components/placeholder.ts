import { DesignTokenProperties } from '../types/designToken';

type PlaceholderSizeTokens<Output> = DesignTokenProperties<'height', Output>;

export type PlaceholderTokens<Output = unknown> = DesignTokenProperties<
  'borderRadius' | 'transitionDuration' | 'startColor' | 'endColor',
  Output
> & {
  small?: PlaceholderSizeTokens<Output>;
  default?: PlaceholderSizeTokens<Output>;
  large?: PlaceholderSizeTokens<Output>;
};

export const placeholder: PlaceholderTokens = {
  borderRadius: { value: '{radii.small.value}' },
  transitionDuration: { value: '{time.long.value}' },

  startColor: { value: '{colors.background.secondary.value}' },
  endColor: { value: '{colors.background.tertiary.value}' },

  // sizes
  small: {
    height: { value: '{space.small.value}' },
  },
  default: {
    height: { value: '{space.medium.value}' },
  },
  large: {
    height: { value: '{space.large.value}' },
  },
};
