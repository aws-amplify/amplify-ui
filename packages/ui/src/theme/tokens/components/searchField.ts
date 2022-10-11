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
import { StateTokens } from './button';

interface SearchTokens {
  color: DesignToken<ColorValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
  _active: StateTokens;
  _disabled: StateTokens;
  _focus: StateTokens;
  _hover: StateTokens;
}

export interface SearchFieldTokens {
  color: DesignToken<ColorValue>;
  button: SearchTokens;
  menu: {
    width: DesignToken<SpaceValue>;
    maxHeight: DesignToken<SpaceValue>;
    marginTop: DesignToken<SpaceValue>;
    backgroundColor: DesignToken<BackgroundColorValue>;
    borderColor: DesignToken<BorderColorValue>;
    borderWidth: DesignToken<BorderWidthValue>;
    borderStyle: DesignToken<BorderStyleValue>;
    borderRadius: DesignToken<BorderRadiusValue>;
    suggestions: {
      display: DesignToken<DisplayValue>;
      flexDirection: DesignToken<FlexDirectionValue>;
    };
    suggestion: {
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

export const searchfield: SearchFieldTokens = {
  color: { value: '{components.fieldcontrol.color.value}' },
  button: {
    color: { value: '{components.button.color.value}' },
    backgroundColor: { value: '{colors.background.primary.value}' },
    _active: {
      backgroundColor: {
        value: '{components.button._active.backgroundColor.value}',
      },
      borderColor: { value: '{components.button._active.borderColor.value}' },
      color: { value: '{components.button._active.color.value}' },
    },
    _disabled: {
      backgroundColor: {
        value: '{components.button._disabled.backgroundColor.value}',
      },
      borderColor: {
        value: '{components.button._disabled.borderColor.value}',
      },
      color: { value: '{components.button._disabled.color.value}' },
    },
    _focus: {
      backgroundColor: {
        value: '{components.button._focus.backgroundColor.value}',
      },
      borderColor: { value: '{components.button._focus.borderColor.value}' },
      color: { value: '{components.button._focus.color.value}' },
    },
    _hover: {
      backgroundColor: {
        value: '{components.button._hover.backgroundColor.value}',
      },
      borderColor: { value: '{components.button._hover.borderColor.value}' },
      color: { value: '{components.button._hover.color.value}' },
    },
  },
  menu: {
    width: { value: '100%' },
    maxHeight: { value: '300px' },
    marginTop: { value: '{space.xxxs}' },
    backgroundColor: { value: '{colors.background.primary}' },
    borderColor: { value: '{colors.border.primary}' },
    borderWidth: { value: '{borderWidths.small}' },
    borderStyle: { value: 'solid' },
    borderRadius: { value: '{radii.small}' },
    suggestions: {
      display: { value: 'flex' },
      flexDirection: { value: 'column' },
    },
    suggestion: {
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
