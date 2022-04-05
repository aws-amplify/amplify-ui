import { ColorValue, DesignToken, FontSizeValue } from '../types/designToken';

interface LinkStateTokens {
  color: DesignToken<ColorValue>;
}

interface LinkSizeTokens {
  fontSize: DesignToken<FontSizeValue>;
}

export interface LinkTokens {
  active: LinkStateTokens;
  color: DesignToken<ColorValue>;
  focus: LinkStateTokens;
  hover: LinkStateTokens;
  large: LinkSizeTokens;
  small: LinkSizeTokens;
  visited: LinkStateTokens;
}

export const link: LinkTokens = {
  active: {
    color: { value: '{colors.font.active.value}' },
  },
  color: { value: '{colors.font.interactive.value}' },
  focus: {
    color: { value: '{colors.font.focus.value}' },
  },
  hover: {
    color: { value: '{colors.font.hover.value}' },
  },
  large: {
    fontSize: { value: '{fontSizes.large.value}' },
  },
  small: {
    fontSize: { value: '{fontSizes.small.value}' },
  },
  visited: {
    color: { value: '{colors.font.interactive.value}' },
  },
};
