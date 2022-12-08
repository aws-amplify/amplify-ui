import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type SelectSizeTokens<Output> = DesignTokenProperties<'minWidth', Output>;

export type SelectTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<
    'paddingInlineEnd' | 'whiteSpace' | 'minWidth',
    Output
  > & {
    wrapper?: DesignTokenProperties<
      'cursor' | 'display' | 'flex' | 'position',
      Output
    >;
    iconWrapper?: DesignTokenProperties<
      | 'alignItems'
      | 'position'
      | 'top'
      | 'right'
      | 'transform'
      | 'pointerEvents',
      Output
    >;
    option?: DesignTokenProperties<'backgroundColor' | 'color', Output> & {
      _disabled?: DesignTokenProperties<'color', Output>;
    };
    small?: SelectSizeTokens<Output>;
    large?: SelectSizeTokens<Output>;
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
  },
  large: {
    minWidth: { value: '7.5rem' },
  },
};
