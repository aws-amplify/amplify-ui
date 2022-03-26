import {
  AlignItemsValue,
  BackgroundColorValue,
  CursorValue,
  DesignToken,
  DisplayValue,
  FlexValue,
  PointerEventsValue,
  PositionValue,
  SpaceValue,
  TransformValue,
  WhiteSpaceValue,
} from '../types/designToken';

interface SelectWrapperTokens {
  flex: DesignToken<FlexValue>;
  display: DesignToken<DisplayValue>;
  position: DesignToken<PositionValue>;
  cursor: DesignToken<CursorValue>;
}

interface SelectIconWrapperTokens {
  alignItems: DesignToken<AlignItemsValue>;
  position: DesignToken<PositionValue>;
  top: DesignToken<SpaceValue>;
  right: DesignToken<SpaceValue>;
  transform: DesignToken<TransformValue>;
  pointerEvents: DesignToken<PointerEventsValue>;
}

interface SelectOptionTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
}

interface SelectSizeTokens {
  minWidth: DesignToken<SpaceValue>;
}

export interface SelectTokens {
  paddingInlineEnd: DesignToken<SpaceValue>;
  wrapper: SelectWrapperTokens;
  iconWrapper: SelectIconWrapperTokens;
  option: SelectOptionTokens;
  whiteSpace: DesignToken<WhiteSpaceValue>;
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
