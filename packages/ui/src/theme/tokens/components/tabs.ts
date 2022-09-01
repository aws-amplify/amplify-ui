import {
  BorderContrast,
  BorderStyleValue,
  BorderWidthValue,
  DesignToken,
  FontSizeValue,
  FontWeightValue,
  GapValue,
  SpaceValue,
  TextAlignValue,
  TextContrast,
  TransitionDurationValue,
} from '../types/designToken';

interface TabsItemTokens extends BorderContrast, TextContrast {
  borderStyle: DesignToken<BorderStyleValue>;
  borderWidth: DesignToken<BorderWidthValue>;
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

interface TabsItemHoverTokens extends TextContrast {}

interface TabsItemFocusTokens extends TextContrast {}

interface TabsItemActiveTokens extends BorderContrast, TextContrast {}

interface TabsItemDisabledTokens extends BorderContrast, TextContrast {}

export interface TabsTokens extends BorderContrast {
  borderStyle: DesignToken<BorderStyleValue>;
  borderWidth: DesignToken<BorderWidthValue>;
  gap: DesignToken<GapValue>;
  item: TabsItemTokens;
}

export const tabs: TabsTokens = {
  backgroundColor: { value: '{colors.transparent}' },
  borderColor: { value: '{colors.border.secondary.value}' },
  borderStyle: { value: 'solid' },
  borderWidth: { value: '{borderWidths.medium.value}' },
  gap: { value: '0' },

  item: {
    backgroundColor: { value: '{colors.transparent}' },
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
      backgroundColor: { value: '{colors.transparent}' },
      color: { value: '{colors.font.hover.value}' },
    },
    _focus: {
      backgroundColor: { value: '{colors.transparent}' },
      color: { value: '{colors.font.focus.value}' },
    },
    _active: {
      color: { value: '{colors.font.interactive.value}' },
      borderColor: { value: '{colors.font.interactive.value}' },
      backgroundColor: { value: '{colors.transparent}' },
    },
    _disabled: {
      color: { value: '{colors.font.disabled.value}' },
      backgroundColor: { value: '{colors.transparent}' },
      borderColor: { value: '{colors.border.tertiary.value}' },
    },
  },
};
