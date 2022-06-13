import {
  AlignItemsValue,
  BackgroundColorValue,
  BorderRadiusValue,
  ColorValue,
  DesignToken,
  FontSizeValue,
  JustifyContentValue,
  SpaceValue,
  TransitionDurationValue,
  TransitionPropertyValue,
} from '../types/designToken';

interface PaginationCurrentTokens {
  alignItems: DesignToken<AlignItemsValue>;
  justifyContent: DesignToken<JustifyContentValue>;
  color: DesignToken<ColorValue>;
  fontSize: DesignToken<FontSizeValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
}

interface PaginationButtonTokens {
  color: DesignToken<ColorValue>;
  paddingInlineStart: DesignToken<SpaceValue>;
  paddingInlineEnd: DesignToken<SpaceValue>;
  transitionProperty: DesignToken<TransitionPropertyValue>;
  transitionDuration: DesignToken<TransitionDurationValue>;
  hover: PaginationButtonHoverTokens;
  disabled: PaginationButtonDisabledTokens;
}

export interface PaginationButtonHoverTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  color: DesignToken<ColorValue>;
}
export interface PaginationButtonDisabledTokens {
  color: DesignToken<ColorValue>;
}

interface PaginationEllipsisTokens {
  alignItems: DesignToken<AlignItemsValue>;
  justifyContent: DesignToken<JustifyContentValue>;
  paddingInlineStart: DesignToken<SpaceValue>;
  paddingInlineEnd: DesignToken<SpaceValue>;
}

interface PaginationItemContainerTokens {
  marginLeft: DesignToken<SpaceValue>;
  marginRight: DesignToken<SpaceValue>;
}

interface PaginationItemSharedTokens {
  height: DesignToken<SpaceValue>;
  minWidth: DesignToken<SpaceValue>;
  borderRadius: DesignToken<BorderRadiusValue>;
}

export interface PaginationTokens {
  current: PaginationCurrentTokens;
  button: PaginationButtonTokens;
  ellipsis: PaginationEllipsisTokens;
  itemContainer: PaginationItemContainerTokens;
  itemShared: PaginationItemSharedTokens;
}

export const pagination: PaginationTokens = {
  current: {
    alignItems: { value: 'center' },
    justifyContent: { value: 'center' },
    color: { value: '{colors.font.inverse.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
    backgroundColor: { value: '{colors.overlay.40.value}' },
  },
  button: {
    color: { value: '{colors.font.primary.value}' },
    paddingInlineStart: { value: '{space.xxs.value}' },
    paddingInlineEnd: { value: '{space.xxs.value}' },
    transitionProperty: { value: 'background-color' },
    transitionDuration: { value: '{time.medium.value}' },
    hover: {
      backgroundColor: { value: '{colors.overlay.10.value}' },
      color: { value: '{colors.font.primary.value}' },
    },
    disabled: {
      color: { value: '{colors.font.disabled.value}' },
    },
  },
  ellipsis: {
    alignItems: { value: 'baseline' },
    justifyContent: { value: 'center' },
    paddingInlineStart: { value: '{space.xs.value}' },
    paddingInlineEnd: { value: '{space.xs.value}' },
  },
  itemContainer: {
    marginLeft: { value: '{space.xxxs.value}' },
    marginRight: { value: '{space.xxxs.value}' },
  },
  itemShared: {
    height: { value: '{fontSizes.xxl.value}' },
    minWidth: { value: '{fontSizes.xxl.value}' },
    borderRadius: { value: '{fontSizes.medium.value}' },
  },
};
