import {
  ColorValue,
  DesignToken,
  FontSizeValue,
  ReplacementStateToken,
} from '../types/designToken';

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

// To be removed in the next major version release
export const DUPLICATE_LINK_STATES: ReplacementStateToken[] = [
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
    // To be changed in the next major release to _active
    color: { value: '{colors.font.active.value}' },
  },
  color: { value: '{colors.font.interactive.value}' },
  focus: {
    // To be changed in the next major release to _focus
    color: { value: '{colors.font.focus.value}' },
  },
  hover: {
    // To be changed in the next major release to _hover
    color: { value: '{colors.font.hover.value}' },
  },
  visited: {
    // To be changed in the next major release to _visited
    color: { value: '{colors.font.interactive.value}' },
  },
};
