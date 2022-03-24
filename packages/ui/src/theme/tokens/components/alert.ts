import {
  AlignItemsValue,
  BackgroundColorValue,
  ColorValue,
  DesignToken,
  FontSizeValue,
  FontWeightValue,
  JustifyContentValue,
  SpaceValue,
} from '../types/designToken';

interface AlertVariationTokens {
  color: DesignToken<ColorValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
}

interface AlertIconTokens {
  size: DesignToken<FontSizeValue>;
}

interface AlertHeadingTokens {
  fontSize: DesignToken<FontSizeValue>;
  fontWeight: DesignToken<FontWeightValue>;
}

export interface AlertTokens {
  alignItems: DesignToken<AlignItemsValue>;
  justifyContent: DesignToken<JustifyContentValue>;
  color: DesignToken<ColorValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
  paddingBlock: DesignToken<SpaceValue>;
  paddingInline: DesignToken<SpaceValue>;
  icon: AlertIconTokens;
  heading: AlertHeadingTokens;
  info: AlertVariationTokens;
  error: AlertVariationTokens;
  warning: AlertVariationTokens;
  success: AlertVariationTokens;
}

export const alert: AlertTokens = {
  // Default styles
  alignItems: { value: 'center' },
  justifyContent: { value: 'space-between' },
  color: { value: '{colors.font.primary.value}' },
  backgroundColor: { value: '{colors.background.tertiary.value}' },
  paddingBlock: { value: '{space.small.value}' },
  paddingInline: { value: '{space.medium.value}' },

  icon: {
    size: { value: '{fontSizes.xl.value}' },
  },

  heading: {
    fontSize: { value: '{fontSizes.medium.value}' },
    fontWeight: { value: '{fontWeights.bold.value}' },
  },

  // Variations
  info: {
    color: { value: '{colors.font.info.value}' },
    backgroundColor: { value: '{colors.background.info.value}' },
  },

  error: {
    color: { value: '{colors.font.error.value}' },
    backgroundColor: { value: '{colors.background.error.value}' },
  },

  warning: {
    color: { value: '{colors.font.warning.value}' },
    backgroundColor: { value: '{colors.background.warning.value}' },
  },

  success: {
    color: { value: '{colors.font.success.value}' },
    backgroundColor: { value: '{colors.background.success.value}' },
  },
};
