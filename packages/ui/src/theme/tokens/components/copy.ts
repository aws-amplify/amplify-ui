import {
  ColorValue,
  DesignToken,
  FontSizeValue,
  SpaceValue,
  TextContrast,
} from '../types/designToken';

interface CopySVGFillTokens {
  fill: DesignToken<ColorValue>;
}

interface CopySVGTokens {
  path: CopySVGFillTokens;
}

interface CopyToolTipTokens extends TextContrast {
  bottom: DesignToken<SpaceValue>;
  fontSize: DesignToken<FontSizeValue>;
}

export interface CopyTokens {
  fontSize: DesignToken<FontSizeValue>;
  gap: DesignToken<SpaceValue>;
  svg: CopySVGTokens;
  toolTip: CopyToolTipTokens;
}

export const copy: CopyTokens = {
  fontSize: { value: '{fontSizes.xs}' },
  gap: { value: '{space.relative.medium}' },

  svg: {
    path: {
      fill: {
        value: '{colors.font.primary}',
      },
    },
  },
  toolTip: {
    backgroundColor: { value: '{colors.transparent}' },
    bottom: { value: '{space.large}' },
    color: { value: '{colors.teal.100}' },
    fontSize: { value: '{fontSizes.xxs}' },
  },
};
