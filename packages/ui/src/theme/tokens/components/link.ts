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
  _active?: LinkStateTokens;
  _focus?: LinkStateTokens;
  _hover?: LinkStateTokens;
  _visited?: LinkStateTokens;
}

export const DEPRECATED_LINK_TOKENS = [
  {
    tokenName: '--amplify-components-link-active-color',
    path: 'components.link._active.color',
  },
  {
    tokenName: '--amplify-components-link-focus-color',
    path: 'components.link._focus.color',
  },
  {
    tokenName: '--amplify-components-link-hover-color',
    path: 'components.link._hover.color',
  },
  {
    tokenName: '--amplify-components-link-visited-color',
    path: 'components.link._visited.color',
  },
];

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
