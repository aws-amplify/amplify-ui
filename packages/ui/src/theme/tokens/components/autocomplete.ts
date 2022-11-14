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
    marginBlockStart: DesignToken<SpaceValue>;
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
    _empty: {
      display: DesignToken<DisplayValue>;
    };
    _loading: {
      alignItems: DesignToken<AlignItemsValue>;
      display: DesignToken<DisplayValue>;
      gap: DesignToken<SpaceValue>;
    };
    spaceShared: {
      paddingBlock: DesignToken<SpaceValue>;
      paddingInline: DesignToken<SpaceValue>;
    };
  };
}

export const autocomplete: AutocompleteTokens = {
  menu: {
    width: { value: '100%' },
    marginBlockStart: { value: '{space.xxxs}' },
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
    _empty: {
      display: { value: 'flex' },
    },
    _loading: {
      alignItems: { value: 'center' },
      display: { value: 'flex' },
      gap: { value: '{space.xxxs}' },
    },
    spaceShared: {
      paddingBlock: { value: '{space.xs}' },
      paddingInline: { value: '{space.small}' },
    },
  },
};
