import {
  DesignToken,
  AlignItemsValue,
  JustifyContentValue,
  ColorValue,
  FontSizeValue,
  SpaceValue,
  FontWeightValue,
  BackgroundColorValue,
  LineHeightValue,
  BorderColorValue,
  BorderWidthValue,
  BorderStyleValue,
  BorderRadiusValue,
  BoxShadowRefValue,
  TransitionDurationValue,
} from '../types/designToken';
export interface DividerTokens {
  borderStyle: DesignToken<BorderStyleValue>;
  borderColor: DesignToken<BorderColorValue>;
  borderWidth: DesignToken<BorderWidthValue>;
  label: DesignToken<never>;
  small: DesignToken<never>;
  large: DesignToken<never>;
  opacity: DesignToken<never>;
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
