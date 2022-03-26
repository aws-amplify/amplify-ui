import {
  AlignItemsValue,
  ColorValue,
  DesignToken,
  DisplayValue,
  SpaceValue,
} from '../types/designToken';

interface SelectWrapperTokens {
  flex: any;
  display: DesignToken<DisplayValue>;
  position: any;
  cursor: any;
}

interface SelectIconWrapperTokens {
  alignItems: DesignToken<AlignItemsValue>;
  position: any;
  top: any;
  right: any;
  transform: any;
  pointerEvents: any;
}

interface SelectOptionTokens {
  backgroundColor: DesignToken<ColorValue>;
}

interface SelectSizeTokens {
  minWidth: DesignToken<SpaceValue>;
}

export interface SelectTokens {
  paddingInlineEnd: DesignToken<SpaceValue>;
  wrapper: SelectWrapperTokens;
  iconWrapper: SelectIconWrapperTokens;
  option: SelectOptionTokens;
  whiteSpace: any;
  minWidth: DesignToken<SpaceValue>;
  small: SelectSizeTokens;
  large: SelectSizeTokens;
}

export const select: SelectTokens = {
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
