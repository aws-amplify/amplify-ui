import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type PaginationTokens<Output extends OutputVariantKey> = {
  current?: DesignTokenProperties<
    'alignItems' | 'backgroundColor' | 'color' | 'fontSize' | 'justifyContent',
    Output
  >;
  button?: DesignTokenProperties<
    | 'color'
    | 'paddingInlineEnd'
    | 'paddingInlineStart'
    | 'transitionDuration'
    | 'transitionProperty',
    Output
  > & {
    hover?: DesignTokenProperties<'backgroundColor' | 'color', Output>;
    disabled?: DesignTokenProperties<'color', Output>;
  };
  ellipsis?: DesignTokenProperties<
    | 'alignItems'
    | 'justifyContent'
    // TODO: update to shorthand paddingInline
    | 'paddingInlineEnd'
    | 'paddingInlineStart',
    Output
  >;
  itemContainer?: DesignTokenProperties<
    // TODO: update to logical shorthand marginInline
    'marginLeft' | 'marginRight',
    Output
  >;
  itemShared?: DesignTokenProperties<
    'borderRadius' | 'height' | 'minWidth',
    Output
  >;
};

export const pagination: Required<PaginationTokens<'default'>> = {
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
