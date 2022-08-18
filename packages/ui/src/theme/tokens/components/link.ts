import { ColorValue, DesignToken, FontSizeValue } from '../types/designToken';

interface LinkStateTokens {
  color: DesignToken<ColorValue>;
}

interface LinkSizeTokens {
  fontSize: DesignToken<FontSizeValue>;
}

export interface LinkTokens extends LinkStateTokens {
  active: LinkStateTokens;
  focus: LinkStateTokens;
  hover: LinkStateTokens;
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
  visited: {
    color: { value: '{colors.font.interactive.value}' },
  },
};
