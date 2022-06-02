import {
  BackgroundColorValue,
  ColorValue,
  DesignToken,
} from '../types/designToken';

interface SearchTokens {
  color: DesignToken<ColorValue>;
  _disabled: StateTokens;
  _hover: StateTokens;
  _focus: StateTokens;
}

interface StateTokens {
  color: DesignToken<ColorValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
}

export interface SearchFieldTokens {
  color: DesignToken<ColorValue>;
  search: SearchTokens;
}

export const searchfield: SearchFieldTokens = {
  color: { value: '{components.fieldcontrol.color.value}' },
  search: {
    color: { value: '{components.button.color.value}' },
    _disabled: {
      color: { value: '{components.button._disabled.color.value}' },
      backgroundColor: {
        value: '{components.button._disabled.backgroundColor.value}',
      },
    },
    _hover: {
      color: { value: '{components.button._hover.color.value}' },
      backgroundColor: { value: '{components.button._hover.backgroundColor}' },
    },
    _focus: {
      color: { value: '{components.button._focus.color.value}' },
      backgroundColor: { value: '{components.button._focus.backgroundColor}' },
    },
  },
};
