import {
  ColorValue,
  DesignToken,
  FontSizeValue,
  FlexDirectionValue,
  TextAlignValue,
  TextContrast,
  BorderContrast,
} from '../types/designToken';

interface StepperFieldInputTokens extends TextContrast {
  textAlign: DesignToken<TextAlignValue>;
  fontSize: DesignToken<FontSizeValue>;
}

interface ButtonStateColorTokens extends TextContrast {}

export interface StepperFieldTokens extends BorderContrast {
  flexDirection: DesignToken<FlexDirectionValue>;
  input: StepperFieldInputTokens;
  button: {
    color: DesignToken<ColorValue>;
    backgroundColor: DesignToken<ColorValue>;
    _active: ButtonStateColorTokens;
    _focus: ButtonStateColorTokens;
    _disabled: ButtonStateColorTokens;
    _hover: ButtonStateColorTokens;
  };
}

export const stepperfield: StepperFieldTokens = {
  backgroundColor: { value: 'transparent' },
  borderColor: { value: '{components.fieldcontrol.borderColor}' },
  flexDirection: { value: 'column' },
  input: {
    backgroundColor: { value: 'transparent' },
    color: { value: '{components.fieldcontrol.color}' },
    fontSize: { value: '{components.fieldcontrol.fontSize}' },
    textAlign: { value: 'center' },
  },
  button: {
    color: { value: '{components.button.color}' },
    backgroundColor: { value: '{colors.transparent}' },
    _active: {
      color: { value: '{components.button._active.color}' },
      backgroundColor: { value: '{components.button._active.backgroundColor}' },
    },
    _focus: {
      color: { value: '{components.button._focus.color}' },
      backgroundColor: { value: '{components.button._focus.backgroundColor}' },
    },
    _disabled: {
      color: { value: '{components.button._disabled.color}' },
      backgroundColor: {
        value: '{components.fieldcontrol._disabled.backgroundColor}',
      },
    },
    _hover: {
      color: { value: '{components.button._hover.color}' },
      backgroundColor: { value: '{components.button._hover.backgroundColor}' },
    },
  },
};
