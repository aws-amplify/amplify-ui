import {
  AlignItemsValue,
  BackgroundColorValue,
  BorderColorValue,
  BorderWidthValue,
  BorderStyleValue,
  BorderRadiusValue,
  ColorValue,
  CursorValue,
  DesignToken,
  DisplayValue,
  FlexDirectionValue,
  SpaceValue,
  TransitionDurationValue,
  TransitionPropertyValue,
  TransitionTimingFunctionValue,
} from '../types/designToken';

export interface AutocompleteTokens {
  menu: {
    width: DesignToken<SpaceValue>;
    marginTop: DesignToken<SpaceValue>;
    backgroundColor: DesignToken<BackgroundColorValue>;
    borderColor: DesignToken<BorderColorValue>;
    borderWidth: DesignToken<BorderWidthValue>;
    borderStyle: DesignToken<BorderStyleValue>;
    borderRadius: DesignToken<BorderRadiusValue>;
    options: {
      display: DesignToken<DisplayValue>;
      flexDirection: DesignToken<FlexDirectionValue>;
      maxHeight: DesignToken<SpaceValue>;
    };
    option: {
      backgroundColor: DesignToken<BackgroundColorValue>;
      color: DesignToken<ColorValue>;
      cursor: DesignToken<CursorValue>;
      transitionDuration: DesignToken<TransitionDurationValue>;
      transitionProperty: DesignToken<TransitionPropertyValue>;
      transitionTimingFunction: DesignToken<TransitionTimingFunctionValue>;
      _active: {
        backgroundColor: DesignToken<BackgroundColorValue>;
        color: DesignToken<ColorValue>;
      };
    };
    _loading: {
      alignItems: DesignToken<AlignItemsValue>;
      gap: DesignToken<SpaceValue>;
    };
    spaceShared: {
      paddingBlockEnd: DesignToken<SpaceValue>;
      paddingBlockStart: DesignToken<SpaceValue>;
      paddingInlineEnd: DesignToken<SpaceValue>;
      paddingInlineStart: DesignToken<SpaceValue>;
    };
  };
}

export const autocomplete: AutocompleteTokens = {
  menu: {
    width: { value: '100%' },
    marginTop: { value: '{space.xxxs}' },
    backgroundColor: { value: '{colors.background.primary}' },
    borderColor: { value: '{colors.border.primary}' },
    borderWidth: { value: '{borderWidths.small}' },
    borderStyle: { value: 'solid' },
    borderRadius: { value: '{radii.small}' },
    options: {
      display: { value: 'flex' },
      flexDirection: { value: 'column' },
      maxHeight: { value: '300px' },
    },
    option: {
      backgroundColor: { value: '{colors.background.primary}' },
      color: { value: 'currentcolor' },
      cursor: { value: 'pointer' },
      transitionDuration: { value: '{time.short}' },
      transitionProperty: { value: 'background-color, color' },
      transitionTimingFunction: { value: 'ease' },
      _active: {
        backgroundColor: { value: '{colors.brand.primary.80}' },
        color: { value: '{colors.white}' },
      },
    },
    _loading: {
      alignItems: { value: 'center' },
      gap: { value: '{space.xxxs}' },
    },
    spaceShared: {
      paddingBlockEnd: { value: '{space.xs}' },
      paddingBlockStart: { value: '{space.xs}' },
      paddingInlineStart: { value: '{space.small}' },
      paddingInlineEnd: { value: '{space.small}' },
    },
  },
};
