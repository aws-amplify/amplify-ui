import {
  ColorValue,
  DesignToken,
  FontSizeValue,
  SpaceValue,
} from '../types/designToken';

interface CopySVGFillTokens {
  fill: DesignToken<ColorValue>;
}

interface CopySVGTokens {
  path: CopySVGFillTokens;
}

interface CopyToolTipTokens {
  bottom: DesignToken<SpaceValue>;
  color: DesignToken<ColorValue>;
  fontSize: DesignToken<FontSizeValue>;
}

export interface CopyTokens {
  fontSize: DesignToken<FontSizeValue>;
  gap: DesignToken<SpaceValue>;
  svg: CopySVGTokens;
  toolTip: CopyToolTipTokens;
}

export const copy: CopyTokens = {
  fontSize: { value: '{font.sizes.xs.value}' },
  gap: { value: '{space.relative.medium.value}' },

  svg: {
    path: {
      fill: {
        value: '{colors.font.primary}',
      },
    },
  },
  toolTip: {
    bottom: { value: '{space.large}' },
    color: { value: '{colors.teal.100}' },
    fontSize: { value: '{font.sizes.xxs}' },
  },
};
