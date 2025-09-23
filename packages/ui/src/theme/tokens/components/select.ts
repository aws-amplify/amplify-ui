import type {
  DesignTokenProperties,
  OutputVariantKey,
} from '../types/designToken';

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
    | 'backgroundColor'
    | 'color'
    | 'paddingInlineEnd'
    | 'whiteSpace'
    | 'minWidth',
    Output
  > & {
    wrapper?: DesignTokenProperties<
      'cursor' | 'display' | 'flex' | 'position',
      Output
    >;
    iconWrapper?: SelectIconWrapperTokens<Output>;
    option?: DesignTokenProperties<'backgroundColor' | 'color', Output> & {
      _disabled?: DesignTokenProperties<'color' | 'backgroundColor', Output>;
    };
    small?: SelectSizeTokens<Output>;
    large?: SelectSizeTokens<Output>;
    expanded?: DesignTokenProperties<
      'paddingBlock' | 'paddingInline',
      Output
    > & {
      option?: DesignTokenProperties<'paddingBlock' | 'paddingInline', Output>;
    };
    _disabled?: DesignTokenProperties<'backgroundColor' | 'color', Output>;
  };

export const select: Required<SelectTokens<'default'>> = {
  color: { value: '{components.fieldcontrol.color}' },
  backgroundColor: { value: '{colors.background.primary.value}' },
  paddingInlineEnd: { value: '{space.xxl.value}' },
  _disabled: {
    color: { value: '{colors.font.disabled.value}' },
    backgroundColor: { value: '{colors.background.disabled.value}' },
  },
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
  // It's important to test these option values on Chrome/FireFox/Edge
  // on Windows because they allow styling of the option element.
  // Chrome/Safari/Firefox on Mac uses the system ui.
  option: {
    backgroundColor: { value: 'transparent' },
    color: { value: '{colors.font.primary.value}' },
    _disabled: {
      color: { value: '{colors.font.disabled.value}' },
      backgroundColor: {
        value: 'transparent',
      },
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
  expanded: {
    paddingBlock: { value: '{space.xs.value}' },
    paddingInline: { value: '{space.small.value}' },
    option: {
      paddingBlock: { value: '{space.xs.value}' },
      paddingInline: { value: '{space.small.value}' },
    },
  },
};
