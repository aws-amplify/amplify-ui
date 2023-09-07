import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type SelectSizeTokens<Output> = DesignTokenProperties<
  'minWidth' | 'paddingInlineEnd',
  Output
>;

type SelectIconWrapperTokens<Output> = DesignTokenProperties<
  'alignItems' | 'position' | 'top' | 'right' | 'transform' | 'pointerEvents',
  Output
> & {
  small?: DesignTokenProperties<'right', Output>;
  large?: DesignTokenProperties<'right', Output>;
};

export type SelectTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<
    'paddingInlineEnd' | 'whiteSpace' | 'minWidth',
    Output
  > & {
    wrapper?: DesignTokenProperties<
      'cursor' | 'display' | 'flex' | 'position',
      Output
    >;
    iconWrapper?: SelectIconWrapperTokens<Output>;
    option?: DesignTokenProperties<'backgroundColor' | 'color', Output> & {
      _disabled?: DesignTokenProperties<'color', Output>;
    };
    small?: SelectSizeTokens<Output>;
    large?: SelectSizeTokens<Output>;
    multiple?: DesignTokenProperties<
      'paddingBlock' | 'paddingInline',
      Output
    > & {
      option?: DesignTokenProperties<'paddingBlock' | 'paddingInline', Output>;
    };
  };

export const select: Required<SelectTokens<'default'>> = {
  paddingInlineEnd: { value: '{space.xxl.value}' },
  // wrappers
  wrapper: {
    flex: { value: '1' },
    display: { value: 'block' },
    position: { value: 'relative' },
    cursor: { value: 'pointer' },
  },
  iconWrapper: {
    alignItems: { value: 'center' },
    position: { value: 'absolute' },
    top: { value: '50%' },
    right: { value: '{space.medium.value}' },
    transform: { value: 'translateY(-50%)' },
    pointerEvents: { value: 'none' },
    small: {
      right: { value: '{space.xs.value}' },
    },
    large: {
      right: { value: '{space.medium.value}' },
    },
  },
  // for Firefox only, to fix background color in darkmode
  option: {
    backgroundColor: { value: '{colors.background.primary.value}' },
    color: { value: '{colors.font.primary.value}' },
    _disabled: {
      color: { value: '{colors.font.disabled.value}' },
    },
  },
  whiteSpace: { value: 'nowrap' },
  minWidth: { value: '6.5rem' },
  small: {
    minWidth: { value: '5.5rem' },
    paddingInlineEnd: { value: '{space.xl.value}' },
  },
  large: {
    minWidth: { value: '7.5rem' },
    paddingInlineEnd: { value: '{space.xxl.value}' },
  },
  multiple: {
    paddingBlock: { value: '{space.xs.value}' },
    paddingInline: { value: '{space.small.value}' },
    option: {
      paddingBlock: { value: '{space.xs.value}' },
      paddingInline: { value: '{space.small.value}' },
    },
  },
};
