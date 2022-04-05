import {
  ColorValue,
  DesignToken,
  FontSizeValue,
  FontWeightValue,
  LineHeightValue,
} from '../types/designToken';

interface HeadingLevelTokens {
  fontSize: DesignToken<FontSizeValue>;
  fontWeight: DesignToken<FontWeightValue>;
}

export interface HeadingTokens {
  color: DesignToken<ColorValue>;
  lineHeight: DesignToken<LineHeightValue>;
  1: HeadingLevelTokens;
  2: HeadingLevelTokens;
  3: HeadingLevelTokens;
  4: HeadingLevelTokens;
  5: HeadingLevelTokens;
  6: HeadingLevelTokens;
}

export const heading: HeadingTokens = {
  color: { value: '{colors.font.primary.value}' },
  lineHeight: { value: '{lineHeights.small.value}' },

  1: {
    fontSize: { value: '{fontSizes.xxxxl.value}' },
    fontWeight: { value: '{fontWeights.light.value}' },
  },
  2: {
    fontSize: { value: '{fontSizes.xxxl.value}' },
    fontWeight: { value: '{fontWeights.normal.value}' },
  },
  3: {
    fontSize: { value: '{fontSizes.xxl.value}' },
    fontWeight: { value: '{fontWeights.medium.value}' },
  },
  4: {
    fontSize: { value: '{fontSizes.xl.value}' },
    fontWeight: { value: '{fontWeights.semibold.value}' },
  },
  5: {
    fontSize: { value: '{fontSizes.large.value}' },
    fontWeight: { value: '{fontWeights.bold.value}' },
  },
  6: {
    fontSize: { value: '{fontSizes.medium.value}' },
    fontWeight: { value: '{fontWeights.extrabold.value}' },
  },
};
