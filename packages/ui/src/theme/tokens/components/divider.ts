import {
  BackgroundColorValue,
  BorderColorValue,
  BorderStyleValue,
  BorderWidthValue,
  ColorValue,
  DesignToken,
  FontSizeValue,
  OpacityValue,
  SpaceValue,
} from '../types/designToken';

interface DividerSizeTokens {
  borderWidth: DesignToken<BorderWidthValue>;
}

interface DividerLabelTokens {
  color: DesignToken<ColorValue>;
  paddingInline: DesignToken<SpaceValue>;
  fontSize: DesignToken<FontSizeValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
}

export interface DividerTokens {
  borderStyle: DesignToken<BorderStyleValue>;
  borderColor: DesignToken<BorderColorValue>;
  borderWidth: DesignToken<BorderWidthValue>;
  label: DividerLabelTokens;
  small: DividerSizeTokens;
  large: DividerSizeTokens;
  opacity: DesignToken<OpacityValue>;
}

export const divider: DividerTokens = {
  borderStyle: { value: 'solid' },
  borderColor: { value: '{colors.border.primary.value}' },
  borderWidth: { value: '{borderWidths.medium.value}' },

  label: {
    color: { value: '{colors.font.tertiary.value}' },
    paddingInline: { value: '{space.medium.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
    backgroundColor: { value: '{colors.background.primary.value}' },
  },

  small: {
    borderWidth: { value: '{borderWidths.small.value}' },
  },

  large: {
    borderWidth: { value: '{borderWidths.large.value}' },
  },

  opacity: {
    value: '{opacities.60.value}',
  },
};
