export interface PlaceholderTokens {
  borderRadius: never;
  transitionDuration: never;
  startColor: never;
  endColor: never;
  small: never;
  default: never;
  large: never;
}

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
