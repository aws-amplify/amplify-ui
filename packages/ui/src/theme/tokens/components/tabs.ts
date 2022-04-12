import {
  BackgroundColorValue,
  BorderColorValue,
  BorderStyleValue,
  BorderWidthValue,
  ColorValue,
  DesignToken,
  FontSizeValue,
  FontWeightValue,
  GapValue,
  SpaceValue,
  TextAlignValue,
  TransitionDurationValue,
} from '../types/designToken';

interface TabsItemTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  borderColor: DesignToken<BorderColorValue>;
  borderStyle: DesignToken<BorderStyleValue>;
  borderWidth: DesignToken<BorderWidthValue>;
  color: DesignToken<ColorValue>;
  fontSize: DesignToken<FontSizeValue>;
  fontWeight: DesignToken<FontWeightValue>;
  paddingVertical: DesignToken<SpaceValue>;
  paddingHorizontal: DesignToken<SpaceValue>;
  textAlign: DesignToken<TextAlignValue>;
  transitionDuration: DesignToken<TransitionDurationValue>;
  _hover: TabsItemHoverTokens;
  _focus: TabsItemFocusTokens;
  _active: TabsItemActiveTokens;
  _disabled: TabsItemDisabledTokens;
}

interface TabsItemHoverTokens {
  color: DesignToken<ColorValue>;
}

interface TabsItemFocusTokens {
  color: DesignToken<ColorValue>;
}

interface TabsItemActiveTokens {
  color: DesignToken<ColorValue>;
  borderColor: DesignToken<BorderColorValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
}

interface TabsItemDisabledTokens {
  color: DesignToken<ColorValue>;
  borderColor: DesignToken<BorderColorValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
}

export interface TabsTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  borderColor: DesignToken<BorderColorValue>;
  borderStyle: DesignToken<BorderStyleValue>;
  borderWidth: DesignToken<BorderWidthValue>;
  gap: DesignToken<GapValue>;
  item: TabsItemTokens;
}

export const tabs: TabsTokens = {
  backgroundColor: { value: 'transparent' },
  borderColor: { value: '{colors.border.secondary.value}' },
  borderStyle: { value: 'solid' },
  borderWidth: { value: '{borderWidths.medium.value}' },
  gap: { value: '0' },

  item: {
    backgroundColor: { value: 'transparent' },
    borderColor: { value: '{colors.border.secondary.value}' },
    borderStyle: { value: 'solid' },
    borderWidth: { value: '{borderWidths.medium.value}' },
    color: { value: '{colors.font.secondary.value}' },
    fontSize: { value: '{fontSizes.medium.value}' },
    fontWeight: { value: '{fontWeights.bold.value}' },
    paddingVertical: { value: '{space.small.value}' },
    paddingHorizontal: { value: '{space.medium.value}' },
    textAlign: { value: 'center' },
    transitionDuration: { value: '{time.medium.value}' },

    _hover: {
      color: { value: '{colors.font.hover.value}' },
    },
    _focus: {
      color: { value: '{colors.font.focus.value}' },
    },
    _active: {
      color: { value: '{colors.font.interactive.value}' },
      borderColor: { value: '{colors.font.interactive.value}' },
      backgroundColor: { value: 'transparent' },
    },
    _disabled: {
      color: { value: '{colors.font.disabled.value}' },
      backgroundColor: { value: 'transparent' },
      borderColor: { value: '{colors.border.tertiary.value}' },
    },
  },
};
