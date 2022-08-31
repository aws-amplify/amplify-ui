import { ColorValue, DesignToken, TextContrast } from '../types/designToken';
import { StateTokens } from './button';

interface ButtonTokens extends TextContrast {
  color: DesignToken<ColorValue>;
  _active: StateTokens;
  _disabled: StateTokens;
  _focus: StateTokens;
  _hover: StateTokens;
}

export interface PasswordFieldTokens extends TextContrast {
  color: DesignToken<ColorValue>;
  button: ButtonTokens;
}

export const passwordfield: PasswordFieldTokens = {
  backgroundColor: { value: 'transparent' },
  color: { value: '{components.fieldcontrol.color.value}' },
  button: {
    backgroundColor: { value: 'transparent' },
    color: { value: '{components.button.color.value}' },
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
};
