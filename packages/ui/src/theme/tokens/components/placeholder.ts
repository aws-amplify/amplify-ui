import {
  BorderRadiusValue,
  ColorValue,
  DesignToken,
  SpaceValue,
  TransitionDurationValue,
} from '../types/designToken';

interface PlaceholderSizeTokens {
  height: DesignToken<SpaceValue>;
}

export interface PlaceholderTokens {
  borderRadius: DesignToken<BorderRadiusValue>;
  transitionDuration: DesignToken<TransitionDurationValue>;
  startColor: DesignToken<ColorValue>;
  endColor: DesignToken<ColorValue>;
  small: PlaceholderSizeTokens;
  default: PlaceholderSizeTokens;
  large: PlaceholderSizeTokens;
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
