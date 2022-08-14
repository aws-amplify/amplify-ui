import { ColorValue, DesignToken, FontSizeValue } from '../types/designToken';

interface LinkStateTokens {
  color: DesignToken<ColorValue>;
}

interface LinkSizeTokens {
  fontSize: DesignToken<FontSizeValue>;
}

export interface LinkTokens {
  /**
   * @deprecated to be removed in the next major version please use _active
   */
  active?: LinkStateTokens;
  color: DesignToken<ColorValue>;
  /**
   * @deprecated to be removed in the next major version please use _focus
   */
  focus?: LinkStateTokens;
  /**
   * @deprecated to be removed in the next major version please use _hover
   */
  hover?: LinkStateTokens;
  /**
   * @deprecated to be removed in the next major version please use _visited
   */
  visited?: LinkStateTokens;
  _active: LinkStateTokens;
  _focus: LinkStateTokens;
  _hover: LinkStateTokens;
  _visited: LinkStateTokens;
}

export const link: LinkTokens = {
  _active: {
    color: { value: '{colors.font.active.value}' },
  },
  color: { value: '{colors.font.interactive.value}' },
  _focus: {
    color: { value: '{colors.font.focus.value}' },
  },
  _hover: {
    color: { value: '{colors.font.hover.value}' },
  },
  _visited: {
    color: { value: '{colors.font.interactive.value}' },
  },
};
